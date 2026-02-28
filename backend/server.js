// const express = require('express');
// const connectDB = require('./config/database');
// const urlRoutes = require('./routes/urlsRoutes');


// const app = express();

// //now we need to connect to the database
// connectDB();

// //this is a part where middleware is used to parse the incoming request body as JSON
// app.use(express.json());

// //this is the part where we define the routes for our application
// app.use("/", urlRoutes);

// //this is the part where we start the server and listen on a specific port
// const PORT = 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });











// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/database');
// const urlRoutes = require('./routes/urlsRoutes');

// const app = express();
// connectDB();
// app.use(cors());
// app.use(express.json());
// app.use("/", urlRoutes);

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








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