import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("home");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = (section) => {
    // 🔥 LIVE STATUS → ROUTE
    if (section === "live") {
      navigate("/live-status");
      setActive("live");
      return;
    }

    // 🔥 HOME PAGE SECTIONS
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        section === "home"
          ? window.scrollTo({ top: 0, behavior: "smooth" })
          : scrollTo(section);
      }, 200);
    } else {
      section === "home"
        ? window.scrollTo({ top: 0, behavior: "smooth" })
        : scrollTo(section);
    }
  };

  // 🔥 SCROLL SPY (only on home page)
  useEffect(() => {
    if (location.pathname !== "/") {
      setActive("live");
      return;
    }

    const onScroll = () => {
      const y = window.scrollY;
      const sections = [
        { id: "contact", key: "contact" },
        { id: "team", key: "team" },
        { id: "services", key: "services" },
        { id: "about", key: "about" },
      ];

      for (let sec of sections) {
        const el = document.getElementById(sec.id);
        if (el && y >= el.offsetTop - 160) {
          setActive(sec.key);
          return;
        }
      }

      setActive("home");
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const NavItem = ({ label, section }) => (
    <button
      onClick={() => handleClick(section)}
      className="relative group text-sm font-medium text-white"
    >
      {label}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-emerald-400 transition-all duration-300
        ${
          active === section
            ? "w-full"
            : "w-0 group-hover:w-full"
        }`}
      />
    </button>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="bg-black/60 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1
            onClick={() => handleClick("home")}
            className="text-white text-2xl font-semibold cursor-pointer"
          >
            SolarDrainage
          </h1>

          <nav className="hidden md:flex gap-10">
            <NavItem label="Home" section="home" />
            <NavItem label="About" section="about" />
            <NavItem label="Services" section="services" />
            <NavItem label="Live Status" section="live" />
            <NavItem label="Team" section="team" />
            <NavItem label="Contact" section="contact" />
          </nav>
        </div>
      </div>
    </header>
  );
}
