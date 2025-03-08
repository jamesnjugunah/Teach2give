"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const bookList = document.getElementById('bookList');
    const cartList = document.getElementById('cartList');
    const totalAmount = document.getElementById('totalAmount');
    const sortOptions = document.getElementById('sortCriteria');
    let currentSort = {
        field: 'title',
        direction: 'asc'
    };
    let currentSearchQuery = "";
    let books = [];
    let cart = {}; // Cart with book title as key
    // Fetch books from backend with optional search query and sorting
    const fetchData = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (searchQuery = "", sortField = "title", sortDirection = "asc") {
        try {
            let queryParams = [];
            // Add search parameters
            if (searchQuery) {
                const isNumeric = !isNaN(Number(searchQuery));
                if (isNumeric && Number(searchQuery) > 1000) {
                    queryParams.push(`year=${encodeURIComponent(searchQuery)}`);
                }
                else if (["fiction", "dystopian", "fantasy", "adventure", "romance", "mystery", "epic poetry", "historical fiction"].includes(searchQuery.toLowerCase())) {
                    queryParams.push(`genre=${encodeURIComponent(searchQuery)}`);
                }
                else {
                    queryParams.push(`title=${encodeURIComponent(searchQuery)}`);
                }
            }
            // Add sorting parameters
            queryParams.push(`sort=${sortField}`);
            queryParams.push(`order=${sortDirection}`);
            // Construct URL with all parameters
            const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
            const url = `http://localhost:3000/api/events${queryString}`;
            console.log("Fetching from URL:", url);
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            console.log("Response data:", data);
            // Update books array and display them
            books = data;
            displayBooks(books);
            return data;
        }
        catch (error) {
            console.error("Error fetching books:", error);
            displayBooks([]);
            return [];
        }
    });
    // Display books in UI
    function displayBooks(books) {
        if (!bookList) {
            console.error("Error: bookList element not found!");
            return;
        }
        bookList.innerHTML = books
            .map((book) => `
          <div class="book-card">
            <div class="image">
              <img src="${book.image}" alt="Book cover" />
            </div>
            <div class="content">
              <h3>${book.title}</h3>
              <p><strong>Author:</strong> ${book.author}</p>
              <p><strong>Genre:</strong> ${book.genre}</p>
              <p><strong>Year:</strong> ${book.year}</p>
              <p><strong>Pages:</strong> ${book.pages}</p>
              <p><strong>Price:</strong> $${book.price.toFixed(2)}</p>
              <button class="buy-button" data-title="${book.title}">Add to Cart</button>
            </div>
          </div>
        `)
            .join('');
        console.log("Books rendered successfully.");
    }
    // Update Cart UI
    function updateCart() {
        cartList.innerHTML = Object.values(cart)
            .map((item) => `
          <div class="cart-item">
            <span class="remove-item" data-title="${item.book.title}">&times;</span>
            <p><strong>${item.book.title}</strong> - $${item.book.price.toFixed(2)}</p>
            <div class="cart-controls">
              <button class="decrease-qty" data-title="${item.book.title}">-</button>
              <span>${item.quantity}</span>
              <button class="increase-qty" data-title="${item.book.title}">+</button>
            </div>
          </div><hr>
        `)
            .join('');
        // Update total amount
        let total = Object.values(cart).reduce((sum, item) => sum + item.quantity * item.book.price, 0);
        totalAmount.innerText = `Total: $${total.toFixed(2)}`;
    }
    // Add Book to Cart
    function addToCart(book) {
        if (cart[book.title]) {
            cart[book.title].quantity += 1;
        }
        else {
            cart[book.title] = { book, quantity: 1 };
        }
        updateCart();
    }
    // Update Cart Quantity
    function updateCartQuantity(title, change) {
        if (cart[title]) {
            cart[title].quantity += change;
            // Remove item if quantity is 0
            if (cart[title].quantity <= 0) {
                delete cart[title];
            }
        }
        updateCart();
    }
    // Remove Item from Cart
    function removeFromCart(title) {
        if (cart[title]) {
            delete cart[title];
            updateCart();
        }
    }
    // Handle sort dropdown change
    if (sortOptions) {
        sortOptions.addEventListener('change', () => {
            const [field, direction] = sortOptions.value.split('-');
            currentSort.field = field;
            currentSort.direction = direction;
            console.log(`Sorting by ${field} in ${direction} order`);
            // Refetch data with current search query and new sort parameters
            fetchData(currentSearchQuery, currentSort.field, currentSort.direction);
        });
    }
    else {
        console.error("Sort dropdown element not found!");
    }
    // Handle Adding Books to Cart
    bookList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('buy-button')) {
            const bookTitle = target.dataset.title;
            const bookDetails = books.find((b) => b.title === bookTitle);
            if (bookDetails)
                addToCart(bookDetails);
        }
    });
    // Handle Cart Quantity Changes
    cartList.addEventListener('click', (event) => {
        const target = event.target;
        const title = target.dataset.title;
        if (target.classList.contains('increase-qty')) {
            updateCartQuantity(title, 1);
        }
        else if (target.classList.contains('decrease-qty')) {
            updateCartQuantity(title, -1);
        }
        else if (target.classList.contains('remove-item')) {
            removeFromCart(title);
        }
    });
    // Handle Search Functionality
    searchButton.addEventListener('click', () => {
        currentSearchQuery = searchInput.value.trim();
        fetchData(currentSearchQuery, currentSort.field, currentSort.direction);
    });
    // Initial data fetch with default sorting
    fetchData("", currentSort.field, currentSort.direction);
});
//# sourceMappingURL=index.js.map