const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.warn('[database] MONGO_URI not set — running with static data fallback.');
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log(`[database] MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[database] Error: ${error.message}`);
        console.warn('[database] Falling back to static data.');
    }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };