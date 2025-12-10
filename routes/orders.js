const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Order = require('../models/Order');
const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Create order
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { deliveryAddress, phoneNumber, paymentMethod } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = user.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const orderId = 'ORD-' + Date.now() + '-' + user._id.toString().slice(-4);

    const order = new Order({
      orderId,
      userId: user._id,
      items: user.cart,
      totalAmount,
      deliveryAddress,
      phoneNumber,
      paymentMethod,
      status: 'pending'
    });

    await order.save();

    // Clear user's cart
    user.cart = [];
    user.orders.push({
      orderId,
      items: order.items,
      total: totalAmount,
      status: 'pending'
    });
    await user.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        orderId: order.orderId,
        totalAmount: order.totalAmount,
        status: order.status,
        items: order.items
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user orders
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order details
router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId, userId: req.userId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel order
router.put('/:orderId/cancel', verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId, userId: req.userId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (['delivered', 'cancelled'].includes(order.status)) {
      return res.status(400).json({ message: 'Cannot cancel this order' });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders (admin only)
router.get('/admin/all-orders', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (admin only)
router.put('/admin/:orderId/status', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;
    const order = await Order.findOne({ orderId: req.params.orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    order.updatedAt = Date.now();
    await order.save();

    res.json({
      message: 'Order status updated',
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
