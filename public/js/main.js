document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // Example: Replace with your real login logic (API call)
  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success && data.user) {
      // Save user info to localStorage
      localStorage.setItem('user', JSON.stringify({
        name: data.user.firstName + ' ' + data.user.lastName,
        email: data.user.email
      }));

      // Redirect to intended page or home
      const redirect = localStorage.getItem('redirectAfterLogin');
      if (redirect) {
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirect;
      } else {
        window.location.href = 'index.html';
      }
    } else {
      // Show error message
      document.getElementById('loginError').textContent = 'Invalid credentials';
      document.getElementById('loginError').style.display = 'block';
    }
  })
  .catch(() => {
    document.getElementById('loginError').textContent = 'Login failed. Try again.';
    document.getElementById('loginError').style.display = 'block';
  });
});

// Network status notification for all pages
function updateNetworkStatus() {
  let statusDiv = document.getElementById('networkStatus');
  if (!statusDiv) {
    statusDiv = document.createElement('div');
    statusDiv.id = 'networkStatus';
    document.body.appendChild(statusDiv);
  }
  if (navigator.onLine) {
    statusDiv.textContent = 'You are back online!';
    statusDiv.className = 'network-status online';
    statusDiv.style.display = 'block';
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 2000);
  } else {
    statusDiv.textContent = 'You are offline. Some features may not work.';
    statusDiv.className = 'network-status offline';
    statusDiv.style.display = 'block';
  }
}
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
window.addEventListener('DOMContentLoaded', updateNetworkStatus);

document.addEventListener('DOMContentLoaded', function() {
  // Support multiple logout buttons
  const logoutBtns = document.querySelectorAll('#logoutBtn, .logout-btn');
  logoutBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    });
  });
});