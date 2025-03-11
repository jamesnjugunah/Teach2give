import axios, { AxiosError } from 'axios';

// Define types
interface UserData {
  username?: string;
  email: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface BookData {
  title: string;
  author: string;
  isbn?: string;
  genre?: string;
  quantity?: number;
}

// Base API URL
const API_URL = 'http://localhost:5000';  // Change this if your backend is hosted online

// Axios instance for cleaner code
const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true  // Important if your backend requires authentication cookies
});

// 🚀 AUTHENTICATION FUNCTIONS
export const registerUser = async (userData: UserData) => {
    try {
        const response = await api.post('/api/v1/auth/register', userData);
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error('Error registering user:', axiosError.response?.data || axiosError.message);
        throw error;
    }
};

export const loginUser = async (credentials: Credentials) => {
    try {
        const response = await api.post('/api/v1/auth/login', credentials);
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error('Error logging in:', axiosError.response?.data || axiosError.message);
        throw error;
    }
};

// 📚 BOOK MANAGEMENT FUNCTIONS
export const getAllBooks = async () => {
    try {
        const response = await api.get('/api/v1/books/getBooks');
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error('Error fetching books:', axiosError.response?.data || axiosError.message);
        throw error;
    }
};

export const addBook = async (bookData: BookData) => {
    try {
        const response = await api.post('/api/v1/books/addBooks', bookData);
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error('Error adding book:', axiosError.response?.data || axiosError.message);
        throw error;
    }
};

export const updateBook = async (bookId: string | number, updatedData: Partial<BookData>) => {
    try {
        const response = await api.put(`/api/v1/books/${bookId}`, updatedData);
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error('Error updating book:', axiosError.response?.data || axiosError.message);
        throw error;
    }
};

export const borrowBook = async (bookId: string | number, userId: string | number) => {
    try {
        const response = await api.post('/api/v1/books/borrow', { bookId, userId });
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error('Error borrowing book:', axiosError.response?.data || axiosError.message);
        throw error;
    }
};

export const getBorrowedBooks = async () => {
    try {
        const response = await api.get('/api/v1/books/borrowedBook');
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error('Error fetching borrowed books:', axiosError.response?.data || axiosError.message);
        throw error;
    }
};

export const returnBook = async (bookId: string | number, user_Id: string | number) => {
    try {
        const response = await api.put(`/api/v1/books/return/${bookId}`, { user_Id });
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error('Error returning book:', axiosError.response?.data || axiosError.message);
        throw error;
    }
};