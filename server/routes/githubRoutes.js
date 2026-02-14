const express = require('express');
const router = express.Router();

const GITHUB_USERNAME = 'Yadav-Anurag24';
const EVENTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`;

// In-memory cache
let cachedData = null;
let cachedAt = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

router.get('/events', async (req, res) => {
    const now = Date.now();

    // Serve from cache if still fresh
    if (cachedData && (now - cachedAt) < CACHE_TTL) {
        return res.json({ source: 'cache', data: cachedData });
    }

    try {
        const response = await fetch(EVENTS_URL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'anurag-portfolio-server',
                // If a PAT is set, use it for 5000 req/hr instead of 60
                ...(process.env.GITHUB_TOKEN
                    ? { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` }
                    : {}),
            },
        });

        if (!response.ok) {
            // If rate-limited but we have stale cache, serve it
            if (cachedData) {
                return res.json({ source: 'stale-cache', data: cachedData });
            }
            return res.status(response.status).json({
                error: `GitHub API returned ${response.status}`,
                remaining: response.headers.get('x-ratelimit-remaining'),
                resetAt: response.headers.get('x-ratelimit-reset'),
            });
        }

        const data = await response.json();
        cachedData = data;
        cachedAt = now;

        res.json({ source: 'live', data });
    } catch (err) {
        // Network error — serve stale cache if available
        if (cachedData) {
            return res.json({ source: 'stale-cache', data: cachedData });
        }
        res.status(502).json({ error: 'Failed to reach GitHub API' });
    }
});

module.exports = router;
