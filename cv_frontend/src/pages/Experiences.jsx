import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BoxExperience from "../components/BoxExperience";
import SideMascotteMenu from "../components/SideMascotteMenu";

const API_URL = import.meta.env.VITE_API_URL;

export const Experiences = () => {
  const [experiencesData, setExperiencesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/experience`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => {
        setExperiencesData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement expériences :", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white bg-[url('../src/assets/images/bg.png')] bg-cover bg-center min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row justify-center items-start pt-16 lg:pt-10">
        {/* Colonne mascottes et menu latéral - Cachée sur mobile */}
        <div className="hidden lg:flex sticky top-20 w-1/4 flex-col items-center py-20 self-start h-fit">
          <SideMascotteMenu
            mascotteTop="/src/assets/images/laure1.PNG"
            mascotteBottom="/src/assets/images/laure7.PNG"
            label="Expériences"
            bgLabel="bg-[#946B47]"
            textLabel="text-white"
          />
        </div>

        {/* Titre mobile */}
        <div className="lg:hidden w-full text-center py-6">
          <h1 className="text-3xl font-bold text-[#946B47] font-josefin">
            💼 Mes Expériences
          </h1>
        </div>

        {/* Colonne principale expériences */}
        <div className="flex-1 flex flex-col items-center justify-center py-8 px-4 lg:px-2 gap-6 lg:gap-10">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#946B47]"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-2xl">
              <p className="font-bold">Erreur de chargement</p>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && experiencesData.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                Aucune expérience à afficher
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            experiencesData.map((exp, i) => (
              <BoxExperience
                key={exp._id || i}
                {...exp}
                bgColor="bg-[#946B47]/90"
                titleColor="text-white"
              />
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Experiences;
