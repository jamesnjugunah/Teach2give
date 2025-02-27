type Book = {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: string;
    pages: string;
    publisher: string;
    description: string;
    image: string;
    price: number;
  };
  
  type CartItem = {
    book: Book;
    quantity: number;
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
    const searchButton = document.getElementById("searchButton") as HTMLButtonElement;
    const sortCriteria = document.getElementById("sortCriteria") as HTMLSelectElement;
    const sortButton = document.getElementById("sortButton") as HTMLButtonElement;
    const bookList = document.getElementById("bookList");
    const cartList = document.getElementById("cartList");
    const totalAmount = document.getElementById("totalAmount");
  
    let books: Book[] = [];
    let cart: Record<string, CartItem> = {};
  
    // Fetch books from JSON Server
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/Library");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
        books = await response.json();
        console.log("Fetched books:", books);
        displayBooks(books);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    // Display books
    function displayBooks(books: Book[]) {
      if (!bookList) return;
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
              <p><strong>Price:</strong> $${parseFloat(book.price.toString()).toFixed(2)}</p>
              <button class="buy-button" data-title="${book.title}">Add to Cart</button>
            </div>
          </div>
        `
        )
        .join("");
    }
  
    // Search books
    function searchBooks() {
      const query = searchInput.value.toLowerCase();
      console.log("Search Query:", query); // Debugging
  
      const filteredBooks = books.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query)
      );
  
      displayBooks(filteredBooks);
    }
  
    // Sort books
    function sortBooks() {
      const criteria = sortCriteria.value;
      console.log("Sorting by:", criteria); // Debugging
  
      let sortedBooks = [...books];
  
      switch (criteria) {
        case "title":
          sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "author":
          sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
          break;
        case "price":
          sortedBooks.sort((a, b) => a.price - b.price);
          break;
        case "year":
          sortedBooks.sort((a, b) => parseInt(a.year) - parseInt(b.year));
          break;
        default:
          console.warn("Unknown sort criteria:", criteria);
      }
  
      displayBooks(sortedBooks);
    }
  
    // Update Cart UI
    function updateCart() {
      if (!cartList || !totalAmount) return;
  
      cartList.innerHTML = Object.values(cart)
        .map(
          (item) => `
          <div class="cart-item">
            <span class="remove-item" data-id="${item.book.id}">&times;</span>
            <p><strong>${item.book.title}</strong> - $${parseFloat(item.book.price.toString()).toFixed(2)}</p>
            <div class="cart-controls">
              <button class="decrease-qty" data-title="${item.book.title}">-</button>
              <span>${item.quantity}</span>
              <button class="increase-qty" data-title="${item.book.title}">+</button>
            </div>
          </div><hr>
        `
        )
        .join("");
  
      let total = Object.values(cart).reduce(
        (sum, item) => sum + item.quantity * parseFloat(item.book.price.toString()),
        0
      );
      totalAmount.innerText = `Total: $${total.toFixed(2)}`;
    }
  
    // Add to cart
    function addToCart(book: Book) {
      if (cart[book.title]) {
        cart[book.title].quantity += 1;
      } else {
        cart[book.title] = { book, quantity: 1 };
      }
      updateCart();
    }
  
    // Update cart quantity
    function updateCartQuantity(title: string, change: number) {
      if (cart[title]) {
        cart[title].quantity += change;
        if (cart[title].quantity <= 0) delete cart[title];
      }
      updateCart();
    }
  
    // Remove from cart
    function removeFromCart(bookId: number) {
      for (const key in cart) {
        if (cart[key].book.id === bookId) {
          delete cart[key];
          break;
        }
      }
      updateCart();
    }
  
    // Event Listeners
    searchButton.addEventListener("click", searchBooks);
    sortButton.addEventListener("click", sortBooks);
  
    // Fetch books on load
    fetchData();
  });
  