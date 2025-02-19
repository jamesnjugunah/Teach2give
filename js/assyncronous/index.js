// script.js
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const sortCriteria = document.getElementById('sortCriteria');
  const sortButton = document.getElementById('sortButton');
  const bookList = document.getElementById('bookList');

  let books = [];

  // Fetch data from the server
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000/Library');
      books = await response.json();
      displayBooks(books);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Display books in the UI
  function displayBooks(books) {
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
          </div>
        </div>
      `
      )
      .join('');
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

  // Initial data fetch
  fetchData();
});