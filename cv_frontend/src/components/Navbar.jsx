import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      className="fixed top-0 w-screen z-50 bg-transparent"
      style={{ overflow: "hidden" }}
    >
      {/* Image décorative en fond */}
      <img
        src="/src/assets/images/Ellipse2.png"
        alt=""
        className="absolute -top-120 pt-20 w-screen h-screen scale-x-140 rotate-180 object-contain opacity-50 pointer-events-none select-none"
        style={{
          backgroundPositionX: "20%",
          backgroundPositionY: "0%",
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <div className="relative flex justify-center items-center px-4 py-4 max-w-7xl mx-auto z-10">
        {/* Menu desktop */}
        <div className="hidden md:flex gap-4 items-center">
          <Link
            to="/accueil"
            className={`rounded-2xl px-6 py-2 text-lg font-bold shadow-lg
              ${
                location.pathname === "/accueil"
                  ? "bg-[#436F59] text-white"
                  : "bg-black text-white"
              }
            `}
          >
            Accueil
          </Link>
          <Link
            to="/formations"
            className={`rounded-2xl px-4 py-2 text-lg font-bold shadow-lg
              ${
                location.pathname === "/formations"
                  ? "bg-[#436F59] text-white"
                  : "bg-[#DAB692] text-black"
              }
            `}
          >
            Formations
          </Link>
          <Link
            to="/experiences"
            className={`rounded-2xl px-4 py-2 text-lg font-bold shadow-lg
              ${
                location.pathname === "/experiences"
                  ? "bg-[#436F59] text-white"
                  : "bg-[#946B47] text-black"
              }
            `}
          >
            Expériences
          </Link>
          <Link
            to="/projets"
            className={`rounded-2xl px-4 py-2 text-lg font-bold shadow-lg
              ${
                location.pathname === "/projets"
                  ? "bg-[#436F59] text-white"
                  : "bg-[#795A3C] text-black"
              }
            `}
          >
            Projets
          </Link>
          <Link
            to="/Loisirs"
            className={`rounded-2xl px-4 py-2 text-lg font-bold shadow-lg
              ${
                location.pathname === "/Loisirs"
                  ? "bg-[#436F59] text-white"
                  : "bg-[#F9E5C6] text-black"
              }
            `}
          >
            Loisirs
          </Link>
          <Link
            to="/contact"
            className={`rounded-2xl px-6 py-2 text-lg font-bold shadow-lg
              ${
                location.pathname === "/contact"
                  ? "bg-[#436F59] text-white"
                  : "bg-black text-white"
              }
            `}
          >
            Contact
          </Link>
        </div>
        {/* Burger menu mobile */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          <span className="w-8 h-1 bg-[#795A3C] rounded"></span>
          <span className="w-8 h-1 bg-[#795A3C] rounded"></span>
          <span className="w-8 h-1 bg-[#795A3C] rounded"></span>
        </button>
      </div>
      {/* Menu mobile */}
      {open && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-4 bg-white/90 shadow-lg">
          <Link
            to="/home"
            className="w-full text-center py-2 font-bold text-[#795A3C]"
            onClick={() => setOpen(false)}
          >
            Accueil
          </Link>
          <Link
            to="/formations"
            className="w-full text-center py-2 font-bold text-[#795A3C]"
            onClick={() => setOpen(false)}
          >
            Formations
          </Link>
          <Link
            to="/experiences"
            className="w-full text-center py-2 font-bold text-[#795A3C]"
            onClick={() => setOpen(false)}
          >
            Expériences
          </Link>
          <Link
            to="/projets"
            className="w-full text-center py-2 font-bold text-[#795A3C]"
            onClick={() => setOpen(false)}
          >
            Projets
          </Link>
          <Link
            to="/contact"
            className="w-full text-center py-2 font-bold text-[#795A3C]"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
