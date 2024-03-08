// routes/captureImage.js

const express = require('express');
const router = express.Router();
const CapturedImage = require('../models/CapturedImage');
 
router.post('/capture', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    // Create a new captured image record
    const capturedImage = new CapturedImage({ imageUrl });
    await capturedImage.save();
    res.status(201).json({ message: 'Image captured and stored successfully', capturedImage });
  } catch (error) {
    console.error('Error capturing image:', error);
    res.status(500).json({ error: 'Failed to capture and store image' });
  }
});

module.exports = router;
