const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db'); // Import the DB logic

// 1. Load Environment Variables
// We force it to look in the current folder
dotenv.config(); 

console.log("-----------------------------------");
console.log("1. Server Starting...");
console.log("2. Checking Mongo URI:", process.env.MONGO_URI ? "FOUND ✅" : "MISSING (using static data) ⚠️");

// 2. Connect to Database (gracefully falls back to static data if unavailable)
connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Security Middleware ─────────────────────────────────────

// Helmet — sets secure HTTP headers (XSS protection, no sniff, HSTS, etc.)
app.use(helmet());

// CORS — restrict to actual frontend origins in production
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://localhost:4173']; // Vite dev + preview
app.use(cors({
  origin(origin, callback) {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Body parsers with size limits
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: false, limit: '16kb' }));

// ─── Rate Limiting ───────────────────────────────────────────

// Global rate limit — generous for portfolio browsing
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,                  // 200 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use(globalLimiter);

// Strict rate limit for contact form — prevent spam
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,                    // 5 submissions per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many contact submissions. Please try again in an hour.' },
});

// ─── Routes ──────────────────────────────────────────────────

app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', contactLimiter, require('./routes/contactRoutes'));
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