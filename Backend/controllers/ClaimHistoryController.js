const claimHistory = require("./../models/ClaimHistoryModel");
const users =require("./../models/UserModel");


const claimPoints = async (req,res) => {
      try{
        const {userId} = req.params;   // takeout userId from params

        const user = await users.findById(userId);   //instance created   
         if(!user) return res.status(404).json({message : "User not found"});   //if user not found

         //to genberate random number
         const randomPoints = Math.floor(Math.random()*10)+1;

         user.totalPoints = user.totalPoints + randomPoints;
         await user.save();             //save on the instance because cant on class like here its users
      //till now a>search userId b>called user c>gen random 1-10 d>added into user's totalPoints e>save the instance f>now create entry
        await claimHistory.create({
            userId: user._id,
            pointsClaimed : randomPoints
        })
      
      res.status(200).json({message : "Points claimed Successfully",user : {_id :user.id,username :user.username,totalPoints :user.totalPoints}, pointsClaimed :randomPoints});          
        }                                     

      catch(err){
        console.log("error in claimed",err);
        res.status(500).json({message : "server error",err})
      }
}

module.exports = {claimPoints};