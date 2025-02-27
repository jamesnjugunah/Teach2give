document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const sortCriteria = document.getElementById('sortCriteria');
  const sortButton = document.getElementById('sortButton');
  const bookList = document.getElementById('bookList');
  const cartList = document.getElementById('cartList');
  const totalAmount = document.getElementById('totalAmount');

  let books = [];
  let cart = {}; // Object to store cart items (key: book title, value: { book details, quantity })

  // Fetch books from JSON Server
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000/Library');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      books = await response.json();
      console.log("Fetched books:", books);
      displayBooks(books);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Display books in the UI
  function displayBooks(books) {
    if (!bookList) {
      console.error("Error: bookList element not found!");
      return;
    }

    bookList.innerHTML = books
      .map(
        (book) => `
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
            <p><strong>Price:</strong> $${parseFloat(book.price).toFixed(2)}</p>
            <button class="buy-button" data-title="${book.title}" data-author="${book.author}" data-genre="${book.genre}" data-price="${book.price}">
              Add to Cart
            </button>
          </div>
        </div>
      `
      )
      .join('');

    console.log("Books rendered successfully.");
  }

  // Update the cart UI
  function updateCart() {
    cartList.innerHTML = Object.values(cart)
      .map(
        (item) => `
        <div class="cart-item">
         <span class="remove-item" onclick="removeFromCart(${item.book.id})">&times;</span>
          <p><strong>${item.book.title}</strong> - $${parseFloat(item.book.price).toFixed(2)}</p>
          <div class="cart-controls">
            <button class="decrease-qty" data-title="${item.book.title}">-</button>
            <span>${item.quantity}</span>
            <button class="increase-qty" data-title="${item.book.title}">+</button>
          </div>
        </div><hr>
      `
      )
      .join('');

    // Update total amount
    let total = Object.values(cart).reduce(
      (sum, item) => sum + item.quantity * parseFloat(item.book.price),
      0
    );
    totalAmount.innerText = `Total: $${total.toFixed(2)}`;
  }

  // Add book to cart
  function addToCart(book) {
    if (cart[book.title]) {
      cart[book.title].quantity += 1;
    } else {
      cart[book.title] = { book, quantity: 1 };
    }
    updateCart();
  }

  // Handle cart quantity adjustments
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

  // Sort books by title, year, or genre
  function sortBooks(criteria) {
    const sortedBooks = [...books].sort((a, b) => {
      if (criteria === 'title') return a.title.localeCompare(b.title);
      if (criteria === 'year') return a.year - b.year;
      if (criteria === 'genre') return a.genre.localeCompare(b.genre);
      return 0;
    });
    displayBooks(sortedBooks);
  }

  // Filter books by title, genre, or year
  function filterBooks(query) {
    const filteredBooks = books.filter((book) => {
      return (
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.genre.toLowerCase().includes(query.toLowerCase()) ||
        book.year.toString().includes(query)
      );
    });
    displayBooks(filteredBooks);
  }

  // Event Listeners
  searchButton.addEventListener('click', () => {
    filterBooks(searchInput.value);
  });

  sortButton.addEventListener('click', () => {
    sortBooks(sortCriteria.value);
  });

  // Handle adding books to cart
  bookList.addEventListener('click', (event) => {
    if (event.target.classList.contains('buy-button')) {
      const bookTitle = event.target.dataset.title;
      const bookDetails = books.find((b) => b.title === bookTitle);
      if (bookDetails) addToCart(bookDetails);
    }
  });

  // Handle cart quantity changes
  cartList.addEventListener('click', (event) => {
    if (event.target.classList.contains('increase-qty')) {
      const title = event.target.dataset.title;
      updateCartQuantity(title, 1);
    } else if (event.target.classList.contains('decrease-qty')) {
      const title = event.target.dataset.title;
      updateCartQuantity(title, -1);
    }
  });
  function removeFromCart(bookId){
    cart = cart.filter((item) => item.id !== bookId);
    updateCart();

  }

  // Initial fetch
  fetchData();
});
