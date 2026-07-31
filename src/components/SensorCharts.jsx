import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useEffect, useState } from "react";

export default function SensorCharts({ lidId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] =useState(true);

  useEffect(() => {
    fetchHistory();
  }, [lidId]);

  async function fetchHistory() {
    try {
      const res = await fetch(
        `http://localhost:5000/api/lids/history/${lidId}`
      );

      const data = await res.json();

      const formatted = data.reverse().map((item) => ({
        time: new Date(item.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),

        water: item.water,
        gas: item.gas,
        temp: item.temp,
        risk: item.floodRisk,
      }));

      setHistory(formatted);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  if (loading)
    return (
      <div className="text-center text-gray-400 py-10">
        Loading Charts...
      </div>
    );

  if (!history.length)
    return (
      <div className="text-center text-red-400 py-10">
        No Historical Data Available
      </div>
    );

  return (
    <div className="space-y-10">
              {/* ==========================
          Water Level Chart
      =========================== */}

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl border border-cyan-500">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-cyan-400">
            📈 Water Level Trend
          </h2>

          <span className="bg-cyan-500/20 text-cyan-300 px-4 py-1 rounded-full text-sm">
            Live History
          </span>

        </div>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <LineChart data={history}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
            />

            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
            />

            <YAxis
              stroke="#9CA3AF"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #06b6d4",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="water"
              stroke="#06b6d4"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              name="Water Level (cm)"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>
            {/* ==========================
          Gas Level Chart
      =========================== */}

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl border border-orange-500">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-orange-400">
            💨 Gas Level Trend
          </h2>

          <span className="bg-orange-500/20 text-orange-300 px-4 py-1 rounded-full text-sm">
            Live History
          </span>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <LineChart data={history}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
            />

            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
            />

            <YAxis
              stroke="#9CA3AF"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #f97316",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="gas"
              stroke="#f97316"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              name="Gas Level (ppm)"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* ==========================
          Temperature Chart
      =========================== */}

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl border border-red-500">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-red-400">
            🌡 Temperature Trend
          </h2>

          <span className="bg-red-500/20 text-red-300 px-4 py-1 rounded-full text-sm">
            Live History
          </span>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <LineChart data={history}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
            />

            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
            />

            <YAxis
              stroke="#9CA3AF"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #ef4444",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="temp"
              stroke="#ef4444"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              name="Temperature (°C)"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>
            {/* ==========================
          AI Analytics Summary
      =========================== */}

      <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-2xl p-6 border border-emerald-500 shadow-xl">

        <h2 className="text-2xl font-bold text-emerald-400 mb-6">
          🤖 AI Analytics Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-black/20 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Latest Water Level</p>
            <h3 className="text-3xl font-bold text-cyan-400">
              {history[history.length - 1]?.water} cm
            </h3>
          </div>

          <div className="bg-black/20 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Latest Gas Level</p>
            <h3 className="text-3xl font-bold text-orange-400">
              {history[history.length - 1]?.gas}
            </h3>
          </div>

          <div className="bg-black/20 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Latest Temperature</p>
            <h3 className="text-3xl font-bold text-red-400">
              {history[history.length - 1]?.temp}°C
            </h3>
          </div>

          <div className="bg-black/20 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Current AI Status</p>
            <h3 className="text-2xl font-bold text-emerald-400">
              {history[history.length - 1]?.risk}
            </h3>
          </div>

        </div>

        <div className="mt-6 bg-emerald-500/10 border border-emerald-500 rounded-xl p-5">

          <h3 className="text-xl font-bold text-emerald-300 mb-2">
            💡 AI Recommendation
          </h3>

          <p className="text-gray-300">
            {history[history.length - 1]?.risk === "Critical"
              ? "Immediate maintenance is required. High flood risk detected."
              : history[history.length - 1]?.risk === "Warning"
              ? "Inspect the drainage system immediately to prevent overflow."
              : history[history.length - 1]?.risk === "Monitor"
              ? "Preventive inspection is recommended."
              : "System is operating normally. Continue real-time monitoring."}
          </p>

        </div>

      </div>

    </div>
  );
}