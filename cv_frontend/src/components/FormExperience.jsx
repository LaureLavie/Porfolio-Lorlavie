import { useState, useEffect } from "react";

export default function FormExperience({
  experience,
  onSave,
  onCancel,
  onImageUpload,
  uploadingImage,
}) {
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
    motsCles: "",
    ...experience,
  });

  useEffect(() => {
    if (experience) setForm({ ...form, ...experience });
  }, [experience]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await onImageUpload(file);
      if (imageUrl) {
        setForm({ ...form, image: imageUrl });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-[#DAB692] rounded-2xl shadow-2xl p-6 md:p-8 relative max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 text-[#795A3C] text-3xl font-bold hover:text-black hover:scale-110 transition"
        >
          ×
        </button>

        <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#795A3C] font-josefin">
          {experience ? "✏️ Modifier" : "➕ Ajouter"} une expérience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#795A3C] font-semibold text-sm">
              Poste *
            </label>
            <input
              name="poste"
              value={form.poste}
              onChange={handleChange}
              placeholder="Ex: Développeur Web"
              className="w-full p-3 rounded-lg border-2 border-[#795A3C] focus:border-[#946B47] focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#795A3C] font-semibold text-sm">
              Entreprise *
            </label>
            <input
              name="entreprise"
              value={form.entreprise}
              onChange={handleChange}
              placeholder="Ex: Tech Corp"
              className="w-full p-3 rounded-lg border-2 border-[#795A3C] focus:border-[#946B47] focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#795A3C] font-semibold text-sm">
              Date début
            </label>
            <input
              name="dateDebut"
              value={form.dateDebut}
              onChange={handleChange}
              placeholder="Ex: Janvier 2023"
              className="w-full p-3 rounded-lg border-2 border-[#795A3C] focus:border-[#946B47] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#795A3C] font-semibold text-sm">
              Date fin
            </label>
            <input
              name="dateFin"
              value={form.dateFin}
              onChange={handleChange}
              placeholder="Ex: Décembre 2023 ou 'Aujourd'hui'"
              className="w-full p-3 rounded-lg border-2 border-[#795A3C] focus:border-[#946B47] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#795A3C] font-semibold text-sm">Lieu</label>
            <input
              name="lieu"
              value={form.lieu}
              onChange={handleChange}
              placeholder="Ex: Paris, France"
              className="w-full p-3 rounded-lg border-2 border-[#795A3C] focus:border-[#946B47] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#795A3C] font-semibold text-sm">
              Secteur
            </label>
            <input
              name="secteur"
              value={form.secteur}
              onChange={handleChange}
              placeholder="Ex: Informatique"
              className="w-full p-3 rounded-lg border-2 border-[#795A3C] focus:border-[#946B47] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[#795A3C] font-semibold text-sm">
              Lien (optionnel)
            </label>
            <input
              name="lien"
              value={form.lien}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full p-3 rounded-lg border-2 border-[#795A3C] focus:border-[#946B47] focus:outline-none"
              type="url"
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[#795A3C] font-semibold text-sm">
              Mots-clés (séparés par des virgules)
            </label>
            <input
              name="motsCles"
              value={form.motsCles}
              onChange={handleChange}
              placeholder="Ex: JavaScript, React, Node.js"
              className="w-full p-3 rounded-lg border-2 border-[#795A3C] focus:border-[#946B47] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[#795A3C] font-semibold text-sm">
              Image
            </label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={uploadingImage}
                className="flex-1 p-2 rounded-lg border-2 border-[#795A3C] focus:outline-none text-sm"
              />
              {uploadingImage && (
                <span className="text-sm text-[#795A3C]">Upload...</span>
              )}
            </div>
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg mt-2"
              />
            )}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[#795A3C] font-semibold text-sm">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Décrivez vos missions et réalisations..."
              className="w-full p-3 rounded-lg border-2 border-[#795A3C] focus:border-[#946B47] focus:outline-none"
              rows={5}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="flex-1 bg-[#795A3C] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#946B47] transition"
          >
            💾 Enregistrer
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-500 transition"
          >
            ❌ Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
