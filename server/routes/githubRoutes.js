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

// ─── /api/github/commits ──────────────────────────────────────────
// Fetches recent commits directly from the user's repos.
// Used as a fallback when the Events API has no PushEvents.

const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`;

let cachedCommits = null;
let commitsCachedAt = 0;
const COMMITS_CACHE_TTL = 15 * 60 * 1000; // 15 minutes

const ghHeaders = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'anurag-portfolio-server',
};

function getAuthHeaders() {
    return process.env.GITHUB_TOKEN
        ? { ...ghHeaders, 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` }
        : ghHeaders;
}

router.get('/commits', async (req, res) => {
    const now = Date.now();

    // Serve from cache if fresh
    if (cachedCommits && (now - commitsCachedAt) < COMMITS_CACHE_TTL) {
        return res.json({ source: 'cache', data: cachedCommits });
    }

    try {
        // 1. Get user's most recently-pushed repos
        const reposRes = await fetch(REPOS_URL, { headers: getAuthHeaders() });
        if (!reposRes.ok) {
            if (cachedCommits) return res.json({ source: 'stale-cache', data: cachedCommits });
            return res.status(reposRes.status).json({ error: `GitHub repos API returned ${reposRes.status}` });
        }
        const repos = await reposRes.json();

        // 2. Fetch last 3 commits from each repo (in parallel)
        const commitPromises = repos.slice(0, 6).map(async (repo) => {
            try {
                const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=3`;
                const cRes = await fetch(url, { headers: getAuthHeaders() });
                if (!cRes.ok) return [];
                const commits = await cRes.json();
                return commits.map((c) => ({
                    sha: c.sha,
                    message: c.commit?.message?.split('\n')[0] || '',
                    author: c.commit?.author?.name || GITHUB_USERNAME,
                    date: c.commit?.author?.date || c.commit?.committer?.date || '',
                    repo: repo.name,
                    html_url: c.html_url,
                }));
            } catch {
                return [];
            }
        });

        const allCommits = (await Promise.all(commitPromises))
            .flat()
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 20); // Top 20 most recent

        cachedCommits = allCommits;
        commitsCachedAt = now;
        res.json({ source: 'live', data: allCommits });
    } catch (err) {
        if (cachedCommits) return res.json({ source: 'stale-cache', data: cachedCommits });
        res.status(502).json({ error: 'Failed to fetch commits' });
    }
});
