import {getAllBooks, addBook, updateBook, getBorrowedBooks, BorrowedBook} from '../services/books.js';
import { getBorrowedBooks } from './../../backend/src/controllers/book.controller';

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch and display books
const fetchBooks = async () => {
    try {
        const response = await fetch(getAllBooks);
        const books = await response.json();
        
        const booksContainer = document.getElementById('books-container');
        booksContainer.innerHTML = ''; // Clear previous content

        books.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Price:</strong> KES ${book.price}</p>
                <button onclick="addToCart(${book.id})">Add to Cart</button>
                <button onclick="borrowBook(${book.id})">Borrow</button>
            `;
            booksContainer.appendChild(bookDiv);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
    }
};

// Add book to cart
const addToCart = (bookId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(bookId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
};

// Borrow book
const borrowBook = async (bookId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/books/borrow`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookId })
        });
        if (response.ok) {
            alert('Book borrowed successfully!');
            response
        } else {
            alert('Error borrowing book.');
        }
    } catch (error) {
        console.error('Error borrowing book:', error);
    }
};

// Fetch and display borrowed books
const fetchBorrowedBooks = async () => {
    try {
        const response = await fetch(getBorrowedBooks);
        const borrowedBooks = await response.json();
        
        const borrowedItems = document.getElementById('borrowed-items');
        borrowedItems.innerHTML = ''; // Clear previous content

        borrowedBooks.forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = `${book.title} by ${book.author}`;
            borrowedItems.appendChild(listItem);
        });

        document.getElementById('borrow-count').textContent = borrowedBooks.length;
    } catch (error) {
        console.error('Error fetching borrowed books:', error);
    }
};

// Update cart count
const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
};

// Close modals
const closeModal = (modalId) => {
    document.getElementById(modalId).style.display = 'none';
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
    fetchBorrowedBooks();
    updateCartCount();
});
