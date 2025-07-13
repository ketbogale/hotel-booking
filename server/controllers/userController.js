const mailer = require('../config/mailer');
const { emailStyles2 } = require('../email/emailStyles');
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    // Build update object
    const update = {};
    if (req.body.firstName) update.firstName = req.body.firstName;
    if (req.body.lastName) update.lastName = req.body.lastName;
    if (req.file) update.profileImage = `/uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      update,
      { new: true, runValidators: true, context: 'query' }
    ).select('firstName lastName email profileImage');
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    // Attractive HTML email
    const html = `
      <html>
      <head>
        <style>${emailStyles2}</style>
      </head>
      <body>
        <div class="profile-email-container">
          <div class="profile-email-header">
            <h1>Profile Updated!</h1>
            <p>Your profile information has been changed successfully.</p>
          </div>
          <div class="profile-email-content">
            <p>Hi <strong>${updatedUser.firstName}</strong>,</p>
            <p>Your profile was updated with the following info:</p>
            <div class="profile-email-image">
              <img src="cid:profilepic" alt="Profile Image" />
            </div>
            <p><strong>First Name:</strong> ${updatedUser.firstName}</p>
            <p><strong>Last Name:</strong> ${updatedUser.lastName}</p>
            <p><strong>Email:</strong> ${updatedUser.email}</p>
            <p>If you did not make this change, please contact support immediately.</p>
          </div>
          <div class="profile-email-footer">
            <p>Thank you for using our service!</p>
            <p class="status-active">Africa Hotel Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email with embedded image (if updated)
    await mailer.sendMail({
      to: updatedUser.email,
      subject: 'Profile Updated',
      html,
      attachments: update.profileImage ? [{
        filename: 'profile.jpg',
        path: __dirname + '/../' + updatedUser.profileImage,
        cid: 'profilepic'
      }] : []
    });

    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};