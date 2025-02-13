document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5000/products")  // Fetch data from JSON Server
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("product-list");
            
            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    <h2>${product.name}</h2>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                    <p><strong>Stock:</strong> ${product.stock}</p>
                `;

                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});