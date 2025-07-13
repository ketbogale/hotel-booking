// Close modal functionality
document.getElementById('closeModal').addEventListener('click', function() {
  document.querySelector('.modal-bg').style.display = 'none';
});

// Date handling functions
function todayString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}
function addDays(dateStr, days) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

// Initialize date inputs
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');
const bookingForm = document.getElementById('bookingForm');

// Set initial dates
const today = todayString();
const tomorrow = addDays(today, 1);
checkin.value = today;
checkout.value = tomorrow;
checkin.min = today;
checkout.min = today;

// When check-in changes, update checkout constraints
checkin.addEventListener('change', function() {
  const newCheckinDate = checkin.value;
  const minCheckoutDate = addDays(newCheckinDate, 1);
  checkout.min = minCheckoutDate;
  if (new Date(checkout.value) <= new Date(newCheckinDate)) {
    checkout.value = minCheckoutDate;
  }
});

// Error message helpers
function showError(message) {
  const errorDiv = document.getElementById('bookingError');
  errorDiv.textContent = message;
  errorDiv.style.display = 'flex';
  errorDiv.classList.remove('fadeout');
  clearTimeout(window.errorTimeout);
  window.errorTimeout = setTimeout(() => {
    hideError();
  }, 3000);
}
function hideError() {
  const errorDiv = document.getElementById('bookingError');
  errorDiv.classList.add('fadeout');
  setTimeout(() => {
    errorDiv.style.display = 'none';
    errorDiv.classList.remove('fadeout');
  }, 300);
}

// When checkout changes, validate it's after checkin
checkout.addEventListener('change', function() {
  if (new Date(checkout.value) <= new Date(checkin.value)) {
    showError('Checkout date must be after check-in date');
    checkout.value = addDays(checkin.value, 1);
  } else {
    hideError();
  }
});

// Booking form submission
bookingForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  if (!user || !user.email || !token) {
    window.location.href = 'html/login.html';
    return;
  }

  // Validate dates
  if (new Date(checkout.value) <= new Date(checkin.value)) {
    showError('Checkout date must be after check-in date');
    return;
  }
  hideError();

  // Collect form data
  const formData = {
    checkin: checkin.value,
    checkout: checkout.value,
    rooms: document.getElementById('rooms').value,
    rate: document.getElementById('rate').value
  };

  // Save booking data to localStorage (optional, for payment page)
  localStorage.setItem('bookingData', JSON.stringify(formData));

  // Send booking data to backend for DB storage and email
  fetch('http://localhost:5000/api/booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      showSuccess('Booking successful! Confirmation sent to your email.');
      setTimeout(() => {
        window.location.href = 'payment.html';
      }, 2500); // Wait for the animation to finish before redirecting
    } else {
      showError('Booking failed. Please try again.');
    }
  })
  .catch(() => showError('Booking failed. Please try again.'));
});
function showSuccess(message) {
  const successDiv = document.getElementById('bookingSuccess');
  successDiv.textContent = message;
  successDiv.style.display = 'block';
  // Restart animation
  successDiv.style.animation = 'none';
  void successDiv.offsetWidth; // trigger reflow
  successDiv.style.animation = '';
  // Hide after animation
  setTimeout(() => {
    successDiv.style.display = 'none';
  }, 2500);
}