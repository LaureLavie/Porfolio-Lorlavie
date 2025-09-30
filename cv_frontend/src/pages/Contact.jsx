import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

export default function Contact() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/contact/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, message }),
      });

      if (response.ok) {
        alert("✅ Votre message a été envoyé avec succès ! Merci beaucoup.");
        navigate("/accueil");
      } else {
        setError("Erreur lors de l'envoi du message. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur réseau. Veuillez vérifier votre connexion.");
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
          className="w-full max-w-lg flex flex-col gap-6 bg-[#DAB692] rounded-3xl p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(90,70,50,0.25)] font-josefin"
        >
          <h1 className="text-center text-2xl md:text-3xl text-[#795A3C] font-bold">
            📬 Contactez-Moi
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-[#795A3C] font-semibold text-sm"
            >
              Votre nom
            </label>
            <input
              id="username"
              required
              placeholder="Entrez votre nom..."
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
              Votre email
            </label>
            <input
              id="email"
              required
              placeholder="Entrez votre email..."
              className="rounded-2xl px-6 md:px-8 py-3 md:py-4 bg-[#795A3C] text-[#F9E5C6] text-lg md:text-xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none focus:ring-2 focus:ring-[#946B47] placeholder-[#F9E5C6]/70 text-center"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-[#795A3C] font-semibold text-sm"
            >
              Votre message
            </label>
            <textarea
              id="message"
              required
              rows={8}
              placeholder="Entrez votre message..."
              className="rounded-2xl px-6 md:px-8 py-3 md:py-4 bg-[#795A3C] text-[#F9E5C6] text-lg md:text-xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none focus:ring-2 focus:ring-[#946B47] placeholder-[#F9E5C6]/70 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-black text-[#F9E5C6] text-lg md:text-xl font-bold px-8 py-3 md:py-4 mt-2 shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] hover:bg-[#795A3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "📤 Envoi en cours..." : "📨 Envoyer le Message"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
