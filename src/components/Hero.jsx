import { useEffect, useState } from "react";
import { Wifi, Signal, Sun, ShieldCheck } from "lucide-react";

export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/1.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* DARK OVERLAY */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000
        ${show ? "opacity-60" : "opacity-0"}`}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* ================= LEFT CONTENT ================= */}
          <div
            className={`text-white transition-all duration-1000
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <span className="inline-block mb-4 px-5 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold">
              INNOVATIVE SOLUTIONS
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Solar Powered Manhole Lid and <br />
              Drainage Monitoring System
            </h1>

            <p className="text-gray-200 text-lg mb-8 max-w-xl">
              An innovative solution for real-time monitoring of drainage systems
              using solar energy and IoT technology. Ensuring clean, safe, and
              sustainable urban living.
            </p>

            <div className="flex flex-wrap gap-5">
              <button
                onClick={scrollToServices}
                className="bg-emerald-500 hover:bg-emerald-600 transition px-8 py-4 rounded-full font-semibold"
              >
                Explore Services
              </button>

              <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold">
                ▶ Watch Demo
              </button>
            </div>
          </div>

          {/* ================= RIGHT FEATURE CARDS ================= */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-1000 delay-300
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white">
              <Wifi className="text-emerald-400 mb-4" size={28} />
              <h4 className="font-semibold mb-1">IoT Enabled Sensors</h4>
              <p className="text-sm text-gray-200">
                Live water level & blockage detection
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white">
              <Signal className="text-emerald-400 mb-4" size={28} />
              <h4 className="font-semibold mb-1">Wireless Communication</h4>
              <p className="text-sm text-gray-200">
                Data to mobile & web dashboard
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white">
              <Sun className="text-emerald-400 mb-4" size={28} />
              <h4 className="font-semibold mb-1">Solar Powered</h4>
              <p className="text-sm text-gray-200">
                Renewable & maintenance-free
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white">
              <ShieldCheck className="text-emerald-400 mb-4" size={28} />
              <h4 className="font-semibold mb-1">Durable & Secure Lid</h4>
              <p className="text-sm text-gray-200">
                Long lasting with safety features
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
