// public/js/authGuard.js
(function() {
    // List of pages that do NOT require login
    const publicPages = [
      '/public/html/login.html',
      '/public/html/register.html',
    // (optional: allow home page)
    ];
  
    // Get current path
    const currentPath = window.location.pathname;
  
    // If not a public page, check login
    if (!publicPages.includes(currentPath)) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.email) {
        // Store intended page for redirect after login
        localStorage.setItem('redirectAfterLogin', currentPath);
        window.location.href = 'login.html';
      }
    }
  })();