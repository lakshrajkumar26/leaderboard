const express = require("express");
const { claimPoints ,getClaimHistory  } = require("../controllers/claimhistoryController");

const router = express.Router();


router.post("/claim/:userId",claimPoints);

router.get("/history/:userId", getClaimHistory);

module.exports= router;