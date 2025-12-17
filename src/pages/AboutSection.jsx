import { useEffect, useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-show");
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="bg-white pt-28 min-h-screen"
    >
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14
                   opacity-0 translate-y-12 transition-all duration-1000"
      >
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Drainage Monitoring System
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            We design sustainable urban drainage solutions powered by solar
            energy. Our system detects blockages, monitors water levels, and
            alerts municipal workers in real time for faster, safer maintenance.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            We aim to prevent urban flooding and improve drainage safety by
            combining renewable energy with smart sensors, ensuring cleaner and
            more efficient city networks.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            Through innovative design and collaboration with local authorities,
            we’ve developed a system that reduces manual inspections, improves
            worker safety, and minimizes environmental hazards. Our technology
            ensures smart, eco-friendly drainage management for modern cities.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-8 border-t pt-8">
            <div>
              <h3 className="text-3xl font-semibold text-emerald-500">1+</h3>
              <p className="text-sm text-gray-500 mt-1">
                Research & Development
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-emerald-500">3+</h3>
              <p className="text-sm text-gray-500 mt-1">
                Prototypes Successfully Tested
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-emerald-500">5</h3>
              <p className="text-sm text-gray-500 mt-1">
                Team Members
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5 mt-10">
            <button className="bg-emerald-500 hover:bg-emerald-600 transition text-white px-8 py-3 rounded-full font-medium">
              Discover Our Work
            </button>

            <button className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 transition px-8 py-3 rounded-full font-medium">
              Meet Our Team
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src="/images/about-square-8.webp"
            alt="Team Collaboration"
            className="rounded-2xl shadow-xl w-full object-cover"
          />

          {/* AWARD BADGE */}
          <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg px-5 py-4 flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full text-xl">
              🏆
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 leading-tight">
                Excellence Award
              </h4>
              <p className="text-sm text-gray-500">
                Digital Innovation 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
