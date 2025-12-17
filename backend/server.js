const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const cors = require("cors");
require("dotenv").config();

const fetchThingSpeak = require("./cron/fetchThingSpeak");
const lidRoutes = require("./routes/lidRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ LOCAL MONGODB ONLY


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.error(err));


app.use("/api/lids", lidRoutes);

// ✅ LOCAL CRON ENABLED
cron.schedule("*/15 * * * * *", fetchThingSpeak);

app.listen(5000, () => {
  console.log("🚀 Local server running on http://localhost:5000");
});
