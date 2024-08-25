document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the form data
    const cardholderName = document.getElementById('cardholder-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Simple validation (just an example, you should improve validation)
    if (cardholderName && cardNumber && expiryDate && cvv) {
        // Simulate payment process
        alert('Processing payment...');

        // Simulate successful payment
        setTimeout(() => {
            alert('Payment successful! Thank you for your purchase.');
            window.location.href = 'index.html'; // Redirect to homepage or a success page
        }, 1000);
    } else {
        alert('Please fill out all the fields.');
    }
});
