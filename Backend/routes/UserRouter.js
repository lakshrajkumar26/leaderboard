const express = require("express");
const router = express.Router();
const { createUser,getAllUsers } = require("../controllers/UserController");


router.post("/create",createUser);

router.get("/users",getAllUsers);

module.exports = router;