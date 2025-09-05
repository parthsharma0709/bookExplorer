
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{console.log("mongodb connected")})
.catch((e)=>console.error("database connection error" , e));


app.get('/', (req, res) => {
  res.send('Hello from Express App 🚀');
});



module.exports = app;
