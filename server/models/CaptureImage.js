 

const mongoose = require('mongoose');

const capturedImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
 
}, { timestamps: true });

const CapturedImage = mongoose.model('CapturedImage', capturedImageSchema);

module.exports = CapturedImage;
