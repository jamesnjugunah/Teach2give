import pool from '../config/db.config';
import express, { Request, Response } from 'express';


//Retreiving all books from the database

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const results = await pool.query("SELECT * FROM books");
        res.status(200).json(results.rows);
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

//Adding book to the cart
export const addBook = async (req:Request, res:Response) => {
    try {
        const { title, price } = req.body;
        const results = await pool.query("INSERT INTO books (title, price) VALUES ($1, $2) RETURNING *", [title, price]);
        res.status(201).json(results.rows);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
 
//Updating book in the cart
export const updateBook = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const { title, price } = req.body;
        const results = await pool.query("UPDATE books SET title = $1, price = $3 WHERE id = $4 RETURNING *", [title, price, id]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Insert to borrowed books
export const borrowBook = async (req:Request, res:Response) => {
    try {
        const { book_id, user_id } = req.body;
        const results = await pool.query("INSERT INTO borrowed_books (book_id, user_id) VALUES ($1, $2) RETURNING *", [book_id, user_id]);
        res.status(201).json(results.rows);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//get all borrowed books
export const getBorrowedBooks = async (req:Request, res:Response) => {
    try {
        const results = await pool.query("SELECT * FROM borrowed_books");
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//returning borrowed books

export const returnBook = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        // Step 1: Update borrowed_books table (mark as returned)
        const updateBorrowedBook = await pool.query(
            "UPDATE borrowed_books SET returned = true WHERE id = $1 RETURNING *",
            [user_id]
        );

        // Check if the book was found
        if (updateBorrowedBook.rowCount === 0) {
            res.status(404).json({ message: "Borrowed book not found" });
            return;
        }

        const borrowedBook = updateBorrowedBook.rows[0];

       

        res.status(200).json({ message: "Book returned successfully", book: borrowedBook });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};



