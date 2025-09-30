export default function BoxExperience({
  poste,
  entreprise,
  dateDebut,
  dateFin,
  description,
  lieu,
  secteur,
  lien,
  image,
  bgColor = "bg-[#946B47]/90",
  titleColor = "text-white",
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
    <div
      className={`${bgColor} rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl w-full max-w-4xl font-josefin`}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Image */}
        {image && (
          <div className="w-full md:w-32 lg:w-40 h-32 lg:h-40 flex-shrink-0">
            <img
              src={image}
              alt={poste}
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Contenu */}
        <div className="flex-1">
          <h3
            className={`text-xl md:text-2xl lg:text-3xl font-bold ${titleColor} mb-2`}
          >
            {poste}
          </h3>
          <p
            className={`text-base md:text-lg font-semibold ${titleColor} mb-1`}
          >
            {entreprise}
          </p>

          {/* Dates et lieu */}
          <div className="flex flex-wrap gap-2 text-xs md:text-sm text-white/90 mb-3">
            {dateDebut && dateBlock}
            {lieu && (
              <span className="bg-white/20 px-3 py-1 rounded-full">
                📍 {lieu}
              </span>
            )}
            {secteur && (
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🏢 {secteur}
              </span>
            )}
          </div>

          {description && (
            <p className="text-sm md:text-base text-white/95 leading-relaxed mb-4">
              {description}
            </p>
          )}

          {lien && (
            <a
              href={lien}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#946B47] px-4 py-2 rounded-lg font-semibold hover:bg-[#F9E5C6] transition text-sm md:text-base"
            >
              🔗 En savoir plus
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
