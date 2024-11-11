require('dotenv').config()  // load environment variables from .env file     
const express = require('express');  
const app = express();   

const cors = require('cors');    

app.use(cors());     
app.use (express.json());    

const PORT = process.env.PORT || 5000;   
 
const db = require('./db');  
const userRoutes = require('./Route/index');  

app.use('/', userRoutes);  

app.get ('/' , function (req,res) {

    res.send ("Congrats YUG , Siddharth and Krish Great Work")

})



app.listen (PORT, () => {console.log (`Server is running on port ${PORT}`);});   
