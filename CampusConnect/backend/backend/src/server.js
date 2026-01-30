// src/server.js
import 'dotenv/config';
import connectDB from './config/db.js';   // your DB connection file
import app from './app.js';               // ← must import the exported app

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });