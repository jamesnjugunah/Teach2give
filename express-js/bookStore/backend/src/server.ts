import express, {  Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT; // Set a default port

console.log(`Starting server on PORT: ${PORT}`);

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:5500/bookStore/frontend/index.html",  // Allow all origins, change to specific URL if needed
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
