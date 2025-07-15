const express = require("express");
const { claimPoints ,getClaimHistory ,getPaginatedHistory } = require("../controllers/claimhistoryController");

const router = express.Router();


router.post("/claim/:userId",claimPoints);

// router.get("/history/:userId", getClaimHistory);

router.get("/history/:userId", getPaginatedHistory );



module.exports= router;