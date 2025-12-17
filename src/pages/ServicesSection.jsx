import {
  Building2,
  HeartPulse,
  ShoppingCart,
  GraduationCap,
  Hotel,
} from "lucide-react";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative bg-[#f7fbf9] py-28 overflow-hidden"
    >
      {/* soft background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_65%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ================= HEADING ================= */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900">Services</h2>
          <div className="w-14 h-[3px] bg-emerald-500 mx-auto mt-3 rounded-full" />
          <p className="text-sm tracking-wide text-gray-500 mt-4 uppercase">
            Check Our Services
          </p>
        </div>

        {/* ================= SERVICES GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Apartment Complexes (BIG CARD) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-10 border border-emerald-400 shadow-[0_20px_60px_rgba(16,185,129,0.25)]">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6">
              <Building2 size={26} />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Apartment Complexes
            </h3>
            <p className="text-gray-600 max-w-lg mb-6">
              High-rise or gated communities with frequent drainage issues
              during heavy rains.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                MOST POPULAR
              </span>
              <span className="text-emerald-600 font-semibold">
                Starting at ₹2,99,999
              </span>
            </div>

            <button className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition">
              Get Started →
            </button>
          </div>

          {/* Hospitals */}
          <div className="bg-white rounded-3xl p-10 shadow-lg">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6">
              <HeartPulse size={26} />
            </div>

            <h3 className="text-xl font-semibold mb-3">Hospitals</h3>
            <p className="text-gray-600 mb-6">
              Need uninterrupted operation; flooding can cause hygiene hazards
              and emergencies.
            </p>

            <p className="text-emerald-600 font-semibold mb-6">
              Starting at ₹1,89,999
            </p>

            <button className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition">
              Learn More →
            </button>
          </div>

          {/* Shopping Malls */}
          <div className="bg-white rounded-3xl p-10 shadow-lg">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6">
              <ShoppingCart size={26} />
            </div>

            <h3 className="text-xl font-semibold mb-3">Shopping Malls</h3>
            <p className="text-gray-600 mb-6">
              High footfall areas where waterlogging can affect business and
              safety.
            </p>

            <button className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition">
              Explore →
            </button>
          </div>

          {/* IT Parks */}
          <div className="bg-white rounded-3xl p-10 shadow-lg">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6">
              <GraduationCap size={26} />
            </div>

            <h3 className="text-xl font-semibold mb-3">
              IT Parks / Corporate Offices
            </h3>
            <p className="text-gray-600 mb-6">
              Ensure smooth operations and prevent damage to infrastructure.
            </p>

            <button className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition">
              Discover →
            </button>
          </div>

          {/* Hotels */}
          <div className="bg-white rounded-3xl p-10 shadow-lg">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6">
              <Hotel size={26} />
            </div>

            <h3 className="text-xl font-semibold mb-3">Hotels & Resorts</h3>
            <p className="text-gray-600 mb-6">
              Maintain guest comfort and avoid property damage during rainy
              seasons.
            </p>

            <button className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition">
              Get Quote →
            </button>
          </div>
        </div>

        {/* ================= STATS BAR ================= */}
        <div className="mt-28">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-3xl py-14 px-8 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-white">
              <div>
                <h3 className="text-4xl font-bold mb-2">0</h3>
                <p className="text-sm opacity-90">Projects Completed</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold mb-2">98%</h3>
                <p className="text-sm opacity-90">Client Satisfaction</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold mb-2">24/7</h3>
                <p className="text-sm opacity-90">Support Available</p>
              </div>

              <div>
                <h3 className="text-4xl font-bold mb-2">1+</h3>
                <p className="text-sm opacity-90">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
        {/* ================= END ================= */}
      </div>
    </section>
  );
}
