import pool from '../config/db.config';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';


//Register a user
export const registerUser = async (req: Request, res:Response) => {
    try {
        const {name, email, phone, password} = req.body;
        console.log("Received Data:", req.body)
        const hashedPassword = await bcrypt.hash(password, 10);
        const checkEmail = await pool.query("SELECT * FROM users WHERE email =$1", [email]);
        if(checkEmail.rows.length > 0){
            res.status(201).json({message:"user already exists"})
            return;

        }
        const results = await pool.query("INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4)  RETURNING *", [name, email, phone, hashedPassword])
        res.status(201).json({ message: "User registered successfully", user: results.rows[0] });
        
        
    } catch (error) {
        res.status(500).json({message: "internal server error"})
        
    }
}

// login user

export const loginUser = async (req:Request, res:Response) => {
    try {
        const {email, password} = req.body
        const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if(checkUser.rows.length === 0 ){
            res.status(201).json({message: "user not available please register"})
            return;
        }
        const validPassword = await bcrypt.compare(password, checkUser.rows[0].password);
        if(!validPassword){
            res.status(401).json({message: "Invalid email or password"})
            return;
        }
        res.status(200).json({message: "login successful", user: checkUser.rows[0]})
        
    } catch (error) {
        res.status(500).json({message: "internal server error"})
        
    }
}



