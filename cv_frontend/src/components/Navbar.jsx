import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Vérification de la connexion
  const isAuthenticated = !!localStorage.getItem("token");

  const navLinks = [
    { path: "/accueil", label: "Accueil", color: "bg-black" },
    { path: "/formations", label: "Formations", color: "bg-[#DAB692]" },
    { path: "/experiences", label: "Expériences", color: "bg-[#946B47]" },
    { path: "/projets", label: "Projets", color: "bg-[#795A3C]" },
    { path: "/loisirs", label: "Loisirs", color: "bg-[#F9E5C6]" },
    { path: "/contact", label: "Contact", color: "bg-black" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-lg">
      {/* Image décorative en fond */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/src/assets/images/Ellipse2.png"
          alt=""
          className="absolute -top-32 w-full h-64 object-cover rotate-180 opacity-30 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="relative flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
        {/* Logo/Titre - Visible sur mobile */}
        <Link to="/accueil" className="flex items-center md:hidden">
          <span className="text-xl font-bold text-[#795A3C] font-josefin">
            Laure Lavie
          </span>
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex gap-2 lg:gap-4 items-center mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-xl px-3 lg:px-6 py-2 text-sm lg:text-base font-bold shadow-md transition-all hover:scale-105 font-josefin
                ${
                  location.pathname === link.path
                    ? "bg-[#436F59] text-white ring-2 ring-[#436F59] ring-offset-2"
                    : `${link.color} ${
                        link.color.includes("black")
                          ? "text-white"
                          : "text-black"
                      }`
                }
              `}
            >
              {link.label}
            </Link>
          ))}
          {/* Onglet ADMIN dynamique */}
          <Link
            to="/admin"
            className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all font-josefin ${
              location.pathname === "/admin"
                ? "bg-red-600 text-white border-red-600"
                : "border-red-500 text-red-500 hover:bg-red-50"
            }`}
          >
            Admin ⚙️
          </Link>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="ml-2 p-2 text-gray-500 hover:text-red-600 transition-colors"
              title="Déconnexion"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Ref-logout-icon-path-or-simple-text" />
                <span>🚪</span>
              </svg>
            </button>
          )}
        </div>

        {/* Burger menu mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded hover:bg-[#F9E5C6] transition"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <span
            className={`w-6 h-0.5 bg-[#795A3C] rounded transition-all ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-[#795A3C] rounded transition-all ${
              open ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-[#795A3C] rounded transition-all ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Menu mobile - Slide down */}
      <div
        className={`md:hidden bg-white/98 backdrop-blur-sm shadow-lg overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`w-full text-center py-3 font-bold rounded-xl transition-all font-josefin ${
                location.pathname === link.path
                  ? "bg-[#436F59] text-white"
                  : `${link.color} ${
                      link.color.includes("black") ? "text-white" : "text-black"
                    }`
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
