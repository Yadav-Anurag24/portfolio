const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the DB logic

// 1. Load Environment Variables
// We force it to look in the current folder
dotenv.config(); 

console.log("-----------------------------------");
console.log("1. Server Starting...");
console.log("2. Checking Mongo URI:", process.env.MONGO_URI ? "FOUND ✅" : "MISSING ❌");

// 2. Connect to Database (This was likely missing or failing silently)
connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/github', require('./routes/githubRoutes'));

// Health Check
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`3. Server running on port ${PORT}`);
    console.log("-----------------------------------");
});