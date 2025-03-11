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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.getBorrowedBooks = exports.borrowBook = exports.updateBook = exports.addBook = exports.getAllBooks = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
//Retreiving all books from the database
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_config_1.default.query("SELECT * FROM books");
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllBooks = getAllBooks;
//Adding book to the cart
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price } = req.body;
        const results = yield db_config_1.default.query("INSERT INTO books (title, price) VALUES ($1, $2) RETURNING *", [title, price]);
        res.status(201).json(results.rows);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.addBook = addBook;
//Updating book in the cart
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, price } = req.body;
        const results = yield db_config_1.default.query("UPDATE books SET title = $1, price = $3 WHERE id = $4 RETURNING *", [title, price, id]);
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateBook = updateBook;
//Insert to borrowed books
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book_id, user_id } = req.body;
        const results = yield db_config_1.default.query("INSERT INTO borrowed_books (book_id, user_id) VALUES ($1, $2) RETURNING *", [book_id, user_id]);
        res.status(201).json(results.rows);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.borrowBook = borrowBook;
//get all borrowed books
const getBorrowedBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_config_1.default.query("SELECT * FROM borrowed_books");
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getBorrowedBooks = getBorrowedBooks;
//returning borrowed books
const returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        // Step 1: Update borrowed_books table (mark as returned)
        const updateBorrowedBook = yield db_config_1.default.query("UPDATE borrowed_books SET returned = true WHERE id = $1 RETURNING *", [user_id]);
        // Check if the book was found
        if (updateBorrowedBook.rowCount === 0) {
            res.status(404).json({ message: "Borrowed book not found" });
            return;
        }
        const borrowedBook = updateBorrowedBook.rows[0];
        res.status(200).json({ message: "Book returned successfully", book: borrowedBook });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.returnBook = returnBook;
