document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-list');
    const buyNowBtn = document.getElementById('buy-now-btn');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render cart items
    // Function to render cart items
const renderCart = () => {
    if (cart.length > 0) {
        cartList.innerHTML = cart.map((item, index) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            const totalPrice = (price * quantity).toFixed(2);

            return `
                <div class="cart-item">
                    <input type="checkbox" class="select-item" data-index="${index}">
                    <img src="${item.image}" alt="${item.title}" />
                    <h3>${item.title}</h3>
                    <div class="price">
                        <p>₹${totalPrice}</p> <!-- Display formatted total price -->
                    </div>
                    <label for="quantity-${index}">Quantity:</label>
                    <select id="quantity-${index}" class="quantity-select" data-index="${index}">
                        ${[...Array(10).keys()].map(i => `
                            <option value="${i+1}" ${i+1 === quantity ? 'selected' : ''}>${i+1}</option>
                        `).join('')}
                    </select>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            `;
        }).join('');
    } else {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
    }
};


    // Function to update cart in localStorage and re-render
    const updateCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    // Render cart on page load
    renderCart();

    // Handle Remove button click
    cartList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Handle quantity change
    cartList.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity-select')) {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity = parseInt(e.target.value);
            updateCart();
        }
    });

    // Handle Buy Now button click
    buyNowBtn.addEventListener('click', () => {
        const selectedItems = Array.from(document.querySelectorAll('.select-item:checked')).map(checkbox => parseInt(checkbox.getAttribute('data-index')));
        if (selectedItems.length > 0) {
            alert('Thank you for your purchase! Redirecting to payment page...');
            window.location.href = 'payment.html'; // Replace with actual payment page URL

            // After payment success, remove purchased items
            cart = cart.filter((item, index) => !selectedItems.includes(index));
            updateCart();
        } else {
            alert('Please select items to purchase!');
        }
    });

    // Function to add items to cart (Call this function when an item is added)
    const addToCart = (newItem) => {
        const existingItemIndex = cart.findIndex(item => item.id === newItem.id);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...newItem, quantity: 1 });
        }
        updateCart();
    };
      // Add any general JS code here
      document.addEventListener('mousemove', (e) => {
        createGlitter(e.clientX, e.clientY);
    });
    function createGlitter(x, y) {
        const glitterContainer = document.getElementById('glitter-container');
        if (!glitterContainer) {
            console.error('Glitter container not found.');
            return;
        }

        const glitter = document.createElement('div');
        glitter.classList.add('glitter');
        glitter.style.left = `${x}px`;
        glitter.style.top = `${y}px`;
        
        glitterContainer.appendChild(glitter);

        gsap.to(glitter, {
            opacity: 1,
            duration: 0.3,
            ease: "power1.out",
            onComplete: () => {
                gsap.to(glitter, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.in",
                    onComplete: () => {
                        glitter.remove();
                    }
                });
            }
        });
    }
});
