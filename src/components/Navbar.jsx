import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition
     ${isActive ? "text-emerald-400" : "text-white"}
     after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-emerald-400
     after:transition-all after:duration-300
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <h1 className="text-xl font-bold text-white">
            Solar<span className="text-emerald-400">Drainage</span>
          </h1>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/services" className={linkClass}>Services</NavLink>
            <NavLink to="/live-status" className={linkClass}>Live Status</NavLink>
            <NavLink to="/team" className={linkClass}>Team</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <NavLink onClick={() => setOpen(false)} to="/" className={linkClass}>Home</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about" className={linkClass}>About</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/services" className={linkClass}>Services</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/live-status" className={linkClass}>Live Status</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/team" className={linkClass}>Team</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact" className={linkClass}>Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
