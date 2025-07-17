// public/js/payment.js

document.addEventListener('DOMContentLoaded', function() {
const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');
const user = JSON.parse(localStorage.getItem('user') || '{}');
const summaryDiv = document.getElementById('bookingSummary');
const statusDiv = document.getElementById('paymentStatus');

// Show booking details
if (bookingData && bookingData.checkin) {
    summaryDiv.innerHTML = `
      <div class="summary-item"><span class="summary-icon">📅</span><span class="summary-label">Check-In:</span> <span class="summary-value">${bookingData.checkin}</span></div>
      <div class="summary-item"><span class="summary-icon">🏁</span><span class="summary-label">Checkout:</span> <span class="summary-value">${bookingData.checkout}</span></div>
      <div class="summary-item"><span class="summary-icon">🛏️</span><span class="summary-label">Rooms & Guests:</span> <span class="summary-value">${bookingData.rooms}</span></div>
      <div class="summary-item"><span class="summary-icon">🏷️</span><span class="summary-label">Rate:</span> <span class="summary-value">${bookingData.rate || 'Standard'}</span></div>
      <div class="summary-item"><span class="summary-icon">💵</span><span class="summary-label">Amount:</span> <span class="summary-value">${bookingData.amount ? bookingData.amount + ' ETB' : '100 ETB'}</span></div>
    `;
} else {
  summaryDiv.innerHTML = '<em>No booking data found.</em>';
}

// Chapa payment integration
  const payBtn = document.getElementById('payBtn');
  if (payBtn) {
    payBtn.onclick = function() {
      const amount = bookingData.amount || 100;
  const email = user.email || 'customer@example.com';
  const firstName = user.name ? user.name.split(' ')[0] : 'First';
  const lastName = user.name ? user.name.split(' ')[1] || 'Last' : 'Last';

      ChapaCheckout.init({
        publicKey: 'CHAPUBK_TEST-Bs25zCzE4kQ2FteIcKUrvxilIFIeiye5', // <-- Use your test public key
    tx_ref: 'tx-' + Date.now(),
    amount: amount,
    currency: 'ETB',
    email: email,
    first_name: firstName,
    last_name: lastName,
    title: 'Hotel Booking Payment',
    description: 'Payment for hotel booking',
    callback: function(response) {
      fetch('http://localhost:5000/api/payment/verify?tx_ref=' + response.tx_ref, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
              statusDiv.textContent = 'Payment successful! Redirecting...';
          statusDiv.style.color = '#27ae60';
          setTimeout(() => {
            localStorage.removeItem('bookingData');
                window.location.href = 'thank-you.html';
              }, 1500);
        } else {
              statusDiv.textContent = 'Payment could not be verified.';
          statusDiv.style.color = '#e74c3c';
        }
      })
      .catch(() => {
            statusDiv.textContent = 'Error verifying payment.';
        statusDiv.style.color = '#e74c3c';
      });
    },
    onclose: function() {
          statusDiv.textContent = 'Payment popup closed.';
      statusDiv.style.color = '#e67e22';
    }
  });
};
  }
}); 