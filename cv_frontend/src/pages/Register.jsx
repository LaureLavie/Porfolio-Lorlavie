import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert(
          "✅ Inscription réussie ! Vous pouvez maintenant vous connecter."
        );
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur register:", error);
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
            📝 S'inscrire
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-[#795A3C] font-semibold text-sm"
            >
              Nom d'utilisateur
            </label>
            <input
              id="username"
              required
              placeholder="Identifiant..."
              className="rounded-2xl px-6 md:px-8 py-3 md:py-4 bg-[#795A3C] text-[#F9E5C6] text-lg md:text-xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none focus:ring-2 focus:ring-[#946B47] placeholder-[#F9E5C6]/70 text-center"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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
              placeholder="Mot de passe..."
              className="rounded-2xl px-6 md:px-8 py-3 md:py-4 bg-[#795A3C] text-[#F9E5C6] text-lg md:text-xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none focus:ring-2 focus:ring-[#946B47] placeholder-[#F9E5C6]/70 text-center"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-[#795A3C] font-semibold text-sm"
            >
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              required
              placeholder="Confirmer..."
              className="rounded-2xl px-6 md:px-8 py-3 md:py-4 bg-[#795A3C] text-[#F9E5C6] text-lg md:text-xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none focus:ring-2 focus:ring-[#946B47] placeholder-[#F9E5C6]/70 text-center"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-black text-[#F9E5C6] text-lg md:text-xl font-bold px-8 py-3 md:py-4 mt-2 shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] hover:bg-[#795A3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Inscription..." : "✅ S'inscrire"}
          </button>

          <p className="text-center text-[#795A3C] text-sm">
            Déjà un compte ?{" "}
            <Link
              to="/login"
              className="font-bold underline hover:text-[#946B47]"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}
