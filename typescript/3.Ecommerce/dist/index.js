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
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const sortCriteria = document.getElementById("sortCriteria");
    const sortButton = document.getElementById("sortButton");
    const bookList = document.getElementById("bookList");
    const cartList = document.getElementById("cartList");
    const totalAmount = document.getElementById("totalAmount");
    let books = [];
    let cart = {};
    // Fetch books from JSON Server
    function fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("http://localhost:3000/Library");
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                books = yield response.json();
                console.log("Fetched books:", books);
                displayBooks(books);
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        });
    }
    // Display books
    function displayBooks(books) {
        if (!bookList)
            return;
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
              <p><strong>Price:</strong> $${parseFloat(book.price.toString()).toFixed(2)}</p>
              <button class="buy-button" data-title="${book.title}">Add to Cart</button>
            </div>
          </div>
        `)
            .join("");
    }
    // Update Cart UI
    function updateCart() {
        if (!cartList || !totalAmount)
            return;
        cartList.innerHTML = Object.values(cart)
            .map((item) => `
          <div class="cart-item">
            <span class="remove-item" data-id="${item.book.id}">&times;</span>
            <p><strong>${item.book.title}</strong> - $${parseFloat(item.book.price.toString()).toFixed(2)}</p>
            <div class="cart-controls">
              <button class="decrease-qty" data-title="${item.book.title}">-</button>
              <span>${item.quantity}</span>
              <button class="increase-qty" data-title="${item.book.title}">+</button>
            </div>
          </div><hr>
        `)
            .join("");
        let total = Object.values(cart).reduce((sum, item) => sum + item.quantity * parseFloat(item.book.price.toString()), 0);
        totalAmount.innerText = `Total: $${total.toFixed(2)}`;
    }
    function addToCart(book) {
        if (cart[book.title]) {
            cart[book.title].quantity += 1;
        }
        else {
            cart[book.title] = { book, quantity: 1 };
        }
        updateCart();
    }
    function updateCartQuantity(title, change) {
        if (cart[title]) {
            cart[title].quantity += change;
            if (cart[title].quantity <= 0)
                delete cart[title];
        }
        updateCart();
    }
    function removeFromCart(bookId) {
        for (const key in cart) {
            if (cart[key].book.id === bookId) {
                delete cart[key];
                break;
            }
        }
        updateCart();
    }
    fetchData();
});
//# sourceMappingURL=index.js.map