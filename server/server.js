const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const paymentRoutes = require('./routes/payment');
const bookingRoutes = require('./routes/booking');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hotelbooking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import and use routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/booking', bookingRoutes);
app.use('/api/payment', paymentRoutes);

// ...other routes and middleware...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});