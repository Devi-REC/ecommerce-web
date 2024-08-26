document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();


    const cardholderName = document.getElementById('cardholder-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (cardholderName && cardNumber && expiryDate && cvv) {
        
        alert('Processing payment...');

        setTimeout(() => {
            alert('Payment successful! Thank you for your purchase.');
            window.location.href = 'index.html'; 
        }, 1000);
    } else {
        alert('Please fill out all the fields.');
    }
});
