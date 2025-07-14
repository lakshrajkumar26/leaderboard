const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
     type : String,
     required :true
    },

    totalPoints : {
      type : Number,
      default: 0  
    }


},{timestamp : true})


const user = mongoose.model("users",userSchema);

module.exports = user;
