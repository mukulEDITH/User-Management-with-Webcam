
const express = require("express");
const morgan = require("morgan");

const connectDB = require("./config/db");
require('dotenv').config();

const auth = require("./middlewares/auth");

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(require("cors")());

// routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/contact"));
// Route for capturing images
app.post('/api/capture-image', (req, res) => {
  const imageData = req.body.image;
  // Save the captured image to a secure location
  // For simplicity, let's assume we are storing it in the filesystem
  const imagePath = `uploads/image_${Date.now()}.jpg`;
  fs.writeFile(imagePath, imageData, 'base64', (err) => {
    if (err) {
      console.error('Error saving image:', err);
      res.status(500).json({ error: 'Error saving image' });
    } else {
      console.log('Image saved successfully:', imagePath);
      res.json({ message: 'Image captured and saved successfully' });
    }
  });
});

// server configurations.
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`server listening on port: ${PORT}`);
});
