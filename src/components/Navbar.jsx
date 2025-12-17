import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  const scrollTo = (id) => {
    setOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const linkStyle =
    "relative px-3 py-2 text-sm font-medium text-white transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-emerald-400 after:w-0 hover:after:w-full after:transition-all";

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <h1 className="text-xl font-bold text-white">
            Solar<span className="text-emerald-400">Drainage</span>
          </h1>

          {/* DESKTOP */}
          <nav className="hidden md:flex gap-6">
            <button onClick={() => scrollTo("hero")} className={linkStyle}>Home</button>
            <button onClick={() => scrollTo("about")} className={linkStyle}>About</button>
            <button onClick={() => scrollTo("services")} className={linkStyle}>Services</button>

            <NavLink to="/live-status" className={linkStyle}>Live Status</NavLink>

            <button onClick={() => scrollTo("team")} className={linkStyle}>Team</button>
            <button onClick={() => scrollTo("contact")} className={linkStyle}>Contact</button>
          </nav>

          {/* MOBILE BUTTON */}
          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <button onClick={() => scrollTo("hero")} className={linkStyle}>Home</button>
            <button onClick={() => scrollTo("about")} className={linkStyle}>About</button>
            <button onClick={() => scrollTo("services")} className={linkStyle}>Services</button>

            <NavLink onClick={() => setOpen(false)} to="/live-status" className={linkStyle}>
              Live Status
            </NavLink>

            <button onClick={() => scrollTo("team")} className={linkStyle}>Team</button>
            <button onClick={() => scrollTo("contact")} className={linkStyle}>Contact</button>
          </div>
        </div>
      )}
    </header>
  );
}
