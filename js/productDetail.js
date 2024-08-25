document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    fetch(`https://dummyjson.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            displayProductDetails(product);
        });

    function displayProductDetails(product) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
            <h1>${product.title}</h1>
            <div class="image-gallery">
                ${product.images.map(image => `
                    <img src="${image}" alt="${product.title}">
                `).join('')}
            </div>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <h3>Customer Reviews</h3>
            <ul class="reviews">
                ${product.reviews.map(review => `
                    <li>
                        <strong>${review.reviewerName}</strong> - ${review.date}
                        <p>Rating: ${review.rating}/5</p>
                        <p>${review.comment}</p>
                    </li>
                `).join('')}
            </ul>
        `;
    }
});
