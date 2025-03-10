"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT; // Set a default port
console.log(`Starting server on PORT: ${PORT}`);
// Middleware
app.use((0, cors_1.default)({
    origin: "*", // Allow all origins, change to specific URL if needed
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/books', book_routes_1.default);
console.log("Loading routes...");
console.log("User Routes Loaded:", !!auth_routes_1.default);
console.log("Book Routes Loaded:", !!book_routes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
