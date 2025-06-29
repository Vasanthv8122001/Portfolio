const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/index');
const connectDB = require('./config/db');
dotenv.config();

// connectDB();
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));
app.use(express.text());
app.use(express.json({ limit: '50mb' }));

app.use('/api', router)

app.get('/status', (req, res) => {
  res.json({ status: 'API is running' });
});

app.listen(3001, () => {
  console.log('API server is running on port 3001');
});