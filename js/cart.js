document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-list');
    const buyNowBtn = document.getElementById('buy-now-btn');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render cart items
    const renderCart = () => {
        if (cart.length > 0) {
            cartList.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" />
                    <h3>${item.title}</h3>
                    <p>$${item.price}</p>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `).join('');
        } else {
            cartList.innerHTML = '<p>Your cart is empty.</p>';
        }
    };

    // Render cart on page load
    renderCart();

    // Handle Remove button click
    cartList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    // Handle Buy Now button click
    buyNowBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // Clear the cart
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();

            // Show success message
            alert('Thank you for your purchase! Redirecting to payment page...');
            window.location.href = 'payment.html'; // Replace with actual payment page URL
        } else {
            alert('Your cart is empty!');
        }
    });
});
