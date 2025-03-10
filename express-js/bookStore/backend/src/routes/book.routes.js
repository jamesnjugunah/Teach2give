"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
const book_controller_2 = require("../controllers/book.controller");
const book_controller_3 = require("../controllers/book.controller");
const book_controller_4 = require("../controllers/book.controller");
const book_controller_5 = require("../controllers/book.controller");
const book_controller_6 = require("../controllers/book.controller");
const router = (0, express_1.Router)();
router.get('/getBooks', book_controller_2.getAllBooks);
router.post('/addBooks', book_controller_1.addBook);
router.put('/updateBook:id', book_controller_3.updateBook);
router.post('/borrow', book_controller_4.borrowBook);
router.get('/borrowedBook', book_controller_5.getBorrowedBooks);
router.put('/return/:id', book_controller_6.returnBook);
exports.default = router;
