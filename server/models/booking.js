const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tx_ref: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  checkin: { type: String, required: true },
  checkout: { type: String, required: true },
  rooms: { type: String, required: true },
  rate: { type: String },
  amount: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Prevent OverwriteModelError in dev/hot-reload
module.exports = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);