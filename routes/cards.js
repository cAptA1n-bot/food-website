const express = require('express');
const router = express.Router();
const FoodCard = require('../models/foodCard');

// Get all food cards
router.get('/', async (req, res) => {
  try {
    const cards = await FoodCard.find();
    res.status(200).json({
      success: true,
      message: 'Food cards retrieved successfully',
      cards: cards,
      total: cards.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving food cards',
      error: error.message
    });
  }
});

// Get single food card by ID
router.get('/:id', async (req, res) => {
  try {
    const card = await FoodCard.findById(req.params.id);
    
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Food card not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Food card retrieved successfully',
      card: card
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving food card',
      error: error.message
    });
  }
});

// Create new food card
router.post('/', async (req, res) => {
  try {
    const { name, image, price, category, description } = req.body;

    // Validation
    if (!name || !image || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, image, price, category'
      });
    }

    const newCard = new FoodCard({
      name,
      image,
      price,
      category,
      description: description || ''
    });

    await newCard.save();

    res.status(201).json({
      success: true,
      message: 'Food card created successfully',
      card: newCard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating food card',
      error: error.message
    });
  }
});

// Update food card
router.put('/:id', async (req, res) => {
  try {
    const { name, image, price, category, description } = req.body;

    const updatedCard = await FoodCard.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: name || undefined,
          image: image || undefined,
          price: price || undefined,
          category: category || undefined,
          description: description || undefined
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({
        success: false,
        message: 'Food card not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Food card updated successfully',
      card: updatedCard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating food card',
      error: error.message
    });
  }
});

// Delete food card
router.delete('/:id', async (req, res) => {
  try {
    const deletedCard = await FoodCard.findByIdAndDelete(req.params.id);

    if (!deletedCard) {
      return res.status(404).json({
        success: false,
        message: 'Food card not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Food card deleted successfully',
      card: deletedCard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting food card',
      error: error.message
    });
  }
});

module.exports = router;
