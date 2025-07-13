const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');
const upload = require('../config/multer');

// Get user profile
router.get('/profile', auth, userController.getUserProfile);

// Update profile (image and fields)
router.patch('/profile', auth, upload.single('profileImage'), userController.updateProfile);

module.exports = router;