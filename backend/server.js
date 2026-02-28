

const express = require('express');
const cors = require('cors');
require("dotenv").config();
const connectDB = require('./config/database');
const urlRoutes = require('./routes/urlsRoutes');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/", urlRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));