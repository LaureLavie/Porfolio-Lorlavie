export default function CardLoisir({
  nom,
  niveau,
  nbreAnnee,
  categorie,
  image,
  description,
}) {
  return (
    <div className="bg-[#F9E5C6]/90 rounded-3xl p-4 md:p-6 shadow-2xl hover:scale-105 transition-transform font-josefin flex flex-col items-center text-center">
      {/* Image */}
      {image && (
        <div className="w-24 h-24 md:w-32 md:h-32 mb-4">
          <img
            src={image}
            alt={nom}
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
      )}

      {/* Icône par défaut */}
      {!image && (
        <div className="text-5xl md:text-6xl mb-4">
          {categorie === "Musique" ? "🎵" : categorie === "Art" ? "🎨" : "✨"}
        </div>
      )}

      {/* Nom */}
      <h3 className="text-lg md:text-xl font-bold text-[#795A3C] mb-2">
        {nom}
      </h3>

      {/* Catégorie */}
      {categorie && (
        <span className="inline-block bg-[#795A3C] text-white px-3 py-1 rounded-full text-xs md:text-sm mb-2">
          {categorie}
        </span>
      )}

      {/* Niveau et années */}
      <div className="flex flex-wrap justify-center gap-2 mb-3">
        {niveau && (
          <span className="bg-[#DAB692] text-[#795A3C] px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
            📊 {niveau}
          </span>
        )}
        {nbreAnnee && (
          <span className="bg-[#DAB692] text-[#795A3C] px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
            ⏱️ {nbreAnnee}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-700 mt-2">{description}</p>
      )}
    </div>
  );
}
