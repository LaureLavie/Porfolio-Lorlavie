import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormFormation from "../components/FormFormation";
import FormExperience from "../components/FormExperience";
import FormProjet from "../components/FormProjet";
import FormLoisir from "../components/FormLoisir";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [formations, setFormations] = useState([]);
  const [showFormFormation, setShowFormFormation] = useState(false);
  const [editFormation, setEditFormation] = useState(null);

  const [experiences, setExperiences] = useState([]);
  const [showFormExperience, setShowFormExperience] = useState(false);
  const [editExperience, setEditExperience] = useState(null);

  const [projets, setProjets] = useState([]);
  const [showFormProjet, setShowFormProjet] = useState(false);
  const [editProjet, setEditProjet] = useState(null);

  const [loisirs, setLoisirs] = useState([]);
  const [showFormLoisir, setShowFormLoisir] = useState(false);
  const [editLoisir, setEditLoisir] = useState(null);

  const [uploadingImage, setUploadingImage] = useState(false);

  // Vérifier l'authentification
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Charger les données
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetch(`${API_URL}/formation`)
      .then((res) => res.json())
      .then(setFormations)
      .catch(console.error);

    fetch(`${API_URL}/experience`)
      .then((res) => res.json())
      .then(setExperiences)
      .catch(console.error);

    fetch(`${API_URL}/projet`)
      .then((res) => res.json())
      .then(setProjets)
      .catch(console.error);

    fetch(`${API_URL}/loisir`)
      .then((res) => res.json())
      .then(setLoisirs)
      .catch(console.error);
  };

  // Upload d'image
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    setUploadingImage(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur upload");

      const data = await response.json();
      setUploadingImage(false);
      return data.url;
    } catch (error) {
      console.error("Erreur upload:", error);
      setUploadingImage(false);
      alert("Erreur lors de l'upload de l'image");
      return null;
    }
  };

  // Export JSON
  const handleExportJSON = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/export/json`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cv-data-${Date.now()}.json`;
      a.click();
    } catch (error) {
      console.error("Erreur export JSON:", error);
      alert("Erreur lors de l'export");
    }
  };

  // Export PDF
  const handleExportPDF = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/export/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `CV-Laure-Lavie-${Date.now()}.pdf`;
      a.click();
    } catch (error) {
      console.error("Erreur export PDF:", error);
      alert("Erreur lors de l'export PDF");
    }
  };

  // Export CSV
  const handleExportCSV = async (type) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/export/csv/${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}-${Date.now()}.csv`;
      a.click();
    } catch (error) {
      console.error("Erreur export CSV:", error);
      alert("Erreur lors de l'export CSV");
    }
  };

  // Import JSON
  const handleImportJSON = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/export/import`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Import réussi !");
        loadData();
      }
    } catch (error) {
      console.error("Erreur import:", error);
      alert("Erreur lors de l'import");
    }
  };

  // CRUD Formations
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
        loadData();
      })
      .catch(console.error);
  };

  const handleDeleteFormation = (id) => {
    if (window.confirm("Supprimer cette formation ?")) {
      fetch(`${API_URL}/formation/${id}`, { method: "DELETE" })
        .then(() => setFormations(formations.filter((f) => f._id !== id)))
        .catch(console.error);
    }
  };

  // CRUD Expériences
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
        loadData();
      })
      .catch(console.error);
  };

  const handleDeleteExperience = (id) => {
    if (window.confirm("Supprimer cette expérience ?")) {
      fetch(`${API_URL}/experience/${id}`, { method: "DELETE" })
        .then(() => setExperiences(experiences.filter((e) => e._id !== id)))
        .catch(console.error);
    }
  };

  // CRUD Projets
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
        loadData();
      })
      .catch(console.error);
  };

  const handleDeleteProjet = (id) => {
    if (window.confirm("Supprimer ce projet ?")) {
      fetch(`${API_URL}/projet/${id}`, { method: "DELETE" })
        .then(() => setProjets(projets.filter((p) => p._id !== id)))
        .catch(console.error);
    }
  };

  // CRUD Loisirs
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
        loadData();
      })
      .catch(console.error);
  };

  const handleDeleteLoisir = (id) => {
    if (window.confirm("Supprimer ce loisir ?")) {
      fetch(`${API_URL}/loisir/${id}`, { method: "DELETE" })
        .then(() => setLoisirs(loisirs.filter((l) => l._id !== id)))
        .catch(console.error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white bg-[url('../src/assets/images/bg.png')] bg-cover bg-center min-h-screen flex flex-col">
      <Navbar />

      {/* Barre d'actions Export/Import */}
      <div className="w-full bg-[#795A3C]/90 py-4 px-4 mt-16 sticky top-16 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center items-center">
          <button
            onClick={handleExportJSON}
            className="bg-[#DAB692] text-[#795A3C] px-4 py-2 rounded-lg font-semibold hover:bg-[#F9E5C6] transition text-sm md:text-base"
          >
            📥 Export JSON
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-[#DAB692] text-[#795A3C] px-4 py-2 rounded-lg font-semibold hover:bg-[#F9E5C6] transition text-sm md:text-base"
          >
            📄 Export CV PDF
          </button>
          <div className="relative">
            <button className="bg-[#DAB692] text-[#795A3C] px-4 py-2 rounded-lg font-semibold hover:bg-[#F9E5C6] transition text-sm md:text-base">
              📊 Export CSV
            </button>
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl hidden group-hover:block">
              <button
                onClick={() => handleExportCSV("experiences")}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
              >
                Expériences
              </button>
              <button
                onClick={() => handleExportCSV("formations")}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
              >
                Formations
              </button>
              <button
                onClick={() => handleExportCSV("projets")}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
              >
                Projets
              </button>
              <button
                onClick={() => handleExportCSV("loisirs")}
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-sm"
              >
                Loisirs
              </button>
            </div>
          </div>
          <label className="bg-[#946B47] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#795A3C] transition cursor-pointer text-sm md:text-base">
            📤 Import JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition text-sm md:text-base"
          >
            🚪 Déconnexion
          </button>
        </div>
      </div>

      {/* GRID 4 COLONNES - Responsive */}
      <div className="flex-1 flex justify-center items-start px-2 md:px-4 pt-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full max-w-7xl">
          {/* Loisirs */}
          <div className="bg-[#F9E5C6]/90 rounded-2xl shadow-xl p-4 md:p-6 flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#795A3C] font-josefin">
              🎨 Loisirs
            </h2>
            <button
              className="mb-4 bg-[#795A3C] text-white px-4 py-2 rounded-lg hover:bg-[#946B47] transition text-sm md:text-base w-full"
              onClick={() => {
                setEditLoisir(null);
                setShowFormLoisir(true);
              }}
            >
              ➕ Ajouter
            </button>
            <ul className="w-full space-y-2 max-h-96 overflow-y-auto">
              {loisirs.map((l) => (
                <li key={l._id} className="bg-white/80 rounded-lg p-3 shadow">
                  <p className="text-[#795A3C] font-semibold text-sm md:text-base">
                    {l.nom}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="flex-1 bg-[#795A3C] text-white px-2 py-1 rounded text-xs md:text-sm"
                      onClick={() => {
                        setEditLoisir(l);
                        setShowFormLoisir(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="flex-1 bg-red-600 text-white px-2 py-1 rounded text-xs md:text-sm"
                      onClick={() => handleDeleteLoisir(l._id)}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Formations */}
          <div className="bg-[#DAB692]/90 rounded-2xl shadow-xl p-4 md:p-6 flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#795A3C] font-josefin">
              🎓 Formations
            </h2>
            <button
              className="mb-4 bg-[#795A3C] text-white px-4 py-2 rounded-lg hover:bg-[#946B47] transition text-sm md:text-base w-full"
              onClick={() => {
                setEditFormation(null);
                setShowFormFormation(true);
              }}
            >
              ➕ Ajouter
            </button>
            <ul className="w-full space-y-2 max-h-96 overflow-y-auto">
              {formations.map((f) => (
                <li key={f._id} className="bg-white/80 rounded-lg p-3 shadow">
                  <p className="text-[#795A3C] font-semibold text-sm md:text-base">
                    {f.nom}
                  </p>
                  <p className="text-gray-600 text-xs">{f.ecole}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="flex-1 bg-[#795A3C] text-white px-2 py-1 rounded text-xs md:text-sm"
                      onClick={() => {
                        setEditFormation(f);
                        setShowFormFormation(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="flex-1 bg-red-600 text-white px-2 py-1 rounded text-xs md:text-sm"
                      onClick={() => handleDeleteFormation(f._id)}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Expériences */}
          <div className="bg-[#946B47]/90 rounded-2xl shadow-xl p-4 md:p-6 flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white font-josefin">
              💼 Expériences
            </h2>
            <button
              className="mb-4 bg-white text-[#946B47] px-4 py-2 rounded-lg hover:bg-[#F9E5C6] transition text-sm md:text-base w-full"
              onClick={() => {
                setEditExperience(null);
                setShowFormExperience(true);
              }}
            >
              ➕ Ajouter
            </button>
            <ul className="w-full space-y-2 max-h-96 overflow-y-auto">
              {experiences.map((e) => (
                <li key={e._id} className="bg-white/80 rounded-lg p-3 shadow">
                  <p className="text-[#795A3C] font-semibold text-sm md:text-base">
                    {e.poste}
                  </p>
                  <p className="text-gray-600 text-xs">{e.entreprise}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="flex-1 bg-[#795A3C] text-white px-2 py-1 rounded text-xs md:text-sm"
                      onClick={() => {
                        setEditExperience(e);
                        setShowFormExperience(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="flex-1 bg-red-600 text-white px-2 py-1 rounded text-xs md:text-sm"
                      onClick={() => handleDeleteExperience(e._id)}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Projets */}
          <div className="bg-[#795A3C]/90 rounded-2xl shadow-xl p-4 md:p-6 flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white font-josefin">
              🚀 Projets
            </h2>
            <button
              className="mb-4 bg-white text-[#795A3C] px-4 py-2 rounded-lg hover:bg-[#F9E5C6] transition text-sm md:text-base w-full"
              onClick={() => {
                setEditProjet(null);
                setShowFormProjet(true);
              }}
            >
              ➕ Ajouter
            </button>
            <ul className="w-full space-y-2 max-h-96 overflow-y-auto">
              {projets.map((p) => (
                <li key={p._id} className="bg-white/80 rounded-lg p-3 shadow">
                  <p className="text-[#795A3C] font-semibold text-sm md:text-base">
                    {p.nom}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="flex-1 bg-[#795A3C] text-white px-2 py-1 rounded text-xs md:text-sm"
                      onClick={() => {
                        setEditProjet(p);
                        setShowFormProjet(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="flex-1 bg-red-600 text-white px-2 py-1 rounded text-xs md:text-sm"
                      onClick={() => handleDeleteProjet(p._id)}
                    >
                      🗑️
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
          onImageUpload={handleImageUpload}
          uploadingImage={uploadingImage}
        />
      )}
      {showFormExperience && (
        <FormExperience
          experience={editExperience}
          onSave={handleSaveExperience}
          onCancel={() => setShowFormExperience(false)}
          onImageUpload={handleImageUpload}
          uploadingImage={uploadingImage}
        />
      )}
      {showFormProjet && (
        <FormProjet
          projet={editProjet}
          onSave={handleSaveProjet}
          onCancel={() => setShowFormProjet(false)}
          onImageUpload={handleImageUpload}
          uploadingImage={uploadingImage}
        />
      )}
      {showFormLoisir && (
        <FormLoisir
          loisir={editLoisir}
          onSave={handleSaveLoisir}
          onCancel={() => setShowFormLoisir(false)}
          onImageUpload={handleImageUpload}
          uploadingImage={uploadingImage}
        />
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboard;
