const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('❌ MONGODB_URI environment variable is not set.');
        process.exit(1);
    }

    try {
        // Atlas connection — no custom TLS options needed.
        // The connection string from Atlas already includes the correct settings.
        const conn = await mongoose.connect(uri);

        console.log(`✅ Connected to MongoDB Atlas: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB Atlas connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
