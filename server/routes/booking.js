
// server/routes/booking.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking'); // Use lowercase to match the file name

router.post('/create', async (req, res) => {
  console.log('[Booking Create] Incoming request body:', req.body);
  const { email, checkin, checkout, rooms, rate, amount } = req.body;
  const tx_ref = 'tx_' + Date.now(); // or use Chapa's tx_ref

  try {
    const booking = await Booking.create({ tx_ref, email, checkin, checkout, rooms, rate, amount });
    console.log(`[Booking Create] Booking created with tx_ref: ${tx_ref} for email: ${email}`);
    // Pass tx_ref to ChapaCheckout config in frontend
    res.json({ tx_ref });
  } catch (err) {
    console.error('[Booking Create] Error creating booking:', err.stack || err);
    res.status(500).json({ error: 'Failed to create booking', details: err.message });
  }
});
module.exports = router;