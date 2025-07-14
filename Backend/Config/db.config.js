const mongoose = require("mongoose");
require("dotenv").config();  //always first
const URL = process.env.MONGO_URL; 
 
mongoose.connect(URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("connected" , ()=>{
    console.log("db connected successfull");
})
db.on("disconnected" , ()=>{
    console.log("db disconnected successfull");
})
db.on("error" , (err)=>{
    console.log("db error occurred",err);
})

module.exports = db;