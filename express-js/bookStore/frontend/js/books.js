import { getAllBooks, borrowBook, getBorrowedBooks } from '../services/api.js';

// Fetch and display books
const fetchBooks = async () => {
    const books = await getAllBooks();
    
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = ''; // Clear previous content

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Price:</strong> KES ${book.price}</p>
            <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
            <button class="borrow-book" data-id="${book.id}">Borrow</button>
        `;
        booksContainer.appendChild(bookDiv);
    });

    attachEventListeners();
};

// Attach event listeners for dynamic buttons
const attachEventListeners = () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const bookId = event.target.getAttribute('data-id');
            addToCart(bookId);
        });
    });

    document.querySelectorAll('.borrow-book').forEach(button => {
        button.addEventListener('click', async (event) => {
            const bookId = event.target.getAttribute('data-id');
            const success = await borrowBook(bookId);
            if (success) {
                alert('Book borrowed successfully!');
                fetchBorrowedBooks(); // Refresh the borrowed books list
            } else {
                alert('Failed to borrow book.');
            }
        });
    });
};

// Add book to cart
const addToCart = (bookId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(bookId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
};

// Fetch and display borrowed books
const fetchBorrowedBooks = async () => {
    const borrowedBooks = await getBorrowedBooks();
    
    const borrowedItems = document.getElementById('borrowed-items');
    borrowedItems.innerHTML = ''; // Clear previous content

    borrowedBooks.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} by ${book.author}`;
        borrowedItems.appendChild(listItem);
    });

    document.getElementById('borrow-count').textContent = borrowedBooks.length;
};

// Update cart count
const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
};

// Close modals
const closeModal = (modalId) => {
    document.getElementById().style.display = 'none';
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
    fetchBorrowedBooks();
    updateCartCount();
});
