import express from 'express';
import taskRoutes from './route/taskRouters.js';
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import {connectDB} from './config/db.js'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5001; // Use the PORT from environment variables or default to 5001

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/api/tasks", taskRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

