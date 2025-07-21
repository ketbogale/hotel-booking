const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const nodemailer = require('nodemailer');
const Booking = require('../models/booking'); // Use lowercase to match the file name
const paymentEmailStyles = require('../email/emailStyles');

// Replace with your real Chapa secret key
// Use environment variable for Chapa secret key
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY; // Set this in your .env file

// Configure your transporter (for demo, use Gmail; use env vars in production)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ket1boggood@gmail.com',      // your email
    pass: 'ffjs zhyp hpmf bbka'         // your app password (not your main password)
  }
});

function sendEmail(to, subject, html) {
  return transporter.sendMail({
    from: 'Africa Hotel <ket1boggood@gmail.com>',
    to,
    subject,
    html
  });
}

router.get('/verify', async (req, res) => {
  // Accept both tx_ref and trx_ref for compatibility
  const tx_ref = req.query.tx_ref || req.query.trx_ref;
  if (!tx_ref) {
    console.error('[Payment Verify] Missing tx_ref in query:', req.query);
    return res.status(400).send('Missing tx_ref');
  }

  try {
    // Retrieve booking details from DB
    const booking = await Booking.findOne({ tx_ref });
    if (!booking) {
      console.error(`[Payment Verify] Booking not found for tx_ref: ${tx_ref}`);
      return res.status(404).send('Booking not found');
    }

    const chapaRes = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
      headers: { Authorization: `Bearer ${CHAPA_SECRET_KEY}` }
    });
    const data = await chapaRes.json();
    if (data.status === 'success' && data.data.status === 'success') {
      // Use real booking details
      const userEmail = booking.email;
      const adminEmail = 'ket1boggoodcs@gmail.com';
      const bookingSummary = `
        <div class="booking-summary">
          <ul>
            <li><b>Check-In:</b> ${booking.checkin}</li>
            <li><b>Checkout:</b> ${booking.checkout}</li>
            <li><b>Rooms & Guests:</b> ${booking.rooms}</li>
            <li><b>Rate:</b> ${booking.rate || 'Standard'}</li>
            <li><b>Amount:</b> <span style='color:#189030;font-weight:bold;'>${booking.amount} ETB</span></li>
          </ul>
        </div>
      `;
      // Send email to user
      try {
        await sendEmail(
          userEmail,
          '🎉 Your Booking Payment is Successful! – Africa Hotel',
          `<!DOCTYPE html><html><head><meta charset='UTF-8'><style>${paymentEmailStyles}</style></head><body><div class="email-container">
            <div class="email-header">
              <img src="https://i.ibb.co/6b7b6Qk/africa-hotel-logo.png" alt="Africa Hotel Logo" />
              <div class="email-title">Thank you for your payment!</div>
              <div class="email-subtitle">Your booking is confirmed. Here are your details:</div>
            </div>
            ${bookingSummary}
            <div class="email-footer">
              If you have questions, contact us at <a href="mailto:support@yourhotel.com" class="email-support-link">support@yourhotel.com</a>.<br>
              <img src="https://chapa.co/static/media/logo.2b1b6c2e.svg" alt="Chapa Logo" style="width:60px;opacity:0.7;margin-top:12px;"/>
            </div>
          </div></body></html>`
        );
        console.log(`[Email Success] Payment confirmation sent to user: ${userEmail}`);
      } catch (e) {
        console.error(`[Email Error] Failed to send user email to ${userEmail}:`, e.stack || e);
      }
      // Send email to admin
      try {
        await sendEmail(
          adminEmail,
          'New Booking Payment Received – Africa Hotel',
          `<!DOCTYPE html><html><head><meta charset='UTF-8'><style>${paymentEmailStyles}</style></head><body><div class="email-container">
            <div class="email-header">
              <img src="https://i.ibb.co/6b7b6Qk/africa-hotel-logo.png" alt="Africa Hotel Logo" />
              <div class="email-title">New payment received</div>
              <div class="email-subtitle">User: <a href="mailto:${userEmail}" style="color:#189030;">${userEmail}</a></div>
            </div>
            ${bookingSummary}
            <div class="email-footer">
              This is an automated notification for Africa Hotel.<br>
              <img src="https://chapa.co/static/media/logo.2b1b6c2e.svg" alt="Chapa Logo" style="width:60px;opacity:0.7;margin-top:12px;"/>
            </div>
          </div></body></html>`
        );
        console.log(`[Email Success] Admin notified at: ${adminEmail}`);
      } catch (e) {
        console.error(`[Email Error] Failed to send admin email to ${adminEmail}:`, e.stack || e);
      }
      // Redirect to thank-you page on success
      return res.redirect('/public/html/thank-you.html');
    } else {
      console.error(`[Payment Verify] Chapa verification failed for tx_ref: ${tx_ref}. Response:`, data);
      // Redirect to payment-failed page on error
      return res.redirect('/public/html/payment-failed.html');
    }
  } catch (err) {
    console.error('[Payment Verify] Unexpected error:', err.stack || err);
    return res.redirect('/public/html/payment-failed.html');
  }
});

module.exports = router;