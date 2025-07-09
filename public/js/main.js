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