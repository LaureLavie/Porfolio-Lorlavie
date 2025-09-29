import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/accueil");
      } else {
        const error = await response.text();
        console.error("Erreur d'inscription :", error);
        alert("Erreur lors de l'inscription !");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      alert("Erreur réseau !");
    }
  };

  return (
    <div className="bg-white bg-[url('../src/assets/images/bg.png')] bg-cover bg-bottom-right min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-center pt-10">
        <AuthForm
          title={"S'inscrire"}
          onChangeUsername={(e) => setUsername(e.target.value)}
          onChangeEmail={(e) => setEmail(e.target.value)}
          onChangePassword={(e) => setPassword(e.target.value)}
          handleSubmit={handleSubmit}
          isRegister={true}
        />
      </div>
      <Footer />
    </div>
  );
}
