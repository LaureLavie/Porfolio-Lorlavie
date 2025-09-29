import { useState, useEffect } from "react";

export default function FormLoisir({ loisir, onSave, onCancel }) {
  const [form, setForm] = useState({
    nom: "",
    niveau: "",
    nbreAnnee: "",
    categorie: "",
    image: "",
    description: "",
    motsCles: "",
    ...loisir,
  });

  useEffect(() => {
    if (loisir) setForm({ ...form, ...loisir });
  }, [loisir]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#DAB692] rounded-2xl shadow-2xl p-8 relative max-w-lg w-full"
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 text-[#795A3C] text-2xl font-bold hover:text-black"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">
          {loisir ? "Modifier" : "Ajouter"} un loisir
        </h2>
        <input
          name="nom"
          value={form.nom}
          onChange={handleChange}
          placeholder="Nom"
          className="mb-2 w-full p-2 rounded"
          required
        />
        <input
          name="niveau"
          value={form.niveau}
          onChange={handleChange}
          placeholder="niveau"
          className="mb-2 w-full p-2 rounded"
        />
        <input
          name="nbreAnnee"
          value={form.nbreAnnee}
          onChange={handleChange}
          placeholder="nombre d'années"
          className="mb-2 w-full p-2 rounded"
        />
        <input
          name="catégorie"
          value={form.categories}
          onChange={handleChange}
          placeholder="catégorie"
          className="mb-2 w-full p-2 rounded"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image (URL)"
          className="mb-2 w-full p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="mb-2 w-full p-2 rounded"
        />
        <button
          type="submit"
          className="bg-black text-[#DAB692] px-4 py-2 rounded mt-2"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
