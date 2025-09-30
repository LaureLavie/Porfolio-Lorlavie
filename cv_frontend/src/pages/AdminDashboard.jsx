import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardFormation from "../components/CardFormation";
import BoxExperience from "../components/BoxExperience";
import BoxProjet from "../components/BoxProjet";
import CardLoisir from "../components/CardLoisir";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  // Formations
  const [formations, setFormations] = useState([]);
  const [showFormFormation, setShowFormFormation] = useState(false);
  const [editFormation, setEditFormation] = useState(null);

  // Expériences
  const [experiences, setExperiences] = useState([]);
  const [showFormExperience, setShowFormExperience] = useState(false);
  const [editExperience, setEditExperience] = useState(null);

  // Projets
  const [projets, setProjets] = useState([]);
  const [showFormProjet, setShowFormProjet] = useState(false);
  const [editProjet, setEditProjet] = useState(null);

  //Loisirs
  const [loisirs, setLoisirs] = useState([]);
  const [showFormLoisir, setShowFormLoisir] = useState(false);
  const [editLoisir, setEditLoisir] = useState(null);

  // Dashboard data
  const [dashboardData, setDashboardData] = useState("");

  // Chargement initial
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/admin/dashboard`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setDashboardData(data))
      .catch((error) => console.error("Erreur chargement Dashboard", error));
  }, []);

  // Charger les listes
  useEffect(() => {
    fetch(`${API_URL}/formation`)
      .then((res) => res.json())
      .then(setFormations);
    fetch(`${API_URL}/experience`)
      .then((res) => res.json())
      .then(setExperiences);
    fetch(`${API_URL}/projet`)
      .then((res) => res.json())
      .then(setProjets);
    fetch(`${API_URL}/loisir`)
      .then((res) => res.json())
      .then(setLoisirs);
  }, []);

  // Formations CRUD
  const handleSaveFormation = (formation) => {
    const method = formation._id ? "PUT" : "POST";
    const url = formation._id
      ? `${API_URL}/formation/${formation._id}`
      : `${API_URL}/formation`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formation),
    })
      .then((res) => res.json())
      .then(() => {
        setShowFormFormation(false);
        setEditFormation(null);
        fetch(`${API_URL}/formation`)
          .then((res) => res.json())
          .then(setFormations);
      });
  };
  const handleDeleteFormation = (id) => {
    if (window.confirm("Supprimer cette formation ?")) {
      fetch(`${API_URL}/formation/${id}`, { method: "DELETE" }).then(() =>
        setFormations(formations.filter((f) => f._id !== id))
      );
    }
  };

  // experiences CRUD
  const handleSaveExperience = (experience) => {
    const method = experience._id ? "PUT" : "POST";
    const url = experience._id
      ? `${API_URL}/experience/${experience._id}`
      : `${API_URL}/experience`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(experience),
    })
      .then((res) => res.json())
      .then(() => {
        setShowFormExperience(false);
        setEditExperience(null);
        fetch(`${API_URL}/experience`)
          .then((res) => res.json())
          .then(setExperiences);
      });
  };
  const handleDeleteExperience = (id) => {
    if (window.confirm("Supprimer cette expérience ?")) {
      fetch(`${API_URL}/experience/${id}`, { method: "DELETE" }).then(() =>
        setExperiences(experiences.filter((e) => e._id !== id))
      );
    }
  };

  // Projets CRUD
  const handleSaveProjet = (projet) => {
    const method = projet._id ? "PUT" : "POST";
    const url = projet._id
      ? `${API_URL}/projet/${projet._id}`
      : `${API_URL}/projet`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projet),
    })
      .then((res) => res.json())
      .then(() => {
        setShowFormProjet(false);
        setEditProjet(null);
        fetch(`${API_URL}/projet`)
          .then((res) => res.json())
          .then(setProjets);
      });
  };
  const handleDeleteProjet = (id) => {
    if (window.confirm("Supprimer ce projet ?")) {
      fetch(`${API_URL}/projet/${id}`, { method: "DELETE" }).then(() =>
        setProjets(projets.filter((p) => p._id !== id))
      );
    }
  };

  // Loisirs CRUD
  const handleSaveLoisir = (loisir) => {
    const method = loisir._id ? "PUT" : "POST";
    const url = loisir._id
      ? `${API_URL}/loisir/${loisir._id}`
      : `${API_URL}/loisir`;
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loisir),
    })
      .then((res) => res.json())
      .then(() => {
        setShowFormLoisir(false);
        setEditLoisir(null);
        fetch(`${API_URL}/loisir`)
          .then((res) => res.json())
          .then(setLoisirs);
      });
  };
  const handleDeleteLoisir = (id) => {
    if (window.confirm("Supprimer ce loisir ?")) {
      fetch(`${API_URL}/loisir/${id}`, { method: "DELETE" }).then(() =>
        setLoisirs(loisirs.filter((p) => p._id !== id))
      );
    }
  };

  return (
    <div className="bg-white bg-[url('../src/assets/images/bg.png')] bg-cover bg-bottom-right min-h-screen flex flex-col">
      <Navbar />

      {/* GRID 4 COLONNES */}
      <div className="flex-1 flex justify-center items-start px-4 pt-30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-7xl">
          {/* --- Loisirs --- */}
          <div className="bg-[#DAB692]/70 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-4">Loisirs</h2>
            <button
              className="mb-4 bg-black text-[#DAB692] px-4 py-2 rounded"
              onClick={() => {
                setEditLoisir(null);
                setShowFormLoisir(true);
              }}
            >
              Ajouter un loisir
            </button>
            <ul className="w-full">
              {loisirs.map((e) => (
                <li
                  key={e._id}
                  className="flex flex-col justify-center items-center bg-[#fff]/80 rounded-lg p-3 mb-2"
                >
                  <p className="text-[#795A3C] font-semibold">{e.nom}</p>

                  <div>
                    <button
                      className="mr-2 bg-[#795A3C] text-white px-2 py-1 rounded"
                      onClick={() => {
                        setEditLoisir(e);
                        setShowFormLoisir(true);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteLoisir(e._id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* --- Formations --- */}
          <div className="bg-[#DAB692]/70 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Formations</h2>
            <button
              className="mb-4 bg-black text-[#DAB692] px-4 py-2 rounded"
              onClick={() => {
                setEditFormation(null);
                setShowFormFormation(true);
              }}
            >
              Ajouter une formation
            </button>
            <ul className="w-full">
              {formations.map((f) => (
                <li
                  key={f._id}
                  className="flex flex-col justify-between items-center bg-[#fff]/80 rounded-lg p-3 mb-2 text-center"
                >
                  <span className="text-[#795A3C] font-semibold">
                    {f.nom} - {f.ecole}
                  </span>
                  <div>
                    <button
                      className="mr-2 bg-[#795A3C] text-white px-2 py-1 rounded"
                      onClick={() => {
                        setEditFormation(f);
                        setShowFormFormation(true);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteFormation(f._id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Expériences --- */}
          <div className="bg-[#DAB692]/70 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Expériences</h2>
            <button
              className="mb-4 bg-black text-[#DAB692] px-4 py-2 rounded"
              onClick={() => {
                setEditExperience(null);
                setShowFormExperience(true);
              }}
            >
              Ajouter une expérience
            </button>
            <ul className="w-full">
              {experiences.map((e) => (
                <li
                  key={e._id}
                  className="flex flex-col justify-between items-center bg-[#fff]/80 rounded-lg text-center p-3 mb-2"
                >
                  <span className="text-[#795A3C] font-semibold">
                    {e.poste} - {e.entreprise}
                  </span>
                  <div>
                    <button
                      className="mr-2 bg-[#795A3C] text-white px-2 py-1 rounded"
                      onClick={() => {
                        setEditExperience(e);
                        setShowFormExperience(true);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteExperience(e._id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Projets --- */}
          <div className="bg-[#DAB692]/70 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Projets</h2>
            <button
              className="mb-4 bg-black text-[#DAB692] px-4 py-2 rounded"
              onClick={() => {
                setEditProjet(null);
                setShowFormProjet(true);
              }}
            >
              Ajouter un projet
            </button>
            <ul className="w-full">
              {projets.map((p) => (
                <li
                  key={p._id}
                  className="flex flex-col justify-between items-center bg-[#fff]/80 rounded-lg p-3 mb-2 text-center"
                >
                  <span className="text-[#795A3C] font-semibold">{p.nom}</span>
                  <div>
                    <button
                      className="mr-2 bg-[#795A3C] text-white px-2 py-1 rounded"
                      onClick={() => {
                        setEditProjet(p);
                        setShowFormProjet(true);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteProjet(p._id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* POPUPS */}
      {showFormFormation && (
        <FormFormation
          formation={editFormation}
          onSave={handleSaveFormation}
          onCancel={() => setShowFormFormation(false)}
        />
      )}
      {showFormExperience && (
        <FormExperience
          experience={editExperience}
          onSave={handleSaveExperience}
          onCancel={() => setShowFormExperience(false)}
        />
      )}
      {showFormProjet && (
        <FormProjet
          projet={editProjet}
          onSave={handleSaveProjet}
          onCancel={() => setShowFormProjet(false)}
        />
      )}
      {showFormLoisir && (
        <FormLoisir
          loisir={editLoisir}
          onSave={handleSaveLoisir}
          onCancel={() => setShowFormLoisir(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
