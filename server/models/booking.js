const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
  rooms: { type: String, required: true },
  rate: { type: String },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', bookingSchema);