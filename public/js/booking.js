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
const dayAfterTomorrow = addDays(today, 2);
checkin.value = tomorrow;
checkout.value = dayAfterTomorrow;
checkin.min = tomorrow;
checkout.min = dayAfterTomorrow;

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
    window.location.href = 'login.html';
    return;
  }

  // Validate dates
  if (new Date(checkin.value) <= new Date(today)) {
    showError('Check-in date must be after today');
    return;
  }
  if (new Date(checkout.value) <= new Date(checkin.value)) {
    showError('Checkout date must be after check-in date');
    return;
  }
  hideError();

  // Collect form data
  const formData = {
    email: user.email,
    checkin: checkin.value,
    checkout: checkout.value,
    rooms: document.getElementById('rooms').value,
    rate: document.getElementById('rate').value,
    amount: "100" // Default amount, can be calculated dynamically
  };

  // Save booking data to localStorage for payment page
  localStorage.setItem('bookingData', JSON.stringify(formData));

  // Generate a simple tx_ref for payment
  const tx_ref = 'tx_' + Date.now();
  localStorage.setItem('tx_ref', tx_ref);

  // Redirect to payment page
  window.location.href = 'pay.html';
});

// Success message helper
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