import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

export default function Contact() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userName, email, message);
    const response = await fetch(`${API_URL}/contact/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, userName, message }),
    });
    const data = response.json();
    if (response.ok) {
      alert("Votre message a été envoyé, Merci beaucoup.");
      navigate("/accueil");
    }
    console.log(data);
  };
  return (
    <div className="bg-white bg-[url('../src/assets/images/bg.png')] bg-cover bg-bottom-right min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-center pt-10">
        <RegisterForm
          onChangeUsername={(e) => setUsername(e.target.value)}
          onChangeEmail={(e) => setEmail(e.target.value)}
          onChangeMessage={(e) => setMessage(e.target.value)}
          handleSubmit={handleSubmit}
        />
      </div>
      <Footer />
    </div>
  );
}
