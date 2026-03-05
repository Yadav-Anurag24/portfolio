// In production, use the deployed backend URL.
// In development, Vite's proxy forwards /api to localhost:5000.
export const API_BASE = import.meta.env.PROD
  ? 'https://portfolio-backend-rvav.onrender.com'
  : '';
