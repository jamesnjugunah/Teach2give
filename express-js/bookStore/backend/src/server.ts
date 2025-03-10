import express, {  Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT; // Set a default port

console.log(`Starting server on PORT: ${PORT}`);

// Middleware

app.use(cors({
    origin: "*",  // Allow all origins, change to specific URL if needed
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/books', bookRoutes);

console.log("Loading routes...");
console.log("User Routes Loaded:", !!userRoutes);
console.log("Book Routes Loaded:", !!bookRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
