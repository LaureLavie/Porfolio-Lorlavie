import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardLoisir from "../components/CardLoisir";
import SideMascotteMenu from "../components/SideMascotteMenu";

const API_URL = import.meta.env.VITE_API_URL;

const Loisirs = () => {
  const [loisirsData, setLoisirsData] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/json/loisirs`)
      .then((res) => res.json())
      .then((data) => setLoisirsData(data))
      .catch((err) => console.error("Erreur chargement loisirs :", err));
  }, []);
  return (
    <div className="bg-white bg-[url('../src/assets/images/bg.png')] bg-cover bg-bottom-right min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row justify-center md:items-center items-start pt-10">
        {/* Colonne mascottes et menu latéral - mobile/tablette: top center; desktop: sticky left */}
        <div className="w-full md:w-1/4 flex flex-col items-center py-6 md:py-10 md:self-start md:sticky md:top-20">
          <SideMascotteMenu
            mascotteTop="/src/assets/images/laure7.PNG"
            mascotteBottom="/src/assets/images/laure2.PNG"
            label="Loisirs"
            bgLabel="bg-[#F9E5C6]"
            textLabel="text-black"
          />
        </div>

        {/* Colonne principale loisirs */}
        <div className="flex-1 flex flex-col items-center justify-center py-8 px-2 md:px-0">
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loisirsData.map((loisir, i) => (
              <CardLoisir key={i} {...loisir} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Loisirs;
