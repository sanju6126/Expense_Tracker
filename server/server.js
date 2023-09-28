const express = require('express');
const app = express();
const cors = require('cors');


require('dotenv').config({path:"./config.env"})
const port = process.env.PORT || 5000;

//use Middleware
app.use(cors());
app.use(express.json());

// mongo connection
const con = require('./database/connection.js');

// using routes
app.use(require('./routes/route'));


con.then(db=>{
    if(!db) return process.exit(1);

    app.listen(port,() => {
        console.log(`server is running at ${port}`);
    })

    app.on('error',err => console.log("failed to listen"))
}).catch(error => {
    console.log("connection failed")
})


