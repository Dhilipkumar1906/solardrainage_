const express = require("express");
const router = express.Router();
const fetchThingSpeak = require("../cron/fetchThingSpeak");

router.get("/run", async (req, res) => {
  try {
    await fetchThingSpeak();
    res.send("Data fetched");
  } catch (e) {
    res.status(500).send("Error");
  }
});

module.exports = router;
