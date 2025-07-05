const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registration route
router.post('/register', authController.register);

// Test email route (for debugging)
router.get('/test-email', authController.testEmail);

module.exports = router;
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/login', authController.login);
router.post('/reset-password', authController.resetPassword);
module.exports = router;
