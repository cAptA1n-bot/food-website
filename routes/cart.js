const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Cart = require('../models/Cart');
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

// Get cart
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      cart: user.cart,
      totalItems: user.cart.length,
      totalPrice: user.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to cart
router.post('/add', verifyToken, async (req, res) => {
  try {
    const { foodId, name, price, image, category } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if item already in cart
    const existingItem = user.cart.find(item => item.foodId?.toString() === foodId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({
        foodId,
        name,
        price,
        image,
        category,
        quantity: 1
      });
    }

    await user.save();

    res.json({
      message: 'Item added to cart',
      cart: user.cart,
      totalItems: user.cart.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update cart item quantity
router.put('/update/:foodId', verifyToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { foodId } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const item = user.cart.find(item => item.foodId?.toString() === foodId);

    if (!item) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    if (quantity <= 0) {
      user.cart = user.cart.filter(item => item.foodId?.toString() !== foodId);
    } else {
      item.quantity = quantity;
    }

    await user.save();

    res.json({
      message: 'Cart updated',
      cart: user.cart,
      totalPrice: user.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove from cart
router.delete('/remove/:foodId', verifyToken, async (req, res) => {
  try {
    const { foodId } = req.params;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = user.cart.filter(item => item.foodId?.toString() !== foodId);
    await user.save();

    res.json({
      message: 'Item removed from cart',
      cart: user.cart,
      totalItems: user.cart.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear cart
router.delete('/clear', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = [];
    await user.save();

    res.json({
      message: 'Cart cleared',
      cart: []
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
