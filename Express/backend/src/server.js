"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: 'GET, PUT, DELETE',
}));
let eventData = [];
try {
    const rawData = (0, fs_1.readFileSync)(path_1.default.join(__dirname, 'db', 'events.json'), 'utf-8');
    eventData = JSON.parse(rawData);
    console.log("Data loaded successfully:", eventData);
}
catch (error) {
    console.error("Error parsing JSON:", error);
}
app.get('/api/events', (req, res) => {
    try {
        const { title, genre, year, pages, sort } = req.query;
        let filteredEvents = [...eventData];
        // Filtering logic
        if (title) {
            filteredEvents = filteredEvents.filter(event => event.title.toLowerCase().includes(title.toLowerCase()));
        }
        if (genre) {
            filteredEvents = filteredEvents.filter(event => event.genre.toLowerCase().includes(genre.toLowerCase()));
        }
        if (year) {
            const yearNum = parseInt(year, 10);
            if (!isNaN(yearNum)) {
                filteredEvents = filteredEvents.filter(event => event.year === yearNum);
            }
        }
        if (pages) {
            const pagesNum = parseInt(pages, 10);
            if (!isNaN(pagesNum)) {
                filteredEvents = filteredEvents.filter(event => event.pages === pagesNum);
            }
        }
        // Sorting logic
        if (sort) {
            filteredEvents.sort((a, b) => {
                var _a, _b;
                if (sort === 'title')
                    return a.title.localeCompare(b.title);
                if (sort === 'genre')
                    return a.genre.localeCompare(b.genre);
                if (sort === 'year')
                    return a.year - b.year;
                if (sort === 'pages')
                    return ((_a = a.pages) !== null && _a !== void 0 ? _a : 0) - ((_b = b.pages) !== null && _b !== void 0 ? _b : 0);
                return 0;
            });
        }
        res.json(filteredEvents);
    }
    catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
