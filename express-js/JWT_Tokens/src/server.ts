import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// User Interface
interface User {
  username: string;
  password: string;
}

// JWT Payload Interface
interface JwtPayload {
  username: string;
}

// Store users (use a real database in production)
const users: User[] = [];

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Register Route
app.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Check if user exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {res.status(400).json({ message: "User already exists" });
    return;}


  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.json({ message: "User registered successfully!" });
});

// ✅ Login Route
app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Invalid username or password" });
    return;
  }

  // Generate JWT Token
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// ✅ Verify Token Middleware
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {res.status(403).json({ message: "Access denied, no token provided" });
    return;}

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    (req as any).user = decoded; // Attach decoded user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Protected Route
app.get("/protected", verifyToken, (req: Request, res: Response) => {
  res.json({ message: `Welcome, ${(req as any).user.username}! This is a protected route.` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
