const mongoose = require("mongoose");
require("dotenv").config()

const DB = process.env.DB_API_KEY;


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));