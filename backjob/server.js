const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure upload directories exist
const cvDir = path.join(__dirname, 'uploads/cvs');
const profileDir = path.join(__dirname, 'uploads/profiles');
const companyLogoDir = path.join(__dirname, 'uploads/companies');

if (!fs.existsSync(cvDir)) fs.mkdirSync(cvDir, { recursive: true });
if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });
if (!fs.existsSync(companyLogoDir)) fs.mkdirSync(companyLogoDir, { recursive: true });

// Multer configuration for CV uploads (PDF only)
const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, cvDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'cv-' + unique + path.extname(file.originalname));
  }
});
const cvFileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Only PDF files are allowed'), false);
};
const uploadCV = multer({ storage: cvStorage, fileFilter: cvFileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Multer configuration for profile images (images only)
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, profileDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'profile-' + unique + path.extname(file.originalname));
  }
});
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only image files are allowed (JPEG, PNG, GIF)'), false);
};
const uploadProfileImage = multer({ storage: profileStorage, fileFilter: imageFileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

// Multer configuration for company logos (images only)
const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, companyLogoDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'logo-' + unique + path.extname(file.originalname));
  }
});
const uploadLogo = multer({ storage: logoStorage, fileFilter: imageFileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

// MongoDB Models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['jobseeker', 'employer', 'admin'], default: 'jobseeker' },
  profileImage: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

// Company schema with phone field
const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  website: { type: String },
  phone: { type: String, default: null },
  logo: { type: String, default: null },
  employeeCount: { type: String, default: null },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  description: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cvUrl: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Company = mongoose.model('Company', companySchema);
const Job = mongoose.model('Job', jobSchema);
const Application = mongoose.model('Application', applicationSchema);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        name: 'Admin User',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin user created');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// JWT Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }
    next();
  };
};

const checkEmployerCompany = async (userId) => {
  const company = await Company.findOne({ ownerId: userId });
  if (!company) throw new Error('Please create company profile first');
  return company;
};

// Auth Routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'jobseeker',
    });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User Profile Routes
app.get('/api/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    let company = null;
    if (user.role === 'employer') {
      company = await Company.findOne({ ownerId: user._id });
    }
    res.json({ user, company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/profile', verifyToken, uploadProfileImage.single('profileImage'), async (req, res) => {
  try {
    const { name } = req.body;
    const updateData = { name };
    if (req.file) updateData.profileImage = `/uploads/profiles/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Company Profile Routes (Employer only)
app.post('/api/company', verifyToken, authorizeRoles('employer'), uploadLogo.single('logo'), async (req, res) => {
  try {
    const { name, description, website, phone, employeeCount } = req.body;
    const existing = await Company.findOne({ ownerId: req.user.id });
    if (existing) return res.status(400).json({ message: 'Company profile already exists' });
    const companyData = { name, description, website, phone, employeeCount, ownerId: req.user.id };
    if (req.file) companyData.logo = `/uploads/companies/${req.file.filename}`;
    const company = await Company.create(companyData);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/company', verifyToken, authorizeRoles('employer'), uploadLogo.single('logo'), async (req, res) => {
  try {
    const { name, description, website, phone, employeeCount } = req.body;
    const updateData = { name, description, website, phone, employeeCount };
    if (req.file) updateData.logo = `/uploads/companies/${req.file.filename}`;
    const company = await Company.findOneAndUpdate(
      { ownerId: req.user.id },
      updateData,
      { new: true }
    );
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/company', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUBLIC: Get all companies
app.get('/api/companies', async (req, res) => {
  try {
    const companies = await Company.find().populate('ownerId', 'name email');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Job Routes (with phone included)
app.get('/api/jobs', async (req, res) => {
  try {
    const { title, location, minSalary, maxSalary } = req.query;
    let filter = { status: 'approved' };
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (minSalary) filter.salary = { $gte: parseInt(minSalary) };
    if (maxSalary) filter.salary = { ...filter.salary, $lte: parseInt(maxSalary) };
    
    const jobs = await Job.find(filter)
      .populate('companyId', 'logo employeeCount phone')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    const jobsWithDetails = jobs.map(job => {
      const jobObj = job.toObject();
      jobObj.companyLogo = job.companyId?.logo || null;
      jobObj.employeeCount = job.companyId?.employeeCount || null;
      jobObj.phone = job.companyId?.phone || null;
      return jobObj;
    });
    
    res.json(jobsWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('companyId', 'logo employeeCount phone')
      .populate('createdBy', 'name email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.status !== 'approved' && (!req.headers.authorization || (req.user?.role !== 'admin' && req.user?.id !== job.createdBy._id.toString()))) {
      return res.status(403).json({ message: 'Job not available' });
    }
    const jobObj = job.toObject();
    jobObj.companyLogo = job.companyId?.logo || null;
    jobObj.employeeCount = job.companyId?.employeeCount || null;
    jobObj.phone = job.companyId?.phone || null;
    res.json(jobObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/jobs', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const company = await checkEmployerCompany(req.user.id);
    const { title, location, salary, description } = req.body;
    const job = await Job.create({
      title,
      company: company.name,
      companyId: company._id,
      location,
      salary,
      description,
      createdBy: req.user.id,
      status: 'pending',
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/jobs/:id', verifyToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (req.user.role !== 'admin' && job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await job.deleteOne();
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/employer/jobs', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id })
      .populate('companyId', 'logo employeeCount phone')
      .sort({ createdAt: -1 });
    const jobsWithDetails = jobs.map(job => {
      const jobObj = job.toObject();
      jobObj.companyLogo = job.companyId?.logo || null;
      jobObj.employeeCount = job.companyId?.employeeCount || null;
      jobObj.phone = job.companyId?.phone || null;
      return jobObj;
    });
    res.json(jobsWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Application Routes
app.post('/api/apply/:jobId', verifyToken, authorizeRoles('jobseeker'), uploadCV.single('cv'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'CV file is required (PDF)' });
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.status !== 'approved') return res.status(400).json({ message: 'Job is not approved yet' });
    const existing = await Application.findOne({ jobId: req.params.jobId, userId: req.user.id });
    if (existing) return res.status(400).json({ message: 'Already applied to this job' });
    const cvUrl = `/uploads/cvs/${req.file.filename}`;
    const application = await Application.create({
      jobId: req.params.jobId,
      userId: req.user.id,
      cvUrl,
      status: 'pending',
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/my-applications', verifyToken, authorizeRoles('jobseeker'), async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id })
      .populate('jobId', 'title company location salary');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/applications/:jobId', verifyToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (req.user.role !== 'admin' && job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('userId', 'name email');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/applications/:id/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id).populate('jobId');
    if (!application) return res.status(404).json({ message: 'Application not found' });
    const job = application.jobId;
    if (req.user.role !== 'admin' && job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    application.status = status;
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin Routes
app.get('/api/admin/users', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/admin/users/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Company.deleteMany({ ownerId: req.params.id });
    await Job.deleteMany({ createdBy: req.params.id });
    await Application.deleteMany({ userId: req.params.id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/admin/jobs/pending', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'pending' })
      .populate('companyId', 'logo employeeCount phone')
      .populate('createdBy', 'name email');
    const jobsWithDetails = jobs.map(job => {
      const jobObj = job.toObject();
      jobObj.companyLogo = job.companyId?.logo || null;
      jobObj.employeeCount = job.companyId?.employeeCount || null;
      jobObj.phone = job.companyId?.phone || null;
      return jobObj;
    });
    res.json(jobsWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/jobs/:id/approve', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/admin/jobs/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    await Application.deleteMany({ jobId: req.params.id });
    res.json({ message: 'Job deleted permanently' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});