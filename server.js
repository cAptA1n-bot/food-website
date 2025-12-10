const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// MongoDB Connection to foodDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB (foodDB) connected successfully');
}).catch(err => {
  console.log('❌ MongoDB connection error:', err);
});

// Import routes
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');
const cardRoutes = require('./routes/cards');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/cards', cardRoutes);

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Base: http://localhost:${PORT}/api`);
  console.log(`🔐 Database: foodDB`);
});
