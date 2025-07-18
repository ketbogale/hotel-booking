document.getElementById('registerForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Get form values
  const firstname = document.getElementById('firstName').value.trim();
  const lastname = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorDiv = document.getElementById('errorMsg');
  const submitBtn = document.querySelector('.login-btn');
    // Simple validation
    if (!firstname || !lastname || !email || !password) {
      showError("Please fill in all fields.");
      return;
    }
  
    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError("Please enter a valid email address.");
      return;
    }
  
    // Password length validation
    if (password.length < 6) {
      showError("Password must be at least 6 characters.");
      return;
    }

  // Helper to show error
  function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.add('active', 'error');
    errorDiv.classList.remove('success');
    setTimeout(() => {
      errorDiv.classList.remove('active');
      errorDiv.textContent = '';
    }, 5000);
  }

  // Helper to show success
  function showSuccess(message) {
    errorDiv.textContent = message;
    errorDiv.classList.add('active', 'success');
    errorDiv.classList.remove('error');
    setTimeout(() => {
      errorDiv.classList.remove('active');
      errorDiv.textContent = '';
    }, 8000);
  }

  // Helper to show loading state
  function setLoading(loading) {
    if (loading) {
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Registering...';
      submitBtn.disabled = true;
    } else {
      submitBtn.classList.remove('loading');
      submitBtn.textContent = 'Register';
      submitBtn.disabled = false;
    }
  }

  // Prepare data to send
  const formData = {
    firstName: firstname,
    lastName: lastname,
    email: email,
    password: password
  };

  try {
    setLoading(true);
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    // Check response status before parsing
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    const result = await response.json();
    
    if (result.message) {
      // Registration successful
      showSuccess(result.message);
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        this.reset();
        window.location.href = "login.html";
      }, 3000);
    }
  } catch (err) {
    showError(err.message || "An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
});

// Add input focus effects
document.querySelectorAll('.form-group input').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    if (!this.value) {
      this.parentElement.classList.remove('focused');
    }
  });
});

// Add real-time validation feedback
document.getElementById('email').addEventListener('blur', function() {
  const email = this.value.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    this.style.borderColor = '#e74c3c';
  } else if (email) {
    this.style.borderColor = '#2ecc71';
  }
});

document.getElementById('password').addEventListener('input', function() {
  const password = this.value;
  if (password.length > 0 && password.length < 6) {
    this.style.borderColor = '#e74c3c';
  } else if (password.length >= 6) {
    this.style.borderColor = '#2ecc71';
  }
});
