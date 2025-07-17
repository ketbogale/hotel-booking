// public/js/authGuard.js
(function() {
    // List of pages that do NOT require login
    const publicPages = [
      '/public/html/login.html',
      '/public/html/register.html',
    ];

    // Get current path
    const currentPath = window.location.pathname;
    const user = JSON.parse(localStorage.getItem('user'));

    // If not a public page, check login
    if (!publicPages.includes(currentPath)) {
      if (!user || !user.email) {
        // Store intended page for redirect after login
        localStorage.setItem('redirectAfterLogin', currentPath);
        window.location.href = 'login.html';
      }
    } else {
      // If already logged in, prevent access to login/register
      if (user && user.email) {
        window.location.href = 'profile.html'; // or 'index.html' if you prefer
      }
    }
})();