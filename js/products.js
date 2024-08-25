document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');
    let productsData = [];

    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            productsData = data.products;
            displayProducts(productsData);
        });

    // Display products based on search and filter criteria
    function displayProducts(products) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.thumbnail}" alt="${product.title}" />
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <a href="product-detail.html?id=${product.id}">View Details</a>
            </div>
        `).join('');
    }

    // Filter products based on search input and category
    function filterProducts() {
        const searchQuery = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredProducts = productsData.filter(product => {
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        displayProducts(filteredProducts);
    }

    // Add event listeners to search and filter inputs
    searchBar.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
});
