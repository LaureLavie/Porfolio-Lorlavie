import { useState, useEffect } from "react";

export default function FormExperience({ experience, onSave, onCancel }) {
  const [form, setForm] = useState({
    poste: "",
    entreprise: "",
    dateDebut: "",
    dateFin: "",
    description: "",
    lieu: "",
    secteur: "",
    lien: "",
    image: "",
    ...experience,
  });

  useEffect(() => {
    if (experience) setForm({ ...form, ...experience });
    // eslint-disable-next-line
  }, [experience]);

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
          {experience ? "Modifier" : "Ajouter"} une expérience
        </h2>
        <input
          name="poste"
          value={form.poste}
          onChange={handleChange}
          placeholder="Poste"
          className="mb-2 w-full p-2 rounded"
          required
        />
        <input
          name="entreprise"
          value={form.entreprise}
          onChange={handleChange}
          placeholder="Entreprise"
          className="mb-2 w-full p-2 rounded"
          required
        />
        <input
          name="dateDebut"
          value={form.dateDebut}
          onChange={handleChange}
          placeholder="Date début"
          className="mb-2 w-full p-2 rounded"
        />
        <input
          name="dateFin"
          value={form.dateFin}
          onChange={handleChange}
          placeholder="Date fin"
          className="mb-2 w-full p-2 rounded"
        />
        <input
          name="lieu"
          value={form.lieu}
          onChange={handleChange}
          placeholder="Lieu"
          className="mb-2 w-full p-2 rounded"
        />
        <input
          name="secteur"
          value={form.secteur}
          onChange={handleChange}
          placeholder="Secteur"
          className="mb-2 w-full p-2 rounded"
        />
        <input
          name="lien"
          value={form.lien}
          onChange={handleChange}
          placeholder="Lien"
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
