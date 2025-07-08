const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const transporter = require('../config/mailer');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const emailStyles = require('../email/emailStyles');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;


// Test email function
exports.testEmail = async (req, res) => {
  try {
    console.log('Testing email configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: '🧪 Email Test - Africa Hotel',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Email Test Successful!</h2>
          <p>If you receive this email, your email configuration is working correctly.</p>
          <p><strong>Sender:</strong> ${process.env.EMAIL_USER}</p>
          <p><strong>Recipient:</strong> ${process.env.ADMIN_EMAIL}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    });
    
    console.log('Test email sent successfully!');
    res.json({ message: 'Test email sent successfully! Check your admin email.' });
  } catch (error) {
    console.error('Email test failed:', error.message);
    res.status(500).json({ 
      error: 'Email test failed', 
      details: error.message,
      config: {
        emailUser: process.env.EMAIL_USER,
        adminEmail: process.env.ADMIN_EMAIL
      }
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Step 1: Check if user already exists in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Step 2: Verify email existence using Hunter.io (TEMPORARILY DISABLED)
  /*
    try {
      const hunterResponse = await axios.get(
        `https://api.hunter.io/v2/email-verifier?email=${encodeURIComponent(email)}&api_key=${process.env.HUNTER_API_KEY}`
      );
      const result = hunterResponse.data.data;
      
      // Check if email is invalid or undeliverable
      if (result.result === "undeliverable" || result.status === "invalid") {
        return res.status(400).json({ error: "Please insert existing email." });
      }
    } catch (err) {
      console.error('Hunter.io API error:', err.message);
      return res.status(500).json({ error: "Email verification failed. Please try again." });
    }
    */

    // Step 3: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create and save user
    const user = new User({ 
      firstName, 
      lastName, 
      email, 
      password: hashedPassword 
    });
    await user.save();

    // Step 5: Send admin notification email
    const adminHtml = `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            ${emailStyles}
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              🆕 New User Registration
            </div>
            <div class="content">
              <p>Hello Admin,</p>
              <p>A new user has successfully registered on your <strong>Africa Hotel</strong> platform.</p>
            </div>
            <div class="details">
              <h3 style="margin-top: 0; color: #2c3e50;">📋 User Details:</h3>
              <p><strong>👤 Full Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>📧 Email Address:</strong> ${email}</p>
              <p><strong>📅 Registration Date:</strong> ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <p><strong>🆔 User ID:</strong> ${user._id}</p>
            </div>
            <div class="footer">
              <p>This is an automated notification from Africa Hotel.</p>
              <p style="font-size: 0.9rem; color: #95a5a6;">
                You can manage users from your admin dashboard.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: ADMIN_EMAIL,
        subject: '🆕 New User Registration - Africa Hotel',
        html: adminHtml
      });
      console.log('Admin notification sent successfully');
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError.message);
      // Don't fail the registration if admin email fails
    }

    // Step 6: Send welcome email to user
    const userHtml = `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            ${emailStyles}
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              🏨 Welcome to Africa Hotel!
            </div>
            <div class="content">
              <p>Dear <strong>${firstName}</strong>,</p>
              <p>🎉 <strong>Congratulations!</strong> Your registration was successful!</p>
              <p>Welcome to Africa Hotel - where luxury meets comfort. We're thrilled to have you as part of our community.</p>
            </div>
            <div class="details">
              <h3 style="margin-top: 0; color: #2c3e50;">📋 Your Account Details:</h3>
              <p><strong>👤 Full Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>📧 Email Address:</strong> ${email}</p>
              <p><strong>📅 Registration Date:</strong> ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
              })}</p>
              <p><strong>🆔 Account Status:</strong> <span style="color: #27ae60; font-weight: bold;">✓ Active</span></p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:5000/login.html" class="button">
                🚀 Login to Your Account
              </a>
            </div>
            <div class="footer">
              <p><strong>What's Next?</strong></p>
              <ul style="text-align: left; color: #7f8c8d; line-height: 1.6;">
                <li>📱 Complete your profile</li>
                <li>🏨 Browse our luxury accommodations</li>
                <li>📅 Make your first booking</li>
                <li>💎 Enjoy exclusive member benefits</li>
              </ul>
              <p style="margin-top: 20px;">
                Thank you for choosing Africa Hotel. We're excited to provide you with an unforgettable experience!
              </p>
              <p style="font-size: 0.9rem; color: #95a5a6; margin-top: 15px;">
                If you have any questions, feel free to contact our support team.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: '🎉 Welcome to Africa Hotel - Registration Successful!',
        html: userHtml
      });
      console.log('Welcome email sent successfully to:', email);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError.message);
      // Don't fail the registration if user email fails
    }

    // Step 7: Respond to frontend with success
    res.status(201).json({ 
      message: 'Registration successful! Please check your email for confirmation.',
      user: { firstName, lastName, email }
    });

  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    // Always respond with success to prevent email enumeration
    if (!user) {
      return res.json({ message: 'If this email is registered, you will receive password reset instructions.' });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Attractive email
    const resetLink = `http://localhost:5000/reset-password.html?token=${token}`;
    const html = `
      <html>
        <head>
          <style>
            ${emailStyles}
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">🔑 Password Reset Request</div>
            <div class="content">
              <p>Hello,</p>
              <p>We received a request to reset your password for your <b>Africa Hotel</b> account.</p>
              <p>Click the button below to reset your password. This link is valid for 1 hour.</p>
              <div style="text-align:center;margin:30px 0;">
                <a href="${resetLink}" class="button">Reset Password</a>
              </div>
              <p>If you did not request this, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>Thank you for using Africa Hotel.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: '🔑 Password Reset - Africa Hotel',
      html
    });

    res.json({ message: 'If this email is registered, you will receive password reset instructions.' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }
    user.password = await require('bcryptjs').hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }
    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }
    // 3. Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // 4. Respond with token
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// Get user profile
exports.getProfile = async (req, res) => {
  // Assume user ID is in req.user.id (set by auth middleware)
  const user = await User.findById(req.user.id).select('-password -resetPasswordToken -resetPasswordExpires');
  res.json(user);
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const update = { name, email };
  if (req.file) {
    update.profilePicture = req.file.filename;
  }
  if (password) {
    update.password = await bcrypt.hash(password, 10);
  }
  const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select('-password');
  res.json(user);
};