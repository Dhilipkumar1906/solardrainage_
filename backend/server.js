const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const fetchThingSpeak = require("./cron/fetchThingSpeak");
const lidRoutes = require("./routes/lidRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/solardrainage")
  .then(() => console.log("✅ MongoDB Connected"));

app.use("/api/lids", lidRoutes);

// every 15 seconds
cron.schedule("*/15 * * * * *", fetchThingSpeak);

app.listen(5000, () =>
  console.log("🚀 Server running on port 5000")
);
