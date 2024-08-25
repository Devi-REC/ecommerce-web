document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            const product = data.products.find(product => product.id == productId);
            if (product) {
                displayProductDetails(product);
            } else {
                document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
            }
        })
        .catch(error => console.error('Error fetching product details:', error));

    function displayProductDetails(product) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
            <button id="back-btn" class="btn-back">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 4L8 12L14 20" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="product">
                <h1 class="product-title">${product.title}</h1>
                <div class="image-gallery">
                    ${product.images.map(image => `
                        <img src="${image}" alt="${product.title}" class="product-image">
                    `).join('')}
                </div>
                <p class="product-description">${product.description}</p>
                <p class="product-price">Price: ₹${product.price}</p>
            </div>
            <div class="product">
                <h3>Customer Reviews</h3>
                <ul class="reviews">
                    ${product.reviews.map(review => `
                        <li class="review-item">
                            <strong>${review.reviewerName}</strong> - ${review.date}
                            <div class="rating">
                                ${[1, 2, 3, 4, 5].map(star => `
                                    <span class="star ${star <= review.rating ? 'filled' : ''}" data-rating="${star}">&#9733;</span>
                                `).join('')}
                            </div>
                            <p>${review.comment}</p>
                        </li>
                    `).join('')}
                </ul>
          
            <button id="add-to-cart-btn" class="btn-add-to-cart">
            Add to cart
               
            </button>
            </div>
        `;

        document.getElementById('back-btn').addEventListener('click', () => {
            window.history.back();
        });

        document.getElementById('add-to-cart-btn').addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.images[0]
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Added to cart!');
        });

        const images = document.querySelectorAll('.product-image');
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="" alt="Zoomed Image">
            </div>
        `;
        document.body.appendChild(modal);

        const modalImage = modal.querySelector('img');
        const closeButton = modal.querySelector('.close');

        images.forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImage.src = img.src;
                modalImage.onload = () => {
                    modalImage.style.opacity = 1;
                };
                modalImage.style.opacity = 0;
            });
        });

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
