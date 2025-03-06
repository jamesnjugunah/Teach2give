import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: 'GET, PUT, DELETE',
    })
);

// Get the current directory
// const _dirname = path.resolve();

// Read the JSON file
type Event = { 
    id: number;
    title: string; 
    author?: string; 
    genre: string; 
    year: number; 
    pages?: number; 
    publisher?: string;
    description?: string;
    image?: string;
    price?: number;
};

let eventData: Event[] = [];

try {
    const rawData = readFileSync(path.join(__dirname, 'db', 'events.json'), 'utf-8');
    eventData = JSON.parse(rawData) as Event[];
    console.log("Data loaded successfully:", eventData);
} catch (error) {
    console.error("Error parsing JSON:", error);
}


app.get('/api/events', (req, res) => {
    try {
        const { title, genre, year, pages, sort } = req.query;

        let filteredEvents = [...eventData];

        // Filtering logic
        if (title) {
            filteredEvents = filteredEvents.filter(event =>
                event.title.toLowerCase().includes((title as string).toLowerCase())
            );
        }

        if (genre) {
            filteredEvents = filteredEvents.filter(event =>
                event.genre.toLowerCase().includes((genre as string).toLowerCase())
            );
        }

        if (year) {
            const yearNum = parseInt(year as string, 10);
            if (!isNaN(yearNum)) {
                filteredEvents = filteredEvents.filter(event => event.year === yearNum);
            }
        }

        if (pages) {
            const pagesNum = parseInt(pages as string, 10);
            if (!isNaN(pagesNum)) {
                filteredEvents = filteredEvents.filter(event => event.pages === pagesNum);
            }
        }

        // Sorting logic
        if (sort) {
            filteredEvents.sort((a, b) => {
                if (sort === 'title') return a.title.localeCompare(b.title);
                if (sort === 'genre') return a.genre.localeCompare(b.genre);
                if (sort === 'year') return a.year - b.year;
                if (sort === 'pages') return (a.pages ?? 0) - (b.pages ?? 0);
                return 0;
            });
        }

        res.json(filteredEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
