import axios from 'axios';

// Base API URL
const API_URL = 'http://localhost:5000';  // Change this if your backend is hosted online

// Axios instance for cleaner code
const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true  // Important if your backend requires authentication cookies
});

// 🚀 AUTHENTICATION FUNCTIONS
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/api/v1/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error.response?.data || error.message);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/api/v1/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        throw error;
    }
};

// 📚 BOOK MANAGEMENT FUNCTIONS
export const getAllBooks = async () => {
    try {
        const response = await api.get('/api/v1/books/getBooks');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error.response?.data || error.message);
        throw error;
    }
};

export const addBook = async (bookData) => {
    try {
        const response = await api.post('/api/v1/books/addBooks', bookData);
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error.response?.data || error.message);
        throw error;
    }
};

export const updateBook = async (bookId, updatedData) => {
    try {
        const response = await api.put(`/api/v1/books/${bookId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error.response?.data || error.message);
        throw error;
    }
};

export const borrowBook = async (bookId, userId) => {
    try {
        const response = await api.post('/api/v1/books/borrow', { bookId, userId });
        return response.data;
    } catch (error) {
        console.error('Error borrowing book:', error.response?.data || error.message);
        throw error;
    }
};

export const getBorrowedBooks = async () => {
    try {
        const response = await api.get('/api/v1/books/borrowedBook');
        return response.data;
    } catch (error) {
        console.error('Error fetching borrowed books:', error.response?.data || error.message);
        throw error;
    }
};

export const returnBook = async (bookId, user_Id) => {
    try {
        const response = await api.put(`/api/v1/books/return/${bookId}`, { user_Id });
        return response.data;
    } catch (error) {
        console.error('Error returning book:', error.response?.data || error.message);
        throw error;
    }
};
