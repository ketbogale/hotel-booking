// Load configuration
// Make sure config.js is loaded before this file in your HTML

const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  errorMsg.className = 'error-message'; // Reset style
  errorMsg.textContent = '';
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Simple validation
  if (!email || !password) {
    errorMsg.textContent = 'Please fill in both fields.';
    errorMsg.className = 'error-message active error';
    setTimeout(() => {
      errorMsg.className = 'error-message';
      errorMsg.textContent = '';
    }, 2000);
    return;
  }
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailPattern.test(email)) {
    errorMsg.textContent = 'Please enter a valid email address.';
    errorMsg.className = 'error-message active error';
    setTimeout(() => {
      errorMsg.className = 'error-message';
      errorMsg.textContent = '';
    }, 2000);
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    if (result.success && result.token) {
      localStorage.setItem('token', result.token);
      // Fetch user profile after login to get name and email
      fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + result.token }
      })
      .then(res => res.json())
      .then(user => {
        if (user && user.email) {
          localStorage.setItem('user', JSON.stringify({
            name: (user.firstName ? user.firstName + ' ' : '') + (user.lastName || ''),
            email: user.email
          }));
        }
        // Redirect to intended page or home
        const redirect = localStorage.getItem('redirectAfterLogin');
        if (redirect) {
          localStorage.removeItem('redirectAfterLogin');
          window.location.href = redirect;
        } else {
          window.location.href = 'index.html';
        }
      });
    } else {
      errorMsg.textContent = 'Invalid email or password.';
      errorMsg.className = 'error-message active error';
      setTimeout(() => {
        errorMsg.className = 'error-message';
        errorMsg.textContent = '';
      }, 2000);
    }
  } catch (err) {
    errorMsg.textContent = 'Something went wrong. Please try again.';
    errorMsg.className = 'error-message active error';
    setTimeout(() => {
      errorMsg.className = 'error-message';
      errorMsg.textContent = '';
    }, 2000);
  }
});

// Forgot Password Modal Logic
const forgotLink = document.getElementById('forgotPasswordLink');
const forgotModal = document.getElementById('forgotPasswordModal');
const closeForgotModal = document.getElementById('closeForgotModal');
const sendResetBtn = document.getElementById('sendResetBtn');
const forgotEmail = document.getElementById('forgotEmail');
const forgotMsg = document.getElementById('forgotMsg');

forgotLink.addEventListener('click', function(e) {
  e.preventDefault();
  forgotModal.style.display = 'flex';
  forgotEmail.value = '';
  forgotMsg.textContent = '';
  forgotMsg.className = 'error-message';
});

closeForgotModal.addEventListener('click', function() {
  forgotModal.style.display = 'none';
});

window.addEventListener('click', function(e) {
  if (e.target === forgotModal) forgotModal.style.display = 'none';
});

sendResetBtn.addEventListener('click', async function() {
  const email = forgotEmail.value.trim();
  if (!email) {
    forgotMsg.textContent = 'Please enter your email address.';
    forgotMsg.className = 'error-message active error';
    return;
  }
  // Send request to backend
  try {
    const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    forgotMsg.textContent = data.message || 'If this email is registered, you will receive password reset instructions.';
    forgotMsg.className = 'error-message active success';
  } catch (err) {
    forgotMsg.textContent = 'Something went wrong. Please try again.';
    forgotMsg.className = 'error-message active error';
  }
});