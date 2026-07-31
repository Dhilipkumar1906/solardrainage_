const axios = require("axios");
const LidData = require("../models/LidData");
const { execFile } = require("child_process");
const path = require("path");

// =========================
// THINGSPEAK CHANNELS
// =========================
const LIDS = [
  {
    lidId: "TNAGAR_LID_2",
    channelId: "3205130",
    apiKey: "1T51GZ5IFFAHKOEF",
  },
  {
    lidId: "TNAGAR_LID_3",
    channelId: "3205159",
    apiKey: "8BXXA18F0MRLY7DO",
  },
];

// =========================
// ML Prediction Function
// =========================
function predictFloodRisk(waterLevel, temperature, gasLevel, lidStatus) {
  return new Promise((resolve, reject) => {

    const pythonPath = path.resolve(
      __dirname,
      "../../../ml/venv/Scripts/python.exe"
    );

    const scriptPath = path.resolve(
      __dirname,
      "../../../ml/predict.py"
    );

    console.log("Python:", pythonPath);
    console.log("Script:", scriptPath);

    execFile(
      pythonPath,
      [
        scriptPath,
        waterLevel.toString(),
        temperature.toString(),
        gasLevel.toString(),
        lidStatus,
      ],
      (error, stdout, stderr) => {
        if (error) {
          console.error("Prediction Error:", stderr);
          return reject(error);
        }

        const prediction = stdout.trim().split("\n").pop();
        resolve(prediction);
      }
    );
  });
}
// =========================
// Fetch ThingSpeak
// =========================
async function fetchThingSpeak() {
  // -------------------------
  // LID 2 & LID 3
  // -------------------------
  for (const lid of LIDS) {
    try {
      const url = `https://api.thingspeak.com/channels/${lid.channelId}/feeds/last.json?api_key=${lid.apiKey}`;

      const res = await axios.get(url);
      const d = res.data;

      if (!d) continue;

      const waterLevel = Number(d.field1);
      const temperature = Number(d.field2);
      const lidStatus = d.field3 == "1" ? "Open" : "Closed";
      const gasLevel = Number(d.field4);

      const floodRisk = await predictFloodRisk(
        waterLevel,
        temperature,
        gasLevel,
        lidStatus
      );

      await LidData.create({
        lidId: lid.lidId,
        waterLevel,
        temperature,
        lidStatus,
        gasLevel,
        floodRisk,
      });

      console.log(`✅ ${lid.lidId} Saved | Prediction: ${floodRisk}`);
    } catch (err) {
      console.error(`❌ Error fetching ${lid.lidId}`, err.message);
    }
  }

  // -------------------------
  // Hardware LID 1
  // -------------------------
  try {
    const lid1Url =
      "https://api.thingspeak.com/channels/3209958/feeds/last.json?api_key=6SH8TQKKMJ78NQ4Z";

    const res1 = await axios.get(lid1Url);
    const d1 = res1.data;

    if (d1) {
      const waterLevel = Number(d1.field1);
      const temperature = Number(d1.field2);
      const lidStatus = d1.field3 == "1" ? "Open" : "Closed";
      const gasLevel = Number(d1.field4);

      const floodRisk = await predictFloodRisk(
        waterLevel,
        temperature,
        gasLevel,
        lidStatus
      );

      await LidData.create({
        lidId: "TNAGAR_LID_1",
        waterLevel,
        temperature,
        lidStatus,
        gasLevel,
        floodRisk,
      });

      console.log(
        `✅ TNAGAR_LID_1 Saved | Prediction: ${floodRisk}`
      );
    }
  } catch (err) {
    console.error("❌ Error fetching TNAGAR_LID_1", err.message);
  }
}

module.exports = fetchThingSpeak;