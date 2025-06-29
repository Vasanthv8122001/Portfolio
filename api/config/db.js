// db.js
const mongoose = require('mongoose');

async function connectDB() {
  try {
    console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

module.exports = connectDB;
