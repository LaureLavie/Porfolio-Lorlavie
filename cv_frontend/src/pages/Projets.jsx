import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BoxProjet from "../components/BoxProjet";
import SideMascotteMenu from "../components/SideMascotteMenu";

const API_URL = import.meta.env.VITE_API_URL;

const Projets = () => {
  const [projetsData, setProjetsData] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/json/projets`)
      .then((res) => res.json())
      .then((data) => setProjetsData(data))
      .catch((err) => console.error("Erreur chargement projets :", err));
  }, []);

  return (
    <div className="bg-white bg-[url('../src/assets/images/bg.png')] bg-cover bg-bottom-right min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row justify-center md:items-center items-start pt-5">
        {/* Colonne mascottes et menu latéral - mobile/tablette: top center; desktop: sticky left */}
        <div className="w-full md:w-1/4 flex flex-col items-center py-6 md:py-10 md:self-start md:sticky md:top-20">
          <SideMascotteMenu
            mascotteTop="/src/assets/images/laure6.PNG"
            mascotteBottom="/src/assets/images/laure5.PNG"
            label="Projets"
            bgLabel="bg-[#795A3C]"
            textLabel="text-white"
          />
        </div>
        {/* Colonne principale projet */}
        <div className="flex-1 flex flex-col items-center justify-center py-8 px-2 md:px-0 gap-10">
          {projetsData.map((projet, i) => (
            <BoxProjet key={i} {...projet} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Projets;
