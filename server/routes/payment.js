const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const nodemailer = require('nodemailer');

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
  const { tx_ref, email, checkin, checkout, rooms, rate, amount } = req.query;
  if (!tx_ref) return res.status(400).json({ status: 'error', message: 'Missing tx_ref' });

  try {
    const chapaRes = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
      headers: { Authorization: `Bearer ${CHAPA_SECRET_KEY}` }
    });
    const data = await chapaRes.json();
    if (data.status === 'success' && data.data.status === 'success') {
      // Payment is successful
      const userEmail = email || 'customer@example.com';
      const adminEmail = 'ket1boggoodcs@gmail.com';
      const bookingSummary = `
        <ul>
          <li><b>Check-In:</b> ${checkin || ''}</li>
          <li><b>Checkout:</b> ${checkout || ''}</li>
          <li><b>Rooms & Guests:</b> ${rooms || ''}</li>
          <li><b>Rate:</b> ${rate || ''}</li>
          <li><b>Amount:</b> ${amount || ''} ETB</li>
        </ul>
      `;
      // Send email to user
      try {
        await sendEmail(
          userEmail,
          'Your Booking Payment is Successful!',
          `<h2>Thank you for your payment!</h2>
          <p>Your booking is confirmed. Here are your details:</p>
          ${bookingSummary}
          <p>If you have questions, contact us at support@yourhotel.com.</p>`
        );
      } catch (e) { console.error('User email failed:', e.message); }
      // Send email to admin
      try {
        await sendEmail(
          adminEmail,
          'New Booking Payment Received',
          `<h2>New payment received</h2>
          <p>User: ${userEmail}</p>
          ${bookingSummary}`
        );
      } catch (e) { console.error('Admin email failed:', e.message); }
      return res.json({ status: 'success', data: data.data });
    } else {
      return res.json({ status: 'error', message: 'Payment not successful', data: data.data });
    }
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Verification failed', error: err.message });
  }
});

module.exports = router;