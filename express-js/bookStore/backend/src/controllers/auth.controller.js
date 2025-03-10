"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//Register a user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password } = req.body;
        console.log("Received Data:", req.body);
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const checkEmail = yield db_config_1.default.query("SELECT * FROM users WHERE email =$1", [email]);
        if (checkEmail.rows.length > 0) {
            res.status(201).json({ message: "user already exists" });
            return;
        }
        const results = yield db_config_1.default.query("INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4)  RETURNING *", [name, email, phone, hashedPassword]);
        res.status(201).json({ message: "User registered successfully", user: results.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.registerUser = registerUser;
// login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const checkUser = yield db_config_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
        if (checkUser.rows.length === 0) {
            res.status(201).json({ message: "user not available please register" });
            return;
        }
        const validPassword = yield bcrypt_1.default.compare(password, checkUser.rows[0].password);
        if (!validPassword) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        res.status(200).json({ message: "login successful", user: checkUser.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
    }
});
exports.loginUser = loginUser;
