const express = require("express");
const router = express.Router();
const { createUser,getAllUsers , getLeaderboard } = require("../controllers/UserController");


router.post("/create",createUser);

router.get("/users",getAllUsers);

router.get("/leaderboard", getLeaderboard );

module.exports = router;