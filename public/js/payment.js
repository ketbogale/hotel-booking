// Display booking summary
const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');
/*const summaryDiv = document.getElementById('bookingSummary');
if (bookingData && bookingData.checkin) {
  // Build summary using DOM methods to avoid linter issues
  const box = document.createElement('div');
  box.className = 'summary-box';
  box.innerHTML =
    '<strong>Check-In:</strong> ' + bookingData.checkin + '<br>' +
    '<strong>Checkout:</strong> ' + bookingData.checkout + '<br>' +
    '<strong>Rooms & Guests:</strong> ' + bookingData.rooms + '<br>' +
    '<strong>Rate:</strong> ' + (bookingData.rate || 'Standard') + '<br>';
  summaryDiv.innerHTML = '';
  summaryDiv.appendChild(box);
  summaryDiv.innerHTML += '<hr>';
} else {
  summaryDiv.innerHTML = '';
}
*/
// Error/success helpers
function showPaymentError(msg) {
  const err = document.getElementById('paymentError');
  err.textContent = msg;
  err.style.display = 'block';
  setTimeout(() => { err.style.display = 'none'; }, 3000);
}
function showPaymentSuccess(msg) {
  const succ = document.getElementById('paymentSuccess');
  succ.textContent = msg;
  succ.style.display = 'block';
  setTimeout(() => { succ.style.display = 'none'; }, 3000);
}

// Payment form handler
document.getElementById('paymentForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Simple validation
  const cardName = document.getElementById('cardName').value.trim();
  const cardNumber = document.getElementById('cardNumber').value.replace(/\\s+/g, '');
  const expiry = document.getElementById('expiry').value.trim();
  const cvv = document.getElementById('cvv').value.trim();

  if (!cardName || !cardNumber || !expiry || !cvv) {
    showPaymentError('Please fill in all payment fields.');
    return;
  }
  if (!/^\\d{16,19}$/.test(cardNumber)) {
    showPaymentError('Invalid card number.');
    return;
  }
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    showPaymentError('Expiry must be in MM/YY format.');
    return;
  }
  if (!/^\\d{3,4}$/.test(cvv)) {
    showPaymentError('Invalid CVV.');
    return;
  }

  // (Optional) Send to backend for real payment processing
  // For demo, just show success
  showPaymentSuccess('Payment successful! Thank you for your booking.');

  // Optionally, clear booking data and redirect after a delay
  setTimeout(() => {
    localStorage.removeItem('bookingData');
    window.location.href = 'index.html'; // or a confirmation page
  }, 2000);
});