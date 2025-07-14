const user = require("../models/UserModel");


const createUser = async(req,res)=>{
     const data = req.body;    
    try{
        if(!data.name) { return res.status(400).json({message:"user not found"})};
          const newUser = await user.create({
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

const getAllUsers = async (req,res) => {
     
    try{
        const Allusers = await user.find();
        res.status(200).json({message : "users fetched successfull", Allusers})
    }
    catch(err){
        console.log("err occured in fetching user's data");
        res.status(500).json({message  : "error fetching users data",err});
    }
}

module.exports = {createUser ,getAllUsers};