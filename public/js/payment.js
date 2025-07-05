document.getElementById('paymentForm').onsubmit = function(e) {
  e.preventDefault();
  const method = document.querySelector('input[name="payment"]:checked').value;
  alert('You selected: ' + method.replace('_', ' '));
  // Here you can add logic to handle each payment method
};