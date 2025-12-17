import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Lid3() {
  const navigate = useNavigate();
  const [ts, setTs] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTs(Date.now());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const charts = [
    { title: "Water Level", color: "%2300ff99", field: 1 },
    { title: "Temperature", color: "%23ff9800", field: 2 },
    { title: "Lid Status", color: "%23ff5252", field: 3 },
    { title: "Gas Level", color: "%236ab7ff", field: 4 },
  ];

  return (
    <section className="min-h-screen bg-[#0c0f0f] text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* BACK */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/live-status")}
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
          >
            <ArrowLeft size={20} /> Back
          </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
          T-Nagar Lid 3 – Live Monitoring
        </h1>
        <p className="text-gray-400 mb-12">
          Real-time sensor graphs (auto-refresh every 15 seconds)
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {charts.map((chart) => (
            <div
              key={chart.field}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10"
            >
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">
                {chart.title}
              </h3>

              <iframe
                key={ts}
                className="w-full h-[320px] rounded-xl"
                src={`https://thingspeak.com/channels/3205159/charts/${chart.field}?bgcolor=%230c0f0f&color=${chart.color}&dynamic=true&ts=${ts}`}
              />
            </div>
          ))}
        </div><br />
          <button
      onClick={() => navigate("/history/TNAGAR_LID_2")}
                className="bg-emerald-500 hover:bg-emerald-600 transition px-8 py-4 rounded-full font-semibold"
              >
            History
              </button>
        <div className="text-center mt-14 text-gray-400">
          Data source: ThingSpeak • Status:{" "}
          <span className="text-emerald-400 font-semibold">Live</span>
        </div>
      </div>
      
    </section>
  );
}
