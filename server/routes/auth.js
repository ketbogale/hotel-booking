const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const multer = require('../config/multer');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Public routes (no authentication required)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Test email route (for debugging)
router.get('/test-email', authController.testEmail);

// Protected routes (authentication required)
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, multer.single('profilePicture'), authController.updateProfile);

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


