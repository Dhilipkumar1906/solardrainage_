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
  ShieldAlert,
  Activity,
  Waves,
  Radio,
} from "lucide-react";

export default function LiveStatus() {
  const navigate = useNavigate();

  const [lid1, setLid1] = useState({});
  const [lid2, setLid2] = useState({});
  const [lid3, setLid3] = useState({});
  const [alert, setAlert] = useState(false);
  const [alarmOn, setAlarmOn] = useState(true);

  const isAdmin = localStorage.getItem("role") === "admin";

  const alarmRef = useRef(
    new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg")
  );

  useEffect(() => {
    alarmRef.current.loop = true;
  }, []);

  const fetchThingSpeak = async (channelId, apiKey, setData) => {
    try {
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

        if (alarmOn && isAdmin) {
          alarmRef.current.play();
        }
      } else {
        alarmRef.current.pause();
        alarmRef.current.currentTime = 0;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const load = () => {
      fetchThingSpeak("3209958", "6SH8TQKKMJ78NQ4Z", setLid1);
      fetchThingSpeak("3205130", "1T51GZ5IFFAHKOEF", setLid2);
      fetchThingSpeak("3205159", "8BXXA18F0MRLY7DO", setLid3);
    };

    load();

    const i = setInterval(load, 15000);

    return () => clearInterval(i);
  }, [alarmOn]);

  const StatRow = ({ icon, label, value, danger }) => (
    <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="text-emerald-400">{icon}</div>
        <span className="text-gray-300 text-sm">{label}</span>
      </div>

      <span
        className={`font-semibold text-sm ${
          danger ? "text-red-400" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );

  const Card = ({ title, data, onClick }) => (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden cursor-pointer
      rounded-3xl p-[1px]
      bg-gradient-to-br from-emerald-500/40 via-cyan-500/10 to-transparent
      transition-all duration-500 hover:scale-[1.02]`}
    >
      <div
        className={`relative h-full rounded-3xl bg-[#10151d]/95
        backdrop-blur-2xl border border-white/10 p-7
        transition-all duration-500
        group-hover:border-emerald-400/40
        ${
          data?.danger
            ? "shadow-[0_0_40px_rgba(255,0,0,0.25)]"
            : "shadow-[0_0_40px_rgba(16,185,129,0.08)]"
        }`}
      >
        {/* GLOW */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full" />

        {/* TOP */}
        <div className="flex items-start justify-between mb-8 relative z-10">
          <div>
            <h3 className="text-2xl font-bold tracking-wide text-white">
              {title}
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Smart Drainage Unit
            </p>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border
            ${
              data?.danger
                ? "bg-red-500/20 text-red-300 border-red-500/30"
                : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
            }`}
          >
            <Radio size={14} />
            {data?.danger ? "THREAT" : "SECURE"}
          </div>
        </div>

        {/* STATUS */}
        <div className="space-y-4 relative z-10">
          <StatRow
            icon={<Lock size={18} />}
            label="Lid Status"
            value={data?.lid || "Closed"}
            danger={data?.lid === "Open"}
          />

          <StatRow
            icon={<Droplet size={18} />}
            label="Water Level"
            value={data?.water || "-"}
          />

          <StatRow
            icon={<Wind size={18} />}
            label="Gas Level"
            value={data?.gas || "-"}
          />

          <StatRow
            icon={<Thermometer size={18} />}
            label="Temperature"
            value={`${data?.temp || "-"} °C`}
          />
        </div>

        {/* BOTTOM */}
        <div className="flex items-center justify-between mt-8 relative z-10">
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <Activity size={16} />
            Live Monitoring
          </div>

          <button
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10
            text-sm text-white transition-all duration-300
            hover:bg-emerald-500 hover:text-black"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#060816] text-white">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0">
        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-emerald-500/20 rounded-full blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-cyan-500/20 rounded-full blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center">
                <Waves className="text-emerald-400" />
              </div>

              <div>
                <p className="text-emerald-400 text-sm tracking-[4px] uppercase">
                  Edge AI Monitoring
                </p>

                <h1 className="text-5xl font-black leading-tight">
                  Solar Drainage
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Control Center
                  </span>
                </h1>
              </div>
            </div>

            <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
              AI-powered smart manhole surveillance system with real-time
              drainage analytics, gas detection, water monitoring, and
              unauthorized access alerts.
            </p>
          </div>

          {/* ADMIN BUTTON */}
          {isAdmin && (
            <button
              onClick={() => {
                setAlarmOn(!alarmOn);
                alarmRef.current.pause();
                alarmRef.current.currentTime = 0;
              }}
              className={`group relative overflow-hidden px-6 py-4 rounded-2xl
              border transition-all duration-300 font-semibold
              ${
                alarmOn
                  ? "bg-red-500/20 border-red-500/30 text-red-300"
                  : "bg-white/5 border-white/10 text-gray-300"
              }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                {alarmOn ? <Volume2 /> : <VolumeX />}
                Alarm {alarmOn ? "Enabled" : "Disabled"}
              </div>
            </button>
          )}
        </div>

        {/* ALERT */}
        {alert && (
          <div
            className="mb-10 relative overflow-hidden rounded-3xl
            border border-red-500/30 bg-red-500/10 backdrop-blur-xl p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent" />

            <div className="relative z-10 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center">
                <ShieldAlert className="text-red-400" size={30} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-red-300">
                  Emergency Security Alert
                </h2>

                <p className="text-red-200/80 mt-1">
                  Unauthorized manhole opening detected in monitoring zone.
                  Immediate inspection required.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
            <p className="text-gray-400 text-sm">Monitoring Units</p>

            <h2 className="text-4xl font-black mt-3">03</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
            <p className="text-gray-400 text-sm">System Status</p>

            <h2 className="text-4xl font-black mt-3 text-emerald-400">
              ACTIVE
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
            <p className="text-gray-400 text-sm">Cloud Sync</p>

            <h2 className="text-4xl font-black mt-3 text-cyan-400">
              LIVE
            </h2>
          </div>
        </div>

        {/* CARDS */}
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

        {/* FOOTER */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          <div>
            <h3 className="font-semibold text-lg">
              SolarDrainage AI Surveillance
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Real-time smart drainage monitoring infrastructure
            </p>
          </div>

          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />

            <span className="text-emerald-300 font-medium">
              System Running Live
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}