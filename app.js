

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
var cors = require('cors') 
const path = require('path');
const { fileURLToPath } = require('url');

const __dir = path.dirname(__filename);
console.log(__dir);
app.use(cors()) 

app.use('/images',express.static('images'));

dotenv.config({path:'./config.env'});

require('./db/connection');

app.use(express.json());
app.use(express.static(path.resolve(__dir, "./client/build")));
app.use(require('./router/auth'));
app.use(require('./router/event'));
app.use(require('./router/admin'));
app.use(require('./router/email')); 
app.use(require('./router/events3'));
app.use(cookieParser());

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dir, "./client/build", "index.html"));
});

const PORT = process.env.PORT; 


app.listen(PORT, ()=>{
    console.log(`server is runging on port no. ${PORT}`)
}); 