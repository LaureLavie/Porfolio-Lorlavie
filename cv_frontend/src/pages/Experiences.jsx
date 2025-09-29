import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BoxExperience from "../components/BoxExperience";
import SideMascotteMenu from "../components/SideMascotteMenu";

const API_URL = import.meta.env.VITE_API_URL;

const Experiences = () => {
  const [experiencesData, setExperiencesData] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/experiences`)
      .then((res) => res.json())
      .then((data) => setExperiencesData(data))
      .catch((err) => console.error("Erreur chargement expériences :", err));
  }, []);

  return (
    <div className="bg-white bg-[url('../src/assets/images/bg.png')] bg-cover bg-bottom-right min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-start pt-10">
        {/* Colonne mascottes et menu latéral */}
        <div className="sticky top-20 md:w-1/4 flex flex-col items-center py-20 self-start h-fit">
          <SideMascotteMenu
            mascotteTop="/src/assets/images/laure1.PNG"
            mascotteBottom="/src/assets/images/laure7.PNG"
            label="Expériences"
            bgLabel="bg-[#946B47]"
            textLabel="text-white"
          />
        </div>
        {/* Colonne principale expériences */}
        <div className="flex-1 flex flex-col items-center justify-center py-8 px-2 md:px-0 gap-10">
          {experiencesData.map((exp, i) => (
            <BoxExperience
              key={i}
              {...exp}
              bgColor="bg-[#946B47]/80"
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
