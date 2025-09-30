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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${API_URL}/experience`).then((res) => res.json()),
      fetch(`${API_URL}/formation`).then((res) => res.json()),
      fetch(`${API_URL}/projet`).then((res) => res.json()),
    ])
      .then(([exp, form, proj]) => {
        setExperiences(exp);
        setFormations(form);
        setProjets(proj);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleReset = () => {
    setSearch("");
    setResults(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const keyword = search.trim().toLowerCase();

    const expResults = experiences.filter((exp) =>
      [exp.poste, exp.entreprise, exp.secteur, exp.description, exp.motsCles]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );

    const formResults = formations.filter((form) =>
      [form.nom, form.ecole, form.domaine, form.description, form.motsCles]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );

    const projResults = projets.filter((proj) =>
      [proj.nom, proj.domaine, proj.competence, proj.description, proj.motsCles]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );

    setResults({
      experiences: expResults,
      formations: formResults,
      projets: projResults,
    });
  };

  return (
    <div className="bg-white bg-[url('../src/assets/images/bg.png')] bg-cover bg-center min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section avec recherche */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 mt-16">
        {/* Titre de bienvenue */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-[#795A3C] mb-4 font-josefin">
            Bienvenue sur mon Portfolio
          </h1>
          <p className="text-lg md:text-xl text-[#946B47] font-josefin">
            Découvrez mes compétences, expériences et projets
          </p>
        </div>

        {/* Barre de recherche */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl relative mb-6"
        >
          <input
            type="text"
            placeholder="Recherchez une compétence, un projet, une expérience..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-3xl px-6 md:px-12 py-4 md:py-5 bg-[#DAB692] text-[#795A3C] text-base md:text-xl shadow-2xl text-center font-josefin focus:outline-none focus:ring-4 focus:ring-[#946B47] placeholder-[#795A3C]/60"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
            aria-label="Rechercher"
          >
            <img
              src="/src/assets/images/loupe.png"
              alt=""
              className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg"
            />
          </button>
        </form>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-5">
          <button
            onClick={handleReset}
            className="w-full sm:w-auto rounded-2xl px-6 md:px-8 py-3 bg-[#946B47] text-white text-base md:text-lg font-bold shadow-xl hover:bg-[#795A3C] transition-colors"
          >
            🔄 Réinitialiser
          </button>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto rounded-2xl px-6 md:px-8 py-3 bg-black text-[#F9E5C6] text-base md:text-lg font-bold shadow-xl hover:bg-[#795A3C] transition-colors"
          >
            🔍 Lancer la recherche
          </button>
        </div>

        {/* Statistiques rapides */}
        {!results && !loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-4xl">
            <div className="bg-[#F9E5C6] rounded-2xl p-4 md:p-6 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-[#795A3C]">
                {experiences.length}
              </div>
              <div className="text-sm md:text-base text-[#946B47] mt-2 font-semibold">
                Expériences
              </div>
            </div>
            <div className="bg-[#DAB692] rounded-2xl p-4 md:p-6 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-[#795A3C]">
                {formations.length}
              </div>
              <div className="text-sm md:text-base text-[#946B47] mt-2 font-semibold">
                Formations
              </div>
            </div>
            <div className="bg-[#946B47] rounded-2xl p-4 md:p-6 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white">
                {projets.length}
              </div>
              <div className="text-sm md:text-base text-[#F9E5C6] mt-2 font-semibold">
                Projets
              </div>
            </div>
            <div className="bg-[#795A3C] rounded-2xl p-4 md:p-6 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white">
                {experiences.length + formations.length + projets.length}
              </div>
              <div className="text-sm md:text-base text-[#F9E5C6] mt-2 font-semibold">
                Total
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Résultats de recherche */}
      {results && (
        <div className="px-4 py-8 mb-10 flex flex-col items-center bg-white/80 mx-4 md:mx-20 rounded-3xl shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#795A3C] mb-6 font-josefin">
            🎯 Résultats pour "{search}"
          </h2>

          <div className="w-full max-w-6xl flex flex-col gap-6">
            {/* Expériences */}
            {results.experiences.length > 0 && (
              <div className="bg-[#946B47]/10 rounded-2xl p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold text-[#946B47] mb-4 font-josefin">
                  💼 Expériences ({results.experiences.length})
                </h3>
                <ul className="space-y-3">
                  {results.experiences.map((exp, i) => (
                    <li key={i} className="bg-white rounded-lg p-4 shadow">
                      <p className="font-bold text-[#795A3C] text-base md:text-lg">
                        {exp.poste}
                      </p>
                      <p className="text-sm md:text-base text-gray-600">
                        {exp.entreprise} {exp.dateDebut && `• ${exp.dateDebut}`}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Formations */}
            {results.formations.length > 0 && (
              <div className="bg-[#DAB692]/10 rounded-2xl p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold text-[#795A3C] mb-4 font-josefin">
                  🎓 Formations ({results.formations.length})
                </h3>
                <ul className="space-y-3">
                  {results.formations.map((form, i) => (
                    <li key={i} className="bg-white rounded-lg p-4 shadow">
                      <p className="font-bold text-[#795A3C] text-base md:text-lg">
                        {form.nom}
                      </p>
                      <p className="text-sm md:text-base text-gray-600">
                        {form.ecole} {form.dateDebut && `• ${form.dateDebut}`}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Projets */}
            {results.projets.length > 0 && (
              <div className="bg-[#795A3C]/10 rounded-2xl p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold text-[#795A3C] mb-4 font-josefin">
                  🚀 Projets ({results.projets.length})
                </h3>
                <ul className="space-y-3">
                  {results.projets.map((proj, i) => (
                    <li key={i} className="bg-white rounded-lg p-4 shadow">
                      <p className="font-bold text-[#795A3C] text-base md:text-lg">
                        {proj.nom}
                      </p>
                      <p className="text-sm md:text-base text-gray-600">
                        {proj.domaine} {proj.dateDebut && `• ${proj.dateDebut}`}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Aucun résultat */}
            {results.experiences.length === 0 &&
              results.formations.length === 0 &&
              results.projets.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">😔</div>
                  <p className="text-xl text-[#795A3C] font-bold">
                    Aucun résultat trouvé
                  </p>
                  <p className="text-gray-600 mt-2">
                    Essayez avec d'autres mots-clés
                  </p>
                </div>
              )}
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#795A3C]"></div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Accueil;
