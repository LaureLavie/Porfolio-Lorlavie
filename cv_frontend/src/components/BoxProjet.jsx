export default function BoxProjet({
  nom,
  dateDebut,
  dateFin,
  description,
  lien,
  competence,
  domaine,
  image,
}) {
  return (
    <div className="bg-[#795A3C]/80 rounded-2xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8 w-full max-w-4xl items-center">
      {/* Colonne gauche : image (optionnelle) */}
      <div className="flex flex-col items-center gap-2 min-w-[140px]">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center overflow-hidden border-4 border-[#795A3C] shadow-xl mb-2">
          {image ? (
            <img
              src={image}
              alt={nom}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-[#795A3C] text-6xl font-bold">🎋</span>
          )}
        </div>
        {domaine && (
          <div className="text-[#F9E5C6] text-xs font-josefin text-center">
            {domaine}
          </div>
        )}
      </div>
      {/* Colonne droite : infos projet */}
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-white text-left mb-1 font-josefin">
          {nom}
        </h2>
        <div className="text-white text-sm font-josefin italic mb-1">
          {dateDebut} {dateFin ? `- ${dateFin}` : ""}
        </div>
        {competence && (
          <div className="text-[#F9E5C6] text-xs mb-1 font-josefin">
            Compétences : {competence}
          </div>
        )}
        {lien && (
          <a
            href={lien}
            className="text-[#F9E5C6] text-sm underline mb-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir le projet
          </a>
        )}
        {description && (
          <p className="text-white text-base md:text-lg font-josefin">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
