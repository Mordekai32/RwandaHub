const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();

// ========== ENHANCED CORS CONFIGURATION ==========
const allowedOrigins = [
  'https://rwandamarket.vercel.app',
  'https://rwandahub.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000'
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// ========== MODELS ==========
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  location: String,
  profileImage: { type: String, default: '' },
  role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' }
}, { timestamps: true }));

const Product = mongoose.model('Product', new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  images: [String],
  category: { type: String, enum: ['Phones', 'Cars', 'Clothes', 'Houses', 'Electronics'] },
  stock: { type: Number, min: 0, default: 0 },
  sold: { type: Number, default: 0 },
  location: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }));

const Order = mongoose.model('Order', new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quantity: Number,
  totalPrice: Number,
  status: { type: String, enum: ['Pending', 'Confirmed', 'Delivered'], default: 'Pending' }
}, { timestamps: true }));

const Message = mongoose.model('Message', new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId,
  receiverId: mongoose.Schema.Types.ObjectId,
  message: String
}, { timestamps: true }));

// ========== MIDDLEWARE ==========
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user) throw new Error();
    next();
  } catch {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

const sellerOnly = (req, res, next) => {
  if (req.user.role === 'seller' || req.user.role === 'admin') next();
  else res.status(403).json({ error: 'Seller access required' });
};

const adminOnly = (req, res, next) => {
  if (req.user.role === 'admin') next();
  else res.status(403).json({ error: 'Admin access required' });
};

const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder }, (err, result) => {
      if (err) reject(err);
      else resolve(result.secure_url);
    }).end(buffer);
  });
};

// ========== AUTH ROUTES ==========
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, location, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, phone, location, role: role || 'buyer' });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/me', auth, (req, res) => res.json(req.user));

// ========== USER PROFILE ==========
app.get('/api/users/profile', auth, (req, res) => res.json(req.user));
app.put('/api/users/profile', auth, async (req, res) => {
  try {
    const { name, phone, location } = req.body;
    if (name) req.user.name = name;
    if (phone) req.user.phone = phone;
    if (location) req.user.location = location;
    await req.user.save();
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/users/profile/image', auth, upload.single('image'), async (req, res) => {
  try {
    const url = await uploadToCloudinary(req.file.buffer, 'profiles');
    req.user.profileImage = url;
    await req.user.save();
    res.json({ profileImage: url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== PRODUCTS ROUTES ==========
app.get('/api/products', async (req, res) => {
  try {
    let filter = {};
    if (req.query.search && req.query.search.trim()) {
      filter.title = { $regex: req.query.search, $options: 'i' };
    }
    const validCategories = ['Phones', 'Cars', 'Clothes', 'Houses', 'Electronics'];
    if (req.query.category && validCategories.includes(req.query.category)) {
      filter.category = req.query.category;
    }
    let minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
    let maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
    if (isNaN(minPrice)) minPrice = undefined;
    if (isNaN(maxPrice)) maxPrice = undefined;
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = minPrice;
      if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }
    if (req.query.location && req.query.location.trim()) {
      filter.location = { $regex: req.query.location, $options: 'i' };
    }
    const products = await Product.find(filter)
      .populate('userId', 'name phone location profileImage')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Products fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/seller/:sellerId', auth, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.sellerId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('userId', 'name phone location profileImage');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', auth, sellerOnly, upload.array('images', 5), async (req, res) => {
  try {
    const { title, price, description, category, stock, location } = req.body;
    if (!title || !price || !description || !category || stock === undefined || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const priceNum = Number(price);
    const stockNum = Number(stock);
    if (isNaN(priceNum) || isNaN(stockNum)) {
      return res.status(400).json({ error: 'Price and stock must be numbers' });
    }
    const imageUrls = [];
    if (req.files && req.files.length) {
      for (const file of req.files) {
        const url = await uploadToCloudinary(file.buffer, 'products');
        imageUrls.push(url);
      }
    } else {
      return res.status(400).json({ error: 'At least one product image is required' });
    }
    const product = new Product({
      title,
      price: priceNum,
      description,
      images: imageUrls,
      category,
      stock: stockNum,
      location,
      userId: req.user._id
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Product creation error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', auth, sellerOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const { title, price, description, category, stock, location } = req.body;
    if (title) product.title = title;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = stock;
    if (location) product.location = location;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', auth, sellerOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products/:id/restock', auth, sellerOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const additionalStock = Number(req.body.additionalStock);
    if (isNaN(additionalStock) || additionalStock <= 0) {
      return res.status(400).json({ error: 'Invalid stock quantity' });
    }
    product.stock += additionalStock;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== ORDERS ROUTES ==========
app.post('/api/orders', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });
    const totalPrice = product.price * quantity;
    const order = new Order({
      productId,
      buyerId: req.user._id,
      sellerId: product.userId,
      quantity,
      totalPrice
    });
    await order.save();
    product.stock -= quantity;
    product.sold += quantity;
    await product.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders/buyer', auth, async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user._id }).populate('productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders/seller', auth, sellerOnly, async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user._id })
      .populate('productId', 'title price images')
      .populate('buyerId', 'name email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/orders/:id/status', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    if (order.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const { status } = req.body;
    if (!['Pending', 'Confirmed', 'Delivered'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== MESSAGES ROUTES ==========
app.post('/api/messages', auth, async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const msg = new Message({ senderId: req.user._id, receiverId, message });
    await msg.save();
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/messages/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user._id, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.user._id }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/messages/conversations', auth, async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      { $match: { $or: [{ senderId: req.user._id }, { receiverId: req.user._id }] } },
      { $group: { _id: { $cond: [{ $eq: ['$senderId', req.user._id] }, '$receiverId', '$senderId'] }, lastMessage: { $last: '$message' }, lastUpdated: { $last: '$createdAt' } } }
    ]);
    const result = await Promise.all(conversations.map(async (conv) => {
      const user = await User.findById(conv._id).select('name profileImage');
      return { user, lastMessage: conv.lastMessage, lastUpdated: conv.lastUpdated };
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== ADMIN ROUTES ==========
app.get('/api/admin/users', auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/users/:id', auth, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Product.deleteMany({ userId: req.params.id });
    res.json({ message: 'User and products deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/products/:id', auth, adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted by admin' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/orders', auth, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('productId', 'title price images')
      .populate('buyerId', 'name email')
      .populate('sellerId', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/orders/:id', auth, adminOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    const product = await Product.findById(order.productId);
    if (product) {
      product.stock += order.quantity;
      product.sold -= order.quantity;
      if (product.sold < 0) product.sold = 0;
      await product.save();
    }
    await order.deleteOne();
    res.json({ message: 'Order deleted successfully, stock restored' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/admin/users/:id/role', auth, adminOnly, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['buyer', 'seller', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.role = role;
    await user.save();
    res.json({ message: 'Role updated', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/stats', auth, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSellers = await User.countDocuments({ role: 'seller' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    res.json({
      totalUsers,
      totalSellers,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== AUTO-CREATE ADMIN USER ==========
const createAdminIfNotExists = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@rwandamarket.rw' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      const admin = new User({
        name: 'Super Admin',
        email: 'admin@rwandamarket.rw',
        password: hashedPassword,
        phone: '+250788000000',
        location: 'Kigali',
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Admin user created: admin@rwandamarket.rw / Admin123!');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
};

// ========== START SERVER ==========
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Atlas connected');
    await createAdminIfNotExists();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));