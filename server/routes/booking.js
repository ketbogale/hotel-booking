const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const User = require('../models/User');
const auth = require('../middleware/auth');
const transporter = require('../config/mailer');
const emailStyles1 = require('../email/emailStyles1');
// POST /api/booking
router.post('/', auth, async (req, res) => {
  try {
    const user = req.user;
    const { checkin, checkout, rooms, rate } = req.body;

    // Save booking to DB
    const booking = new Booking({
      user: user._id,
      checkin,
      checkout,
      rooms,
      rate
    });
    await booking.save();

    // Send beautiful confirmation email to user
    await transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Your Booking Confirmation - Africa Hotel',
      html: `
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            ${emailStyles1}
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="brand">AFRICA HOTEL<sup>®</sup></div>
            <h2>Booking Confirmation</h2>
            <p>Dear <b>${user.firstName || user.name || 'Guest'}</b>,</p>
            <p>Thank you for booking with Africa Hotel! Here are your booking details:</p>
            <ul>
              <li><span class="label">Check-In:</span> ${new Date(booking.checkin).toLocaleDateString()}</li>
              <li><span class="label">Checkout:</span> ${new Date(booking.checkout).toLocaleDateString()}</li>
              <li><span class="label">Rooms & Guests:</span> ${booking.rooms}</li>
              <li><span class="label">Rate:</span> ${booking.rate || 'Standard'}</li>
            </ul>
            <p style="margin-top:18px;">We look forward to welcoming you! If you have any questions, reply to this email or call us at <b>+251 963 367 651</b>.</p>
            <div class="footer">
              Africa Hotel Booking System &copy; ${new Date().getFullYear()}
            </div>
          </div>
        </body>
        </html>
      `
    });

    res.json({ success: true, booking });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ success: false, error: 'Booking failed' });
  }
});

module.exports = router;