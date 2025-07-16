const mongoose = require("mongoose");

const ClaimHistorySchema = new mongoose.Schema({
     
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "users",
        required :true
    },
    userName : {
        type : String,
        required : true,
    },
    pointsClaimed : {
        type : Number,
        required:true,
        min : 1,
        max :10,
    },
    totalPoints: {
    type: Number, 
    required: true,
    }
},{timestamps:true})

const claimHistory = mongoose.model("claimHistories",ClaimHistorySchema);
module.exports = claimHistory;