require('dotenv').config(); // Load .env at the top
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRoutes = require('./routes/productsRoutes');
const auth = require('./middleware/auth');

const { MONGO_URI, PORT = 3000 } = process.env;

const app = express();
app.use(cors());
app.use(express.json());

// Logger middleware.
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/products', auth, productsRoutes); // Protect /products routes with auth

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  // Global error handling middleware (add this before app.listen)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.name || 'InternalServerError',
    message: err.message || 'Something went wrong!',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});