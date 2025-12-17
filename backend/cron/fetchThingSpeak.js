const axios = require("axios");
const LidData = require("../models/LidData");

// 👇 CONFIG FOR BOTH LIDS
const LIDS = [
  {
    lidId: "TNAGAR_LID_2",
    channelId: "3205130",
    apiKey: "1T51GZ5IFFAHKOEF"
  },
  {
    lidId: "TNAGAR_LID_3",
    channelId: "3205159",
    apiKey: "8BXXA18F0MRLY7DO"
  }
];

async function fetchThingSpeak() {
  for (const lid of LIDS) {
    try {
      const url = `https://api.thingspeak.com/channels/${lid.channelId}/feeds/last.json?api_key=${lid.apiKey}`;
      const res = await axios.get(url);
      const d = res.data;

      if (!d) return;

      await LidData.create({
        lidId: lid.lidId,
        waterLevel: d.field1,
        temperature: d.field2,
        lidStatus: d.field3 == "1" ? "Open" : "Closed",
        gasLevel: d.field4
      });

      console.log(`✅ Saved data for ${lid.lidId}`);
    } catch (err) {
      console.error(`❌ Error fetching ${lid.lidId}`, err.message);
    }
  }
}

module.exports = fetchThingSpeak;
