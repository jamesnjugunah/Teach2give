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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = __importDefault(require("./db/db.config"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
console.log(PORT);
//this will enable to stringify to json
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "",
    methods: "Get, Put, Post, Delete",
    credentials: true
}));
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.post('api/v1/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone } = req.body;
        const emailCheck = yield db_config_1.default.query("SELECT user_id FROM users WHERE email = $1", [email]);
        if (emailCheck.rows.length > 0) {
            res.status(400).json({
                message: "User already exists"
            });
            return;
        }
        else {
            const userResult = yield db_config_1.default.query("INSERT INTO users(name, email, phone) VALUES($1,$2,$3) RETURNING *", [name, email, phone]);
            res.status(201).json({
                message: "User created successfully",
                user: userResult.rows[0]
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
