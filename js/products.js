document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');
    let productsData = [];

    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            productsData = data.products;
            displayProducts(productsData);
            populateCategoryFilter();
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            const productList = document.getElementById('product-list');
            productList.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        });

    function displayProducts(products) {
        const productList = document.getElementById('product-list');
        if (products.length === 0) {
            productList.innerHTML = '<p>No products found.</p>';
            return;
        }

        productList.innerHTML = products.map(product => `
            <div class="product-card glass" data-id="${product.id}">
                <img src="${product.images[0]}" alt="${product.title}" />
                <h3>${product.title}</h3>
                <p>₹${product.price}</p>
                <a href="product-detail.html?id=${product.id}">View Details</a>
            </div>
        `).join('');

        gsap.from(".product-card", { 
            opacity: 0, 
            y: 50, 
            stagger: 0.2, 
            duration: 1 
        });
    }

    function populateCategoryFilter() {
        const categories = Array.from(new Set(productsData.map(product => product.category)));
        const categoryFilter = document.getElementById('category-filter');

        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'All';
        categoryFilter.appendChild(allOption);

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = capitalizeFirstLetter(category);
            categoryFilter.appendChild(option);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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

    searchBar.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);

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
