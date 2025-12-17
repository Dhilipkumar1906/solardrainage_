import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* BRAND */}
        <div>
          <h3 className="text-white text-2xl font-semibold mb-4">
            SolarDrainage
          </h3>
          <p className="text-sm leading-relaxed mb-6">
            Smart solar-powered drainage and manhole monitoring system designed
            to improve urban safety, prevent flooding, and enable real-time
            monitoring using IoT technology.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4">
            <a className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition">
              <Twitter size={18} />
            </a>
            <a className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition">
              <Facebook size={18} />
            </a>
            <a className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition">
              <Instagram size={18} />
            </a>
            <a className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* USEFUL LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Useful Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-emerald-400 cursor-pointer">Home</li>
            <li className="hover:text-emerald-400 cursor-pointer">About Us</li>
            <li className="hover:text-emerald-400 cursor-pointer">Services</li>
            <li className="hover:text-emerald-400 cursor-pointer">Terms of Service</li>
            <li className="hover:text-emerald-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* OUR SERVICES */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Our Services
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-emerald-400 cursor-pointer">
              Drainage Monitoring
            </li>
            <li className="hover:text-emerald-400 cursor-pointer">
              Smart Manhole Systems
            </li>
            <li className="hover:text-emerald-400 cursor-pointer">
              IoT Integration
            </li>
            <li className="hover:text-emerald-400 cursor-pointer">
              Flood Prevention Solutions
            </li>
            <li className="hover:text-emerald-400 cursor-pointer">
              Maintenance Support
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-semibold mb-4">
            Contact Us
          </h4>
          <p className="text-sm leading-relaxed">
            3rd Floor, Avinashi Road<br />
            Coimbatore, Tamil Nadu – 641014<br />
            India
          </p>

          <p className="text-sm mt-4">
            <span className="text-white">Phone:</span> +91 94872 46869
          </p>
          <p className="text-sm">
            <span className="text-white">Email:</span> contact@solardrainage.in
          </p>
        </div>
      </div>

      {/* ================= COPYRIGHT BAR ================= */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
          © Copyright <span className="text-white">SolarDrainage</span>. All Rights Reserved  
          <br />
          Designed by <span className="text-emerald-400">SolarDrainage Team</span>
        </div>
      </div>
    </footer>
  );
}
