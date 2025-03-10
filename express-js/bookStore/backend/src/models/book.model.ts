//model for the users table
export interface User {
    id?: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    created_at?: Date;
}

//model for the books table
export interface Book {
    id?: number;
    title: string;
    author: string;
    genre?: string;
    published_year?: number;
    available?: boolean;
    created_at?: Date;
}

//model for the borrowed_books table
export interface BorrowedBook {
    id?: number;
    user_id: number;
    book_id: number;
    borrowed_date?: Date;
    return_date?: Date;
    returned?: boolean;
}