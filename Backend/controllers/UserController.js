const Users = require("../models/UserModel");

 //Register 
const createUser = async(req,res)=>{
     const data = req.body;    
    try{
        if(!data.name) { return res.status(400).json({message:"user not found"})};
          const newUser = await Users.create({
            name : data.name,
            totalPoints :data.totalPoints
          })
           res.status(201).json({message:"user created successfully",newUser}); 
        }
        catch (err){
            console.log(err);
            res.status(500).json({message:"error occurred",err});
        }
}
//getting all Users
const getAllUsers = async (req,res) => {
     
    try{
        const Allusers = await Users.find();
        res.status(200).json({message : "users fetched successfull", Allusers})
    }
    catch(err){
        console.log("err occured in fetching user's data");
        res.status(500).json({message  : "error fetching users data",err});
    }
}
//Ranking Leaderboard
const getLeaderboard = async(req,res) => {
  try{
     const leadUsers = await  Users.find({}).sort({totalPoints :-1})   //  1 => asc | -1 -> desc    //sorted desc now add rank
      
      const rankedUser =  leadUsers.map( (user,index) => ({
        rank : index + 1,
        _id : user._id,
        name : user.name,
        totalPoints :user.totalPoints
      }));

      res.status(200).json(rankedUser);

  }
  catch(err){
    console.log("error occurred in marking user's Rank")
    res.status(500).json({message:"server error",err})
  }

}


module.exports = {createUser ,getAllUsers , getLeaderboard};