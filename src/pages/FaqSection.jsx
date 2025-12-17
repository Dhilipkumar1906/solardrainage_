import { useState } from "react";

const faqs = [
  {
    q: "What is the Solar-powered Manhole Lid and Drainage Monitoring System?",
    a: "It is an IoT-based smart drainage solution that monitors manholes for water level, gas leakage, tilt, and blockages. The system is powered by solar energy to ensure uninterrupted operation and real-time alerts."
  },
  {
    q: "How does the automatic blockage cleaning work?",
    a: "The system uses smart sensors to detect blockages. Once detected, a mechanical cleaning mechanism is triggered automatically, reducing the need for manual intervention and improving safety."
  },
  {
    q: "What sensors are used in the system?",
    a: "The system uses ultrasonic sensors for water level detection, gas sensors for harmful gas monitoring, tilt sensors for lid movement, and flow sensors to identify blockages."
  },
  {
    q: "Can the system work during rainy seasons?",
    a: "Yes, the system is specifically designed for heavy rain conditions. Solar power with battery backup ensures continuous operation even during extended cloudy or rainy periods."
  },
  {
    q: "What maintenance is required for the system?",
    a: "Minimal maintenance is required. Periodic inspection of sensors and cleaning mechanisms is sufficient, as the system is designed to be durable, weatherproof, and low-maintenance."
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-28">
      <div className="max-w-4xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-3 text-sm">
            Answers to common questions about our drainage monitoring system
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-6">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm border transition-all duration-300
                ${isOpen ? "border-emerald-500" : "border-gray-200"}`}
              >
                {/* QUESTION */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full
                      ${isOpen ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-600"}`}
                    >
                      ?
                    </div>

                    <h3 className="font-medium text-gray-900">
                      {item.q}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition
                    ${isOpen ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  >
                    {isOpen ? "−" : "+"}
                  </div>
                </button>

                {/* ANSWER */}
                {isOpen && (
                  <div className="px-6 pb-6 pl-20 text-gray-600 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
