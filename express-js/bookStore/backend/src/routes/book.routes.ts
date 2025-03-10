import { Router } from 'express';
import { addBook } from '../controllers/book.controller';
import { getAllBooks } from '../controllers/book.controller';
import { updateBook } from '../controllers/book.controller';
import { borrowBook } from '../controllers/book.controller';
import { getBorrowedBooks } from '../controllers/book.controller';
import { returnBook } from '../controllers/book.controller';

const router = Router();


router.get('/getBooks', getAllBooks);
router.post('/addBooks', addBook);
router.put('/updateBook:id', updateBook);
router.post('/borrow', borrowBook);
router.get('/borrowedBook', getBorrowedBooks);
router.put('/return/:id', returnBook);

export default router;

