export default function BoxExperience({
  poste,
  entreprise,
  dateDebut,
  dateFin,
  description,
  lien,
  secteur,
  image,
}) {
  return (
    <div className="bg-[#946B47]/70 rounded-4xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8 max-w-4xl items-center">
      {/* Colonne gauche : titre, entreprise, dates */}
      <div className="flex flex-col items-center gap-2 w-[300px] text-center">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center overflow-hidden border-4 border-[#795A3C] shadow-xl mb-2">
          {image ? (
            <img src={image} alt={nom} className="w-fit h-fit object-contain" />
          ) : (
            <span className="text-[#795A3C] text-6xl font-bold">📜</span>
          )}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-[#795A3C] text-center mb-1 font-josefin">
          {poste}
        </h2>
        <div className="text-white text-base font-semibold">{entreprise}</div>
        <div className="text-white text-sm font-josefin italic">
          {dateDebut} {dateFin ? `- ${dateFin}` : "- aujourd'hui"}
        </div>
        {secteur && (
          <div className="text-[#F9E5C6] text-xs mt-2 font-josefin">
            {secteur}
          </div>
        )}
        {lien && (
          <a
            href={lien}
            className="text-[#F9E5C6] text-sm underline mt-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir l'entreprise
          </a>
        )}
      </div>
      {/* Colonne droite : description */}
      <div className="flex-1 flex flex-col gap-4 text-justify">
        {description && (
          <p className="text-[#795A3C] text-base md:text-lg font-josefin">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
