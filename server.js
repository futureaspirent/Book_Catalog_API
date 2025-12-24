require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler'); 
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);


app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.get("/", (req, res) => {
  res.send("Backend server is running");
});


app.use(errorHandler); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));