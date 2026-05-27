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

// Ensure all upload directories exist
const cvDir = path.join(__dirname, 'uploads/cvs');
const profileDir = path.join(__dirname, 'uploads/profiles');
const companyLogoDir = path.join(__dirname, 'uploads/companies');
const listingImagesDir = path.join(__dirname, 'uploads/listings');
const messageAttachmentsDir = path.join(__dirname, 'uploads/messages');

[ cvDir, profileDir, companyLogoDir, listingImagesDir, messageAttachmentsDir ].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer config for CVs (PDF)
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

// Multer config for profile images
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

// Multer config for company logos
const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, companyLogoDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'logo-' + unique + path.extname(file.originalname));
  }
});
const uploadLogo = multer({ storage: logoStorage, fileFilter: imageFileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

// Multer config for listing images (multiple)
const listingImageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, listingImagesDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'listing-' + unique + path.extname(file.originalname));
  }
});
const uploadListingImages = multer({ storage: listingImageStorage, fileFilter: imageFileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// ========== MongoDB Models ==========

// User model (extended)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['jobseeker', 'employer', 'admin'], default: 'jobseeker' },
  profileImage: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

// Company model
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

// Job model – with application instructions fields
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
  applicationInstructions: { type: String, default: "Click the 'Apply Now' button below and fill out the application form." },
  applicationEmail: { type: String, default: null },
  applicationUrl: { type: String, default: null }
});

// Application model
const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cvUrl: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
});

// ---------- Models for Advertisements ----------
const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['service', 'product', 'training'], required: true },
  category: { type: String },
  images: [{ type: String }],
  status: { type: String, enum: ['active', 'paused', 'expired'], default: 'active' },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 },
  promotionBudget: { type: Number, default: 0 },
  promotionEndDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

const orderSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  buyerName: { type: String, required: true },
  buyerEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const messageSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  from: { type: String, required: true },
  message: { type: String, required: true },
  reply: { type: String, default: null },
  read: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

const invoiceSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  amount: { type: Number, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  dueDate: { type: Date },
  paidAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const paymentMethodSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  last4: { type: String, required: true },
  brand: { type: String, required: true },
  expiry: { type: String, required: true },
  token: { type: String },
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const analyticsLogSchema = new mongoose.Schema({
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  date: { type: Date, default: Date.now },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);
const Company = mongoose.model('Company', companySchema);
const Job = mongoose.model('Job', jobSchema);
const Application = mongoose.model('Application', applicationSchema);
const Listing = mongoose.model('Listing', listingSchema);
const Order = mongoose.model('Order', orderSchema);
const Message = mongoose.model('Message', messageSchema);
const Invoice = mongoose.model('Invoice', invoiceSchema);
const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);
const AnalyticsLog = mongoose.model('AnalyticsLog', analyticsLogSchema);

// ========== MongoDB Connection ==========
// Read the connection string from .env file (MONGODB_URI)
// Make sure you have set MONGODB_URI in .env with your real password
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Atlas connected');
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

// ========== JWT & Auth Helpers ==========
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

// ========== Auth Routes ==========
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

// ========== Company Routes ==========
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

app.get('/api/companies', async (req, res) => {
  try {
    const companies = await Company.find().populate('ownerId', 'name email');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== Job Routes ==========
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
    
    const jobsWithCount = await Promise.all(jobs.map(async (job) => {
      const jobObj = job.toObject();
      jobObj.companyLogo = job.companyId?.logo || null;
      jobObj.employeeCount = job.companyId?.employeeCount || null;
      jobObj.phone = job.companyId?.phone || null;
      jobObj.applicationsCount = await Application.countDocuments({ jobId: job._id });
      return jobObj;
    }));
    
    res.json(jobsWithCount);
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
    jobObj.applicationsCount = await Application.countDocuments({ jobId: job._id });
    res.json(jobObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/jobs', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const company = await checkEmployerCompany(req.user.id);
    const { title, location, salary, description, applicationInstructions, applicationEmail, applicationUrl } = req.body;
    
    const job = await Job.create({
      title,
      company: company.name,
      companyId: company._id,
      location,
      salary,
      description,
      createdBy: req.user.id,
      status: 'pending',
      applicationInstructions: applicationInstructions || "Click the 'Apply Now' button below and fill out the application form.",
      applicationEmail: applicationEmail || null,
      applicationUrl: applicationUrl || null
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

// ========== Employer Job Management ==========
app.get('/api/employer/jobs', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id })
      .populate('companyId', 'logo employeeCount phone')
      .sort({ createdAt: -1 });
    
    const jobsWithCount = await Promise.all(jobs.map(async (job) => {
      const jobObj = job.toObject();
      jobObj.companyLogo = job.companyId?.logo || null;
      jobObj.employeeCount = job.companyId?.employeeCount || null;
      jobObj.phone = job.companyId?.phone || null;
      jobObj.applicationsCount = await Application.countDocuments({ jobId: job._id });
      return jobObj;
    }));
    
    res.json(jobsWithCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/employer/jobs/:id', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/employer/jobs/:id', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    
    const { title, location, salary, description, applicationInstructions, applicationEmail, applicationUrl } = req.body;
    
    job.title = title || job.title;
    job.location = location || job.location;
    job.salary = salary || job.salary;
    job.description = description || job.description;
    job.applicationInstructions = applicationInstructions || job.applicationInstructions;
    job.applicationEmail = applicationEmail !== undefined ? applicationEmail : job.applicationEmail;
    job.applicationUrl = applicationUrl !== undefined ? applicationUrl : job.applicationUrl;
    
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/employer/jobs/:id/duplicate', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const originalJob = await Job.findById(req.params.id);
    if (!originalJob) return res.status(404).json({ message: 'Job not found' });
    if (originalJob.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    
    const company = await checkEmployerCompany(req.user.id);
    
    const duplicatedJob = new Job({
      title: `${originalJob.title} (Copy)`,
      company: originalJob.company,
      companyId: originalJob.companyId,
      location: originalJob.location,
      salary: originalJob.salary,
      description: originalJob.description,
      createdBy: req.user.id,
      status: 'pending',
      featured: false,
      applicationInstructions: originalJob.applicationInstructions,
      applicationEmail: originalJob.applicationEmail,
      applicationUrl: originalJob.applicationUrl
    });
    
    await duplicatedJob.save();
    res.status(201).json(duplicatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== Application Routes ==========
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
      .populate('jobId', 'title company location salary applicationInstructions applicationEmail applicationUrl');
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

// ========== Admin Routes ==========
app.get('/api/admin/users', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/admin/users/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use by another user' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
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

app.patch('/api/admin/users/:id/role', verifyToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    if (!role || !['jobseeker', 'employer', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be jobseeker, employer, or admin.' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
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

// ========== Advertisement Routes ==========
app.post('/api/listings', verifyToken, authorizeRoles('employer'), uploadListingImages.array('images', 5), async (req, res) => {
  try {
    const company = await checkEmployerCompany(req.user.id);
    const { title, description, price, type, category } = req.body;
    const images = req.files ? req.files.map(file => `/uploads/listings/${file.filename}`) : [];
    const listing = await Listing.create({
      title,
      description,
      price: Number(price),
      type,
      category,
      images,
      companyId: company._id,
      createdBy: req.user.id,
      status: 'active',
    });
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/listings/my', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    const listings = await Listing.find({ companyId: company._id }).sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('companyId', 'name logo phone');
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    listing.impressions += 1;
    await listing.save();
    await AnalyticsLog.findOneAndUpdate(
      { listingId: listing._id, date: { $gte: new Date().setHours(0,0,0,0) } },
      { $inc: { impressions: 1 } },
      { upsert: true }
    );
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/listings/:id', verifyToken, authorizeRoles('employer'), uploadListingImages.array('images', 5), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company || listing.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { title, description, price, type, category, status } = req.body;
    const updateData = { title, description, price, type, category, status };
    if (req.files && req.files.length) {
      updateData.images = req.files.map(file => `/uploads/listings/${file.filename}`);
    }
    const updated = await Listing.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/listings/:id', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company || listing.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await listing.deleteOne();
    res.json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/listings/:id/click', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    listing.clicks += 1;
    await listing.save();
    await AnalyticsLog.findOneAndUpdate(
      { listingId: listing._id, date: { $gte: new Date().setHours(0,0,0,0) } },
      { $inc: { clicks: 1 } },
      { upsert: true }
    );
    res.json({ message: 'Click tracked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/analytics', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    const listings = await Listing.find({ companyId: company._id });
    const analyticsData = listings.map(l => ({
      id: l._id,
      title: l.title,
      impressions: l.impressions,
      clicks: l.clicks,
      conversions: l.conversions,
      ctr: l.impressions ? ((l.clicks / l.impressions) * 100).toFixed(2) : 0,
      conversionRate: l.clicks ? ((l.conversions / l.clicks) * 100).toFixed(2) : 0,
    }));
    res.json(analyticsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/analytics/:listingId', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company || listing.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const dailyLogs = await AnalyticsLog.find({ listingId: listing._id }).sort({ date: -1 }).limit(30);
    const analytics = {
      impressions: listing.impressions,
      clicks: listing.clicks,
      conversions: listing.conversions,
      ctr: listing.impressions ? ((listing.clicks / listing.impressions) * 100).toFixed(2) : 0,
      conversionRate: listing.clicks ? ((listing.conversions / listing.clicks) * 100).toFixed(2) : 0,
      daily: dailyLogs,
    };
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/promote', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const { listingId, budget, durationDays } = req.body;
    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company || listing.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const totalCost = budget * durationDays;
    const paymentMethod = await PaymentMethod.findOne({ companyId: company._id });
    if (!paymentMethod) {
      return res.status(400).json({ message: 'Please add a payment method first' });
    }
    const invoice = await Invoice.create({
      companyId: company._id,
      listingId: listing._id,
      amount: totalCost,
      description: `Promotion for ${listing.title} - ${durationDays} days at ${budget}/day`,
      status: 'pending',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    invoice.status = 'paid';
    invoice.paidAt = new Date();
    await invoice.save();
    listing.promotionBudget = (listing.promotionBudget || 0) + totalCost;
    listing.promotionEndDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
    await listing.save();
    res.json({ success: true, message: 'Promotion activated', invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { listingId, buyerName, buyerEmail } = req.body;
    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    const order = await Order.create({
      listingId,
      buyerName,
      buyerEmail,
      amount: listing.price,
      status: 'pending',
    });
    listing.conversions += 1;
    await listing.save();
    await AnalyticsLog.findOneAndUpdate(
      { listingId: listing._id, date: { $gte: new Date().setHours(0,0,0,0) } },
      { $inc: { conversions: 1 } },
      { upsert: true }
    );
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/orders/my', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    const listings = await Listing.find({ companyId: company._id }).select('_id');
    const listingIds = listings.map(l => l._id);
    const orders = await Order.find({ listingId: { $in: listingIds } }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/api/orders/:id/status', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id).populate('listingId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company || order.listingId.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { listingId, from, message } = req.body;
    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    const msg = await Message.create({ listingId, from, message });
    res.status(201).json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/messages/my', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    const listings = await Listing.find({ companyId: company._id }).select('_id');
    const listingIds = listings.map(l => l._id);
    const messages = await Message.find({ listingId: { $in: listingIds } }).sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/messages/:id/reply', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const { reply } = req.body;
    const message = await Message.findById(req.params.id).populate('listingId');
    if (!message) return res.status(404).json({ message: 'Message not found' });
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company || message.listingId.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    message.reply = reply;
    message.read = true;
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/payment-methods', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    const methods = await PaymentMethod.find({ companyId: company._id });
    res.json(methods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/payment-methods', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const { last4, brand, expiry, token } = req.body;
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    const method = await PaymentMethod.create({
      companyId: company._id,
      last4,
      brand,
      expiry,
      token,
      isDefault: (await PaymentMethod.countDocuments({ companyId: company._id })) === 0,
    });
    res.status(201).json(method);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/payment-methods/:id', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const method = await PaymentMethod.findById(req.params.id);
    if (!method) return res.status(404).json({ message: 'Method not found' });
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company || method.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await method.deleteOne();
    res.json({ message: 'Payment method removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/invoices', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const company = await Company.findOne({ ownerId: req.user.id });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    const invoices = await Invoice.find({ companyId: company._id }).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/marketplace/listings', async (req, res) => {
  try {
    const { type, category, minPrice, maxPrice } = req.query;
    let filter = { status: 'active' };
    if (type) filter.type = type;
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (minPrice) filter.price = { $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    const listings = await Listing.find(filter)
      .populate('companyId', 'name logo phone')
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== Settings Routes ==========
app.put('/api/settings/business-profile', verifyToken, authorizeRoles('employer'), async (req, res) => {
  try {
    const { name, description, website, phone, employeeCount } = req.body;
    const company = await Company.findOneAndUpdate(
      { ownerId: req.user.id },
      { name, description, website, phone, employeeCount },
      { new: true }
    );
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const notificationSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  emailAlerts: { type: Boolean, default: true },
  smsAlerts: { type: Boolean, default: false },
  newLeadNotify: { type: Boolean, default: true },
});
const NotificationSettings = mongoose.model('NotificationSettings', notificationSettingsSchema);

app.get('/api/settings/notifications', verifyToken, async (req, res) => {
  try {
    let settings = await NotificationSettings.findOne({ userId: req.user.id });
    if (!settings) settings = await NotificationSettings.create({ userId: req.user.id });
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/settings/notifications', verifyToken, async (req, res) => {
  try {
    const { emailAlerts, smsAlerts, newLeadNotify } = req.body;
    const settings = await NotificationSettings.findOneAndUpdate(
      { userId: req.user.id },
      { emailAlerts, smsAlerts, newLeadNotify },
      { new: true, upsert: true }
    );
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});