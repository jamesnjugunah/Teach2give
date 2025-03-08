document.addEventListener("DOMContentLoaded", () => {
    const books = [
        { id: 1, title: "JavaScript Essentials", price: 15, available: true },
        { id: 2, title: "Python for Beginners", price: 20, available: true },
        { id: 3, title: "Mastering React", price: 25, available: true },
    ];

    const cart = [];
    const borrowed = [];

    const booksContainer = document.getElementById("books-container");
    const cartItems = document.getElementById("cart-items");
    const borrowedItems = document.getElementById("borrowed-items");
    const cartCount = document.getElementById("cart-count");
    const borrowCount = document.getElementById("borrow-count");

    // Functions to Update UI
    function updateCart() {
        cartItems.innerHTML = "";
        cart.forEach((book, index) => {
            const li = document.createElement("li");
            li.className = "cart-item";
            li.innerHTML = `<strong>${book.title}</strong> - $${book.price} 
                            <button onclick="removeFromCart(${index})">Remove</button>`;
            cartItems.appendChild(li);
        });
        cartCount.textContent = cart.length;
    }

    function updateBorrowed() {
        borrowedItems.innerHTML = "";
        borrowed.forEach((book, index) => {
            const li = document.createElement("li");
            li.className = "borrowed-item";
            li.innerHTML = `<strong>${book.title}</strong> 
                            <button onclick="returnBook(${index})">Return</button>`;
            borrowedItems.appendChild(li);
        });
        borrowCount.textContent = borrowed.length;
    }

    // Add/Remove Books
    function addToCart(id) {
        const book = books.find(b => b.id === id);
        cart.push(book);
        updateCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function borrowBook(id) {
        const book = books.find(b => b.id === id);
        if (book.available) {
            borrowed.push(book);
            book.available = false; // Mark the book as borrowed
            updateBorrowed();
            renderBooks(); // Refresh the book list to update the button state
        }
    }

    function returnBook(index) {
        const book = borrowed[index];
        book.available = true; // Mark the book as available again
        borrowed.splice(index, 1);
        updateBorrowed();
        renderBooks(); // Refresh the book list
    }

    // Modal Functions
    function openModal(id) {
        document.getElementById(id).style.display = "flex";
    }

    function closeModal(id) {
        document.getElementById(id).style.display = "none";
    }

    // Event Listeners for Modal Buttons
    document.getElementById("view-cart").addEventListener("click", () => openModal("cart-modal"));
    document.getElementById("view-borrowed").addEventListener("click", () => openModal("borrowed-modal"));
    document.getElementById("checkout").addEventListener("click", () => {
        if (cart.length > 0) {
            alert("Checkout successful!");
            cart.length = 0;
            updateCart();
        } else {
            alert("Your cart is empty!");
        }
    });

    // Function to Render Books
    function renderBooks() {
        booksContainer.innerHTML = "";
        books.forEach(book => {
            const div = document.createElement("div");
            div.className = "book";
            div.innerHTML = `<h3>${book.title}</h3>
                             <p>Price: $${book.price}</p>
                             <button onclick="addToCart(${book.id})">Add to Cart</button>
                             <button onclick="borrowBook(${book.id})" ${!book.available ? "disabled" : ""}>
                                 ${!book.available ? "Book Not Available" : "Borrow"}
                             </button>`;
            booksContainer.appendChild(div);
        });
    }

    // Initial Render
    renderBooks();

    // Expose functions globally
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.borrowBook = borrowBook;
    window.returnBook = returnBook;
    window.openModal = openModal;
    window.closeModal = closeModal;
});
