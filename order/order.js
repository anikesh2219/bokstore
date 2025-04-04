const express = require('express');
const router = express.Router();
const account = require('../signup/mongodb');
const list = require('../books/mongodb');
const bookorder = require('./mongodb')

const app= express()
                                            
router.post('/api/orders', async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  // Basic validation
  if (!userId || !bookId || !quantity) {
    return res.status(400).json({ msg: 'Please provide userId, bookId, and quantity' });
  }

  try {
    // Check if user exists
    const user = await account.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if book exists
    const book = await list.findById(bookId);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Create new order
    const newOrder = new bookorder({
      user: userId,
      book: bookId,
      quantity
    });

    // Save order to database
    const order = await newOrder.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

app.listen(4000)