import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Droplet,
  Wind,
  Thermometer,
  AlertTriangle,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function LiveStatus() {
  const navigate = useNavigate();

  const [lid1, setLid1] = useState({});
  const [lid2, setLid2] = useState({});
  const [lid3, setLid3] = useState({});
  const [alert, setAlert] = useState(false);
  const [alarmOn, setAlarmOn] = useState(true);

  const isAdmin = localStorage.getItem("role") === "admin";

  // 🔊 Beep sound
  const alarmRef = useRef(
    new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg")
  );

  useEffect(() => {
    alarmRef.current.loop = true;
  }, []);

  const fetchThingSpeak = async (channelId, apiKey, setData) => {
    const res = await fetch(
      `https://api.thingspeak.com/channels/${channelId}/feeds/last.json?api_key=${apiKey}`
    );
    const data = await res.json();

    const lidOpen = data.field3 == 1;

    setData({
      water: data.field1,
      temp: data.field2,
      gas: data.field4,
      lid: lidOpen ? "Open" : "Closed",
      danger: lidOpen,
    });

    if (lidOpen) {
      setAlert(true);
      if (alarmOn && isAdmin) alarmRef.current.play();
    } else {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const load = () => {
      // 🔹 LID 1 – HARDWARE
      fetchThingSpeak("3209958", "6SH8TQKKMJ78NQ4Z", setLid1);

      // 🔹 LID 2
      fetchThingSpeak("3205130", "1T51GZ5IFFAHKOEF", setLid2);

      // 🔹 LID 3
      fetchThingSpeak("3205159", "8BXXA18F0MRLY7DO", setLid3);
    };

    load();
    const i = setInterval(load, 15000);
    return () => clearInterval(i);
  }, [alarmOn]);

  const Card = ({ title, data, onClick }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-6 bg-white/10 backdrop-blur-lg
      border border-white/10 shadow-[0_0_12px_rgba(0,255,128,0.15)]
      transition transform hover:scale-105 hover:ring-2 hover:ring-emerald-400
      ${data?.danger ? "animate-pulse border-red-500" : ""}`}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <p className="flex gap-3 mb-2">
        <Lock className="text-emerald-400" />
        Lid Status:
        <span
          className={`font-semibold ${
            data?.lid === "Open" ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {data?.lid || "Closed"}
        </span>
      </p>

      <p className="flex gap-3 mb-2">
        <Droplet className="text-emerald-400" />
        Water Level: {data?.water || "-"}
      </p>

      <p className="flex gap-3 mb-2">
        <Wind className="text-emerald-400" />
        Gas Level: {data?.gas || "-"}
      </p>

      <p className="flex gap-3">
        <Thermometer className="text-emerald-400" />
        Temperature: {data?.temp || "-"}°C
      </p>
    </div>
  );

  return (
    <section className="min-h-screen bg-[#0c0f0f] text-white pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-emerald-400">
              Solar Drainage Monitoring Dashboard
            </h1>
            <p className="text-gray-300">
              Real-time monitoring of manhole lids and drainage conditions
            </p>
          </div>

          {/* ADMIN ALARM */}
          {isAdmin && (
            <button
              onClick={() => {
                setAlarmOn(!alarmOn);
                alarmRef.current.pause();
                alarmRef.current.currentTime = 0;
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold
              ${alarmOn ? "bg-red-500" : "bg-gray-600"}`}
            >
              {alarmOn ? <Volume2 /> : <VolumeX />}
              Alarm {alarmOn ? "ON" : "OFF"}
            </button>
          )}
        </div>

        {/* ALERT */}
        {alert && (
          <div className="mb-8 p-4 rounded-lg bg-red-500/20 border border-red-500 flex gap-3">
            <AlertTriangle className="text-red-400" />
            🚨 Emergency Alert: Unauthorized opening detected!
          </div>
        )}

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title="T-Nagar Lid 1 (Hardware)"
            data={lid1}
            onClick={() => navigate("/history/TNAGAR_LID_1")}
          />

          <Card
            title="T-Nagar Lid 2"
            data={lid2}
            onClick={() => navigate("/history/TNAGAR_LID_2")}
          />

          <Card
            title="T-Nagar Lid 3"
            data={lid3}
            onClick={() => navigate("/history/TNAGAR_LID_3")}
          />
        </div>

        <div className="text-center mt-14 text-gray-400">
          Last Updated: <span className="text-emerald-400">Live</span>
        </div>
      </div>
    </section>
  );
}
