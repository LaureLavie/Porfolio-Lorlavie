import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

const Accueil = () => {
  const [search, setSearch] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [formations, setFormations] = useState([]);
  const [projets, setProjets] = useState([]);
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/experiences`)
      .then((res) => res.json())
      .then(setExperiences);
    fetch(`${API_URL}/formations`)
      .then((res) => res.json())
      .then(setFormations);
    fetch(`${API_URL}/projets`)
      .then((res) => res.json())
      .then(setProjets);
  });

  const handleReset = () => {
    setSearch("");
    setResults(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const keyword = search.trim().toLowerCase();

    const expResults = experiences.filter((exp) =>
      (exp.motsCles || []).some((mot) => mot.toLowerCase().includes(keyword))
    );
    const formResults = formations.filter((form) =>
      (form.motsCles || []).some((mot) => mot.toLowerCase().includes(keyword))
    );
    const projResults = projets.filter((proj) =>
      (proj.motsCles || []).some((mot) => mot.toLowerCase().includes(keyword))
    );

    setResults({
      experiences: expResults,
      formations: formResults,
      projets: projResults,
    });
  };
  return (
    <div className="bg-white bg-[url('../src/assets/images/bg.png')] bg-cover bg-bottom-right min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center items-center">
        <input
          type="text"
          placeholder="Que recherchez-vous ?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-2xl px-8 py-4 bg-[#8B6A4F] text-white text-xl shadow-xl w-[600px] text-center font-sans"
        />
        <img
          src="/src/assets/images/loupe.png"
          alt="loupe"
          className="absolute right-150 top-60 translate-y-1/2 w-30 drop-shadow-lg"
        />
      </div>
      <div className="flex justify-center items-center gap-5">
        <button
          onClick={handleReset}
          className="cursor-pointer rounded-2xl px-8 py-2 bg-black text-[#F9E5C6] text-lg mt-0 shadow-xl"
        >
          Réinitialiser la recherche
        </button>
        <button
          onClick={handleSubmit}
          className="cursor-pointer rounded-2xl px-8 py-2 bg-black text-[#F9E5C6] text-lg mt-0 shadow-xl"
        >
          Lancer la recherche
        </button>
      </div>

      {/* Résultats */}
      {results && (
        <div className="mt-10 mb-10 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-[#795A3C] mb-4">
            Résultats de votre recherche
          </h2>
          <div className="w-full max-w-6xl flex flex-col gap-8">
            {/* experiences */}
            {results.experiences.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#946B47] mb-2">
                  Expériences :
                </h3>
                <ul className="list-disc ml-6">
                  {results.experiences.map((exp, i) => (
                    <li key={i}>
                      <p className="font-bold text-black">
                        {exp.poste} avec {exp.entreprise}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* formations */}
            {results.formations.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#946B47] mb-2">
                  Formations :
                </h3>
                <ul className="list-disc ml-6">
                  {results.formations.map((form, i) => (
                    <li key={i}>
                      <p className="font-bold text-black">
                        {form.nom} avec {form.ecole}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* projets */}
            {results.projets.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#946B47] mb-2">
                  Projets :
                </h3>
                <ul className="list-disc ml-6">
                  {results.projets.map((proj, i) => (
                    <li key={i}>
                      <p className="font-bold text-black">{proj.nom}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* aucun résultat */}
            {results.experiences.length === 0 &&
              results.formations.length === 0 &&
              results.projets.length === 0 && (
                <p className="text-black">Aucun</p>
              )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Accueil;
