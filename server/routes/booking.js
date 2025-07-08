const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');

// POST /api/booking/email
router.post('/email', async (req, res) => {
  const { name, email, checkin, checkout, rooms, accessible, rate, points } = req.body;

  // 1. Check if user is registered
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      // Not registered
      return res.status(401).json({ success: false, error: 'User not registered' });
    }

    // 2. Proceed with sending booking email to admin
    const mailOptions = {
      from: '"Africa Hotel" <yourhotel@example.com>',
      to: 'admin@example.com',
      subject: 'New Booking Received',
      html: `
        <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              background: #f7f7fb;
              color: #241654;
              margin: 0;
              padding: 0;
            }
            .booking-container {
              background: #fff;
              border-radius: 12px;
              box-shadow: 0 8px 32px rgba(36, 22, 84, 0.10);
              max-width: 480px;
              margin: 32px auto;
              padding: 32px 28px;
              border: 1px solid #ececec;
            }
            h2 {
              color: #6c63ff;
              margin-bottom: 18px;
              text-align: center;
            }
            ul {
              list-style: none;
              padding: 0;
            }
            li {
              margin-bottom: 12px;
              font-size: 1.08rem;
            }
            .label {
              font-weight: bold;
              color: #241654;
            }
            .footer {
              margin-top: 24px;
              text-align: center;
              color: #b0aac0;
              font-size: 0.95rem;
            }
          </style>
        </head>
        <body>
          <div class="booking-container">
            <h2>New Booking Details</h2>
            <ul>
              <li><span class="label">Name:</span> ${name}</li>
              <li><span class="label">Email:</span> ${email}</li>
              <li><span class="label">Check-In:</span> ${checkin}</li>
              <li><span class="label">Checkout:</span> ${checkout}</li>
              <li><span class="label">Rooms & Guests:</span> ${rooms}</li>
              <li><span class="label">Accessible Room:</span> ${accessible ? 'Yes' : 'No'}</li>
              <li><span class="label">Rate:</span> ${rate || 'Standard'}</li>
              <li><span class="label">Points Used:</span> ${points ? 'Yes' : 'No'}</li>
            </ul>
            <div class="footer">
              Africa Hotel Booking System &copy; ${new Date().getFullYear()}
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Configure Nodemailer transporter (example with Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yourhotel@example.com',
        pass: 'your_app_password'
      }
    });

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;