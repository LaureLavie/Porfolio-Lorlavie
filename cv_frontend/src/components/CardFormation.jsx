export default function CardFormation({
  nom,
  certification,
  ecole,
  dateDebut,
  dateFin,
  description,
  lien,
  domaine,
  image,
}) {
  // Formatage des dates
  function formatDateFR(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // Bloc date stylé
  const dateBlock = (
    <span
      className="flex items-center gap-1 bg-white/30 border border-white/60 px-4 py-1 rounded-xl shadow-sm font-semibold text-[#946B47] text-sm tracking-wide"
      style={{ letterSpacing: "1px" }}
    >
      <span role="img" aria-label="calendar">
        📅
      </span>
      {formatDateFR(dateDebut)}
      {dateFin && `  —  ${formatDateFR(dateFin)}`}
    </span>
  );

  return (
    <div className="bg-[#DAB692]/90 rounded-3xl p-4 md:p-6 shadow-2xl hover:scale-105 transition-transform font-josefin flex flex-col">
      {/* Image */}
      {image && (
        <div className="w-full h-32 md:h-40 mb-4">
          <img
            src={image}
            alt={nom}
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* Titre */}
      <h3 className="text-lg md:text-xl font-bold text-[#795A3C] mb-2">
        {nom}
      </h3>

      {/* Certification */}
      {certification && (
        <p className="text-sm md:text-base font-semibold text-[#946B47] mb-2">
          🎓 {certification}
        </p>
      )}

      {/* École */}
      <p className="text-sm md:text-base text-[#795A3C] mb-2">🏫 {ecole}</p>

 
      {/* Dates */}
      <div className="flex flex-wrap gap-2 text-xs md:text-sm text-white/90 mb-3">
        {dateDebut && dateBlock}
      </div>

      {/* Domaine */}
      {domaine && (
        <span className="inline-block bg-[#795A3C] text-white px-3 py-1 rounded-full text-xs mb-3 w-fit">
          {domaine}
        </span>
      )}

      {/* Description */}
      {description && description !== "..." && (
        <p className="text-sm text-gray-700 mb-4 flex-1">{description}</p>
      )}

      {/* Lien */}
      {lien && (
        <a
          href={lien}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto bg-[#795A3C] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#946B47] transition text-center text-sm md:text-base"
        >
          🔗 En savoir plus
        </a>
      )}
    </div>
  );
}
