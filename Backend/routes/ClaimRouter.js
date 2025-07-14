const express = require("express");
const { claimPoints } = require("../controllers/claimhistoryController");
const router = express.Router();


router.post("/claim/:userId",claimPoints);

module.exports= router;