const express = require("express");
const router = express.Router();
const LidData = require("../models/LidData");

router.get("/history/:lidId", async (req, res) => {
  const data = await LidData
    .find({ lidId: req.params.lidId })
    .sort({ createdAt: -1 })
    .limit(100);

  res.json(data);
});

module.exports = router;
