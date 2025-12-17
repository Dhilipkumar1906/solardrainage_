import { useState } from "react";

const teamData = [
  {
    name: "Daniel Chen",
    role: "Marketing Specialist",
    desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Olivia Thompson",
    role: "Lead Developer",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
  {
    name: "Jason Parker",
    role: "UI/UX Designer",
    desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni.",
    img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
  },
  {
    name: "Marcus Wilson",
    role: "Chief Technology Officer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
];

export default function TeamSection() {
  const [active, setActive] = useState(1);

  return (
    <section id="team" className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900">Team</h2>
          <div className="w-14 h-[3px] bg-emerald-500 mx-auto mt-3 rounded-full" />
          <p className="text-sm text-gray-500 mt-4">
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
          </p>
        </div>

        {/* TEAM CARDS */}
        <div className="relative">
          {/* LEFT ARROW */}
          <button className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-emerald-500 text-white rounded-full items-center justify-center">
            ‹
          </button>

          {/* RIGHT ARROW */}
          <button className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-emerald-500 text-white rounded-full items-center justify-center">
            ›
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg text-center overflow-hidden"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">
                  <h3 className="font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-3 mt-12">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-2.5 rounded-full transition-all
                ${
                  active === i
                    ? "w-8 bg-emerald-500"
                    : "w-2.5 bg-emerald-200"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
