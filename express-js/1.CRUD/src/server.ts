import express, {  Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db/db.config';

dotenv.config();

const app = express();
const PORT = process.env.PORT; // Set a default port

console.log(`Starting server on PORT: ${PORT}`);

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*",  // Allow all origins, change to specific URL if needed
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));

//API Route to post data in the database
app.post('/api/v1/users', async (req: Request, res: Response) => {
    try {
        const { name, email, phone } = req.body;

        // Check if user exists
        const emailCheck = await pool.query("SELECT user_id FROM users WHERE email = $1", [email]);
        if (emailCheck.rows.length > 0) {
           res.status(400).json({ message: "User already exists" });
            return
        }

        // Insert user into DB
        const userResult = await pool.query(
            "INSERT INTO users(name, email, phone) VALUES($1, $2, $3) RETURNING *",
            [name, email, phone]
        );

        res.status(201).json({
            message: "User created successfully",
            user: userResult.rows[0]
        });

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Get api to retreive data from the databases
app.get('/api/v1/users', async (req: Request, res:Response) => {
try{
    const results = await pool.query("SELECT * FROM users ORDER BY user_id ASC")
    res.status(200).json(results.rows)

}catch (error){
    res.status(500).json({ message: "Internal server error" });

}

});
app.put('/api/v1/users/:user_id', async (req:Request, res:Response) => {
    try {
        const {user_id} = req.params
        const {name, email, phone} = req.body

        const checkUser = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id])
        if(checkUser.rows.length === 0){
            res.status(404).json({
                message: "user does not exist"
            })
            return
        }
        const results = await pool.query("UPDATE users SET name=$1, email=$2, phone=$3 WHERE user_id=$4 RETURNING *", [name, email, phone, user_id])
        res.json({ message: "User updated", user: results.rows[0] });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
        
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
