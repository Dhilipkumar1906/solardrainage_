import { useEffect, useState, useRef } from "react";
import LiveMap from "../components/LiveMap";
import { useNavigate } from "react-router-dom";
import SensorCharts from "../components/SensorCharts";
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

  // ==========================
  // States
  // ==========================
  const [lid1, setLid1] = useState({});
  const [lid2, setLid2] = useState({});
  const [lid3, setLid3] = useState({});

  const [alert, setAlert] = useState(false);
  const [alarmOn, setAlarmOn] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const isAdmin = localStorage.getItem("role") === "admin";
  const navigate = useNavigate();

  // ==========================
  // Alarm
  // ==========================
  const alarmRef = useRef(
    new Audio(
      "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    )
  );

  useEffect(() => {
    alarmRef.current.loop = true;
  }, []);

  // ==========================
  // Live Clock
  // ==========================
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ==========================
  // Fetch Latest Data
  // ==========================
  const fetchLid = async (lidId, setData) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/lids/latest/${lidId}`
      );

      const data = await res.json();

      if (!data) return;

      setData({
        water: data.waterLevel,
        temp: data.temperature,
        gas: data.gasLevel,
        lid: data.lidStatus,
        floodRisk: data.floodRisk,
        danger: data.lidStatus === "Open",
      });

      if (data.lidStatus === "Open") {
        setAlert(true);

        if (alarmOn && isAdmin) {
          alarmRef.current.play();
        }
      } else {
        alarmRef.current.pause();
        alarmRef.current.currentTime = 0;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const load = () => {
      fetchLid("TNAGAR_LID_1", setLid1);
      fetchLid("TNAGAR_LID_2", setLid2);
      fetchLid("TNAGAR_LID_3", setLid3);
    };

    load();

    const interval = setInterval(load, 15000);

    return () => clearInterval(interval);
  }, [alarmOn]);

  // ==========================
  // Dashboard Summary
  // ==========================
  const allLids = [lid1, lid2, lid3];

  const totalLids = allLids.length;

  const openLids = allLids.filter(
    (lid) => lid.lid === "Open"
  ).length;

  const alerts = allLids.filter(
    (lid) =>
      lid.floodRisk === "Warning" ||
      lid.floodRisk === "Critical"
  ).length;

  const healthy = allLids.filter(
    (lid) => lid.floodRisk === "Safe"
  ).length;

  // ==========================
  // AI Risk Display
  // ==========================
  const getRiskInfo = (risk) => {
    switch (risk) {
      case "Safe":
        return {
          text: "🟢 Normal Operation",
          color: "text-green-400",
        };

      case "Monitor":
        return {
          text: "🟡 Preventive Inspection Needed",
          color: "text-yellow-400",
        };

      case "Warning":
        return {
          text: "🟠 High Flood Probability",
          color: "text-orange-400",
        };

      case "Critical":
        return {
          text: "🔴 Immediate Maintenance Required",
          color: "text-red-500",
        };

      default:
        return {
          text: "Waiting...",
          color: "text-gray-400",
        };
    }
  };

  // ==========================
  // AI Recommendation
  // ==========================
  const getRecommendation = (risk) => {
    switch (risk) {
      case "Safe":
        return "✔ Drainage system is operating normally. No maintenance is required.";

      case "Monitor":
        return "👀 Preventive inspection is recommended to avoid future blockage.";

      case "Warning":
        return "⚠ High flood probability detected. Inspect the drainage immediately.";

      case "Critical":
        return "🚨 Immediate maintenance is required to prevent severe flooding.";

      default:
        return "Waiting for live sensor data...";
    }
  };
    // ==========================
  // Dashboard Card
  // ==========================
  const Card = ({ title, data, onClick }) => {
    const risk = getRiskInfo(data?.floodRisk);

    return (
      <div
        onClick={onClick}
        className={`cursor-pointer rounded-2xl p-6
        bg-gradient-to-br from-[#111827] to-[#1f2937]
        border shadow-xl transition-all duration-300
        hover:scale-105 hover:border-emerald-400
        ${
          data?.danger
            ? "border-red-500 animate-pulse"
            : "border-gray-700"
        }`}
      >
        {/* Card Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-emerald-400">
            {title}
          </h2>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              data?.lid === "Open"
                ? "bg-red-500 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {data?.lid || "Unknown"}
          </span>
        </div>

        {/* Water */}
        <div className="flex items-center justify-between py-2 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Droplet className="text-cyan-400" size={18} />
            <span>Water Level</span>
          </div>

          <span className="font-bold text-cyan-300">
            {data?.water || "--"} cm
          </span>
        </div>

        {/* Gas */}
        <div className="flex items-center justify-between py-2 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Wind className="text-purple-400" size={18} />
            <span>Gas Level</span>
          </div>

          <span className="font-bold text-purple-300">
            {data?.gas || "--"}
          </span>
        </div>

        {/* Temperature */}
        <div className="flex items-center justify-between py-2 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Thermometer className="text-orange-400" size={18} />
            <span>Temperature</span>
          </div>

          <span className="font-bold text-orange-300">
            {data?.temp || "--"} °C
          </span>
        </div>

        {/* AI Status */}
        <div className="mt-5">

          <p className="text-sm text-gray-400 mb-2">
            AI Drainage Assessment
          </p>

          <div
            className={`rounded-xl p-3 text-center font-bold ${risk.color} bg-black/30`}
          >
            {risk.text}
          </div>

        </div>

        {/* Recommendation */}
        <div className="mt-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3">

          <h4 className="font-semibold text-emerald-400 mb-2">
            🤖 AI Recommendation
          </h4>

          <p className="text-sm text-gray-300">
            {getRecommendation(data?.floodRisk)}
          </p>

        </div>

        {/* View Details */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full mt-5 bg-emerald-500 hover:bg-emerald-600 transition rounded-xl py-2 font-semibold"
        >
          View Detailed Analytics
        </button>

      </div>
    );
  };
    return (
    <section className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#111827] text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* ==========================
            Header
        =========================== */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-400">
              AI Smart Drainage Monitoring Dashboard
            </h1>

            <p className="text-gray-400 mt-2 text-lg">
              Real-Time Monitoring & AI-Based Flood Prediction System
            </p>
          </div>

          <div className="text-right">

            <div className="text-sm text-gray-400">
              Last Updated
            </div>

            <div className="text-xl font-bold text-cyan-400">
              {currentTime.toLocaleString()}
            </div>

            {isAdmin && (
              <button
                onClick={() => {
                  setAlarmOn(!alarmOn);
                  alarmRef.current.pause();
                  alarmRef.current.currentTime = 0;
                }}
                className={`mt-4 flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition ${
                  alarmOn
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {alarmOn ? (
                  <Volume2 size={20} />
                ) : (
                  <VolumeX size={20} />
                )}

                Alarm {alarmOn ? "ON" : "OFF"}
              </button>
            )}

          </div>

        </div>

        {/* ==========================
            Summary Cards
        =========================== */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500 p-5">
            <h3 className="text-gray-400">
              Total Smart Manholes
            </h3>

            <p className="text-4xl font-bold text-emerald-400 mt-3">
              {totalLids}
            </p>
          </div>

          <div className="rounded-2xl bg-red-500/10 border border-red-500 p-5">
            <h3 className="text-gray-400">
              Unauthorized Open Lids
            </h3>

            <p className="text-4xl font-bold text-red-400 mt-3">
              {openLids}
            </p>
          </div>

          <div className="rounded-2xl bg-orange-500/10 border border-orange-500 p-5">
            <h3 className="text-gray-400">
              Active AI Alerts
            </h3>

            <p className="text-4xl font-bold text-orange-400 mt-3">
              {alerts}
            </p>
          </div>

          <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500 p-5">
            <h3 className="text-gray-400">
              Normal Operating Lids
            </h3>

            <p className="text-4xl font-bold text-cyan-400 mt-3">
              {healthy}
            </p>
          </div>

        </div>
        
        <div className="mb-10">

  <h2 className="text-3xl font-bold text-emerald-400 mb-5">
    📍 Live Smart City Map
  </h2>

  <LiveMap
    lid1={lid1}
    lid2={lid2}
    lid3={lid3}
  />

</div>

        {/* ==========================
            Emergency Alert
        =========================== */}

        {alert && (

          <div className="mb-10 rounded-2xl border border-red-500 bg-red-500/20 p-5 flex items-center gap-4 animate-pulse">

            <AlertTriangle
              className="text-red-500"
              size={35}
            />

            <div>

              <h2 className="text-xl font-bold text-red-400">
                Emergency Alert
              </h2>

              <p className="text-gray-200">
                Unauthorized manhole opening detected.
                Immediate inspection is recommended.
              </p>

            </div>

          </div>

        )}

        {/* ==========================
            Dashboard Cards
        =========================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          <Card
            title="T-Nagar Lid 1"
            data={lid1}
            onClick={() => navigate("/lid1")}
          />

          <Card
            title="T-Nagar Lid 2"
            data={lid2}
            onClick={() => navigate("/lid2")}
          />

          <Card
            title="T-Nagar Lid 3"
            data={lid3}
            onClick={() => navigate("/lid3")}
          />

        </div>
        
                {/* ==========================
            AI Smart Insights
        =========================== */}

        <div className="mt-12 bg-gradient-to-r from-[#111827] to-[#1f2937] rounded-2xl p-8 border border-emerald-500 shadow-xl">

          <h2 className="text-3xl font-bold text-emerald-400 mb-6">
            🤖 AI Smart Insights
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="bg-black/20 rounded-xl p-5">
              <h3 className="text-lg font-bold text-white mb-3">
                📍 T-Nagar Lid 1
              </h3>

              <p className="text-gray-300">
                {getRecommendation(lid1.floodRisk)}
              </p>
            </div>

            <div className="bg-black/20 rounded-xl p-5">
              <h3 className="text-lg font-bold text-white mb-3">
                📍 T-Nagar Lid 2
              </h3>

              <p className="text-gray-300">
                {getRecommendation(lid2.floodRisk)}
              </p>
            </div>

            <div className="bg-black/20 rounded-xl p-5">
              <h3 className="text-lg font-bold text-white mb-3">
                📍 T-Nagar Lid 3
              </h3>

              <p className="text-gray-300">
                {getRecommendation(lid3.floodRisk)}
              </p>
            </div>

          </div>

          {/* Overall Status */}

          <div className="mt-8 rounded-xl bg-emerald-500/10 border border-emerald-500 p-5">

            <h3 className="text-xl font-bold text-emerald-400 mb-3">
              📊 Overall System Assessment
            </h3>

            <ul className="space-y-2 text-gray-300">

              <li>
                ✅ Total Smart Manholes : <strong>{totalLids}</strong>
              </li>

              <li>
                🚨 Active AI Alerts : <strong>{alerts}</strong>
              </li>

              <li>
                🔓 Open Manhole Lids : <strong>{openLids}</strong>
              </li>

              <li>
                🟢 Healthy Systems : <strong>{healthy}</strong>
              </li>

            </ul>

          </div>

        </div>
        <button
  onClick={() => navigate("/report")}
  className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl text-white font-semibold"
>
  📄 View Report
</button>
        {/* ==========================
            Footer
        =========================== */}

        <div className="mt-16 border-t border-gray-700 pt-6 text-center">

          <h3 className="text-emerald-400 font-bold text-xl">
            AI Powered Smart Drainage Monitoring System
          </h3>

          <p className="text-gray-400 mt-2">
            Real-Time Monitoring | Machine Learning Prediction |
            Smart City Infrastructure
          </p>

          <p className="text-gray-500 mt-4 text-sm">
            Last Updated :
            <span className="text-cyan-400 font-semibold ml-2">
              {currentTime.toLocaleString()}
            </span>
          </p>

        </div>

      </div>
    </section>
  );
}