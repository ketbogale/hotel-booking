// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const profileForm = document.getElementById('profileForm');
const passwordForm = document.getElementById('passwordForm');
const profilePictureInput = document.getElementById('profilePicture');
const profilePic = document.getElementById('profilePic');
const messageContainer = document.getElementById('profileMsg');
const markReadButtons = document.querySelectorAll('.mark-read-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const bookingItems = document.querySelectorAll('.booking-item');

// Tab Switching Functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
});

// Profile Picture Upload Preview
profilePictureInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Profile Form Submission
profileForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(profileForm);
    
    try {
        const response = await fetch('http://localhost:5000/api/user/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('Profile updated successfully!', 'success');
            // Update user info in sidebar
            if (result.user) {
                document.getElementById('userName').textContent = `${result.user.firstName} ${result.user.lastName}`;
                document.getElementById('userEmail').textContent = result.user.email;
                if (result.user.profilePicture) {
                    profilePic.src = `http://localhost:5000/uploads/${result.user.profilePicture}`;
                }
            }
        } else {
            showMessage(result.message || 'Failed to update profile', 'error');
        }
    } catch (error) {
        showMessage('Something went wrong. Please try again.', 'error');
    }
});

// Password Form Submission
passwordForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        showMessage('New passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:5000/api/user/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('Password updated successfully!', 'success');
            passwordForm.reset();
        } else {
            showMessage(result.message || 'Failed to update password', 'error');
        }
    } catch (error) {
        showMessage('Something went wrong. Please try again.', 'error');
    }
});

// Mark Notification as Read
markReadButtons.forEach(button => {
    button.addEventListener('click', function() {
        const notificationItem = this.closest('.notification-item');
        notificationItem.classList.remove('unread');
        this.style.display = 'none';
        
        // Update notification badge count
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const currentCount = parseInt(badge.textContent);
            if (currentCount > 1) {
                badge.textContent = currentCount - 1;
            } else {
                badge.style.display = 'none';
            }
        }
    });
});

// Booking History Filters
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter booking items
        bookingItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Booking Actions
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-danger')) {
        const bookingItem = e.target.closest('.booking-item');
        if (confirm('Are you sure you want to cancel this booking?')) {
            // Handle booking cancellation
            bookingItem.style.opacity = '0.5';
            showMessage('Booking cancelled successfully', 'success');
        }
    }
    
    if (e.target.closest('.btn-secondary')) {
        const button = e.target.closest('.btn-secondary');
        if (button.textContent.includes('View Details')) {
            // Handle view details
            showMessage('Opening booking details...', 'success');
        }
    }
    
    if (e.target.closest('.btn-primary')) {
        const button = e.target.closest('.btn-primary');
        if (button.textContent.includes('Review')) {
            // Handle review submission
            showMessage('Opening review form...', 'success');
        }
    }
});

// Toggle Switches for Notification Preferences
document.querySelectorAll('.toggle-label input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const preference = this.id;
        const isEnabled = this.checked;
        
        // Save preference to backend
        saveNotificationPreference(preference, isEnabled);
    });
});

// Save Notification Preferences
async function saveNotificationPreference(preference, isEnabled) {
    try {
        const response = await fetch('http://localhost:5000/api/user/notification-preferences', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                [preference]: isEnabled
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('Preferences updated successfully!', 'success');
        } else {
            showMessage('Failed to update preferences', 'error');
            // Revert the toggle if failed
            this.checked = !isEnabled;
        }
    } catch (error) {
        showMessage('Something went wrong', 'error');
        // Revert the toggle if failed
        this.checked = !isEnabled;
    }
}

// Show Message Function
function showMessage(message, type) {
    messageContainer.textContent = message;
    messageContainer.className = `message-container ${type} show`;
    
    setTimeout(() => {
        messageContainer.classList.remove('show');
    }, 3000);
}

// Load User Data on Page Load
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return;
    }
    try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        const user = await res.json();
        // TODO: Populate profile fields with user data here
        // Example:
        // document.getElementById('profile-name').textContent = user.name;
        // document.getElementById('profile-email').textContent = user.email;
    } catch (err) {
        // Handle error (e.g., show message, redirect to login)
        alert('Session expired or unauthorized. Please log in again.');
        window.location.href = 'login.html';
    }
});

// File Input Display Update
profilePictureInput.addEventListener('change', function() {
    const fileDisplay = document.querySelector('.file-input-display span');
    if (this.files[0]) {
        fileDisplay.textContent = this.files[0].name;
    } else {
        fileDisplay.textContent = 'Choose a file';
    }
});

// Profile Picture Container Click
document.querySelector('.profile-pic-container').addEventListener('click', function() {
    profilePictureInput.click();
});

// Auto-hide messages after 5 seconds
setInterval(() => {
    if (messageContainer.classList.contains('show')) {
        messageContainer.classList.remove('show');
    }
}, 5000);
  