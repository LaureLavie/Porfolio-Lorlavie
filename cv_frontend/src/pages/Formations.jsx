import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardFormation from "../components/CardFormation";
import SideMascotteMenu from "../components/SideMascotteMenu";

const API_URL = import.meta.env.VITE_API_URL;

const Formations = () => {
  const [formationsData, setFormationsData] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/json/formations`)
      .then((res) => res.json())
      .then((data) => setFormationsData(data))
      .catch((err) => console.error("Erreur chargement formations :", err));
  }, []);

  return (
    <div className="bg-white bg-[url('../src/assets/images/bg.png')] bg-cover bg-bottom-right min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row justify-center md:items-center items-start pt-10">
        {/* Colonne mascottes et menu latéral - mobile/tablette: top center; desktop: sticky left */}
        <div className="w-full md:w-1/4 flex flex-col items-center py-6 md:py-10 md:self-start md:sticky md:top-20">
          <SideMascotteMenu
            mascotteTop="/src/assets/images/laure3.PNG"
            mascotteBottom="/src/assets/images/laure8.PNG"
            label="Formations"
            bgLabel="bg-[#DAB692]"
            textLabel="text-black"
          />
        </div>

        {/* Colonne principale formations */}
        <div className="flex-1 flex flex-col items-center justify-center py-8 px-2 md:px-0">
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {formationsData.map((formation, i) => (
              <CardFormation key={i} {...formation} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Formations;
