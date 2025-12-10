const mongoose = require('mongoose');

const foodCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide food name'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Please provide food image URL']
  },
  price: {
    type: Number,
    required: [true, 'Please provide food price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please provide food category'],
    enum: ['burgers', 'pizza', 'pasta', 'desserts', 'drinks', 'other']
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FoodCard', foodCardSchema);
