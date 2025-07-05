// Close modal functionality
document.getElementById('closeModal').onclick = function() {
  document.querySelector('.modal-bg').style.display = 'none';
};

// Prevent form submission (for demo)
document.getElementById('bookingForm').onsubmit = function(e) {
  e.preventDefault();
  alert('Booking submitted!');
};

// (Optional) Add date picker functionality if you want real date selection
// For now, the fields are readonly and just show the placeholder as in the image.
function todayString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');

// Set minimum for check-in as today
checkin.min = todayString();

// When check-in changes, set min for check-out
checkin.addEventListener('change', function() {
  checkout.min = checkin.value;
  if (checkout.value < checkin.value) {
    checkout.value = checkin.value;
  }
});

// ... existing code ...

function todayString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function addDays(dateStr, days) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');

// Set minimum for check-in as today
checkin.min = todayString();

// When check-in changes, set min for check-out to the day after check-in
checkin.addEventListener('change', function() {
  const minCheckout = addDays(checkin.value, 1);
  checkout.min = minCheckout;
  if (!checkout.value || checkout.value <= checkin.value) {
    checkout.value = minCheckout;
  }
});

// When checkout changes, ensure it's after check-in
checkout.addEventListener('change', function() {
  if (checkout.value <= checkin.value) {
    checkout.value = addDays(checkin.value, 1);
  }
});
