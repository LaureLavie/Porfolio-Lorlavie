import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/admin");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Identifiants incorrects");
      }
    } catch (error) {
      console.error("Erreur login:", error);
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white bg-[url('../src/assets/images/bg.png')] bg-cover bg-center min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center items-center px-4 py-8 mt-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-6 bg-[#DAB692] rounded-3xl p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(90,70,50,0.25)] font-josefin"
        >
          <h1 className="text-center text-2xl md:text-3xl text-[#795A3C] font-bold">
            🔐 Connexion
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[#795A3C] font-semibold text-sm"
            >
              Email
            </label>
            <input
              id="email"
              required
              placeholder="Email..."
              className="rounded-2xl px-6 md:px-8 py-3 md:py-4 bg-[#795A3C] text-[#F9E5C6] text-lg md:text-xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none focus:ring-2 focus:ring-[#946B47] placeholder-[#F9E5C6]/70 text-center"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-[#795A3C] font-semibold text-sm"
            >
              Mot de passe
            </label>
            <input
              id="password"
              required
              placeholder="Mot de Passe..."
              className="rounded-2xl px-6 md:px-8 py-3 md:py-4 bg-[#795A3C] text-[#F9E5C6] text-lg md:text-xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none focus:ring-2 focus:ring-[#946B47] placeholder-[#F9E5C6]/70 text-center"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-black text-[#F9E5C6] text-lg md:text-xl font-bold px-8 py-3 md:py-4 mt-2 shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] hover:bg-[#795A3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Connexion..." : "✅ Se connecter"}
          </button>

          <p className="text-center text-[#795A3C] text-sm">
            Pas encore de compte ?{" "}
            <Link
              to="/register"
              className="font-bold underline hover:text-[#946B47]"
            >
              S'inscrire
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}
