
// const express = require('express');
// const cors = require('cors');
// const { connectDB } = require("./config/db");
// require('dotenv').config();
// const { bookRouter } = require('../routes/bookRoutes');

// const app = express();


// app.use(cors());
// app.use(express.json()); 

// connectDB();

// app.use("/api/books", bookRouter);

// module.exports = app;

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");
const { bookRouter } = require("../routes/bookRoutes"); // make sure path is correct!

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/books", bookRouter);

module.exports = app;
