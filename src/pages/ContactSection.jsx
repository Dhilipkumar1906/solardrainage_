import {
  MapPin,
  Mail,
  Phone,
  Clock,
} from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900">Contact</h2>
          <div className="w-14 h-[3px] bg-emerald-500 mx-auto mt-3 rounded-full" />
          <p className="text-sm text-gray-500 mt-4">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
          </p>
        </div>

        {/* ================= CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ================= MAP ================= */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-[520px]">
            <iframe
              title="Tamil Nadu Location"
              src="https://www.google.com/maps?q=Coimbatore,Tamil%20Nadu,India&z=14&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="space-y-8">
            {/* INFO CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Location */}
              <div className="bg-white rounded-xl shadow-md p-6 flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <MapPin />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Location</h4>
                  <p className="text-sm text-gray-600">
                    3rd Floor, Avinashi Road,<br />
                    Coimbatore, Tamil Nadu – 641014
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl shadow-md p-6 flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <Mail />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-sm text-gray-600">
                    contact@solardrainage.in
                  </p>
                </div>
              </div>

              {/* Call */}
              <div className="bg-white rounded-xl shadow-md p-6 flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <Phone />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Call</h4>
                  <p className="text-sm text-gray-600">
                    +91 94872 46869
                  </p>
                </div>
              </div>

              {/* Open Hours */}
              <div className="bg-white rounded-xl shadow-md p-6 flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <Clock />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Open Hours</h4>
                  <p className="text-sm text-gray-600">
                    Mon – Sat : 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* ================= CONTACT FORM ================= */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get in Touch
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Fill out the form below and our team will get back to you shortly.
              </p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <textarea
                  rows="4"
                  placeholder="Message"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-medium transition"
                  >
                    Send Message
                  </button>

                  {/* SOCIAL ICONS */}
                  <div className="flex gap-4 text-gray-500">
                    <span className="hover:text-emerald-500 cursor-pointer">🐦</span>
                    <span className="hover:text-emerald-500 cursor-pointer">📘</span>
                    <span className="hover:text-emerald-500 cursor-pointer">📸</span>
                    <span className="hover:text-emerald-500 cursor-pointer">💼</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
