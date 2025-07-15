const claimHistory = require("./../models/ClaimHistoryModel");
const users =require("./../models/UserModel");
const { getIo } = require("../Config/socketIo.config");

const claimPoints = async (req,res) => {
      try{
        const {userId} = req.params;   // takeout userId from params

        const user = await users.findById(userId);   //instance created   
         if(!user) return res.status(404).json({message : "Username required"});   //if user not found

         //to genberate random number
         const randomPoints = Math.floor(Math.random()*10)+1;

         user.totalPoints = user.totalPoints + randomPoints;
         await user.save();             //save on the instance because cant on class like here its users
      //till now a>search userId b>called user c>gen random 1-10 d>added into user's totalPoints e>save the instance f>now create entry
        await claimHistory.create({
            userId: user._id,
            userName :user.name,
            totalPoints: user.totalPoints,
            pointsClaimed : randomPoints
        })
      //  Fetch updated leaderboard & emit real-time update
    const leaderboard = await users.find().sort({ totalPoints: -1 });
    const rankedUsers = leaderboard.map((u, index) => ({
      rank: index + 1,
      _id: u._id,
      name: u.name,
      totalPoints: u.totalPoints,
    }));

    const io = getIo(); // Get the socket.io instance
    io.emit("leaderboardUpdate", rankedUsers); //  broadcast to all clients

    //  Return success response
    res.status(200).json({
      message: "Points claimed successfully",
      user: {
        _id: user.id,
        username: user.username,
        totalPoints: user.totalPoints,
      },
      pointsClaimed: randomPoints,
    });
    //   res.status(200).json({message : "Points claimed Successfully",user : {_id :user.id,username :user.username,totalPoints :user.totalPoints}, pointsClaimed :randomPoints});          
        }                                     

      catch(err){
        console.log("error in claimed",err);
        res.status(500).json({message : "server error",err})
      }
}
//check history 
// GET http://localhost:3000/api/claim/history/:userId
const getClaimHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await claimHistory
      .find({ userId })
      .sort({ createdAt: -1 }); // most recent first 

    res.status(200).json({ history });
  } catch (err) {
    console.error("Error fetching claim history:", err);
    res.status(500).json({ message: "Server error", err });
  }
};

module.exports = { claimPoints, getClaimHistory };