const mongoose = require("mongoose");

const ClaimHistorySchema = new mongoose.Schema({
     
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "users",
        required :true
    },
    userName : {
        type : String,
        require : true,
    },
    pointsClaimed : {
        type : Number,
        required:true,
        min : 1,
        max :10,
    }

},{timestamps:true})

const claimHistory = mongoose.model("claimHistorys",ClaimHistorySchema);
module.exports = claimHistory;