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
  return (
    <div className="bg-[#DAB692]/80 rounded-2xl shadow-2xl p-6 flex flex-col items-center">
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center overflow-hidden shadow-lg mb-4 border-2 border-[#795A3C]">
        {image ? (
          <img src={image} alt={nom} className="w-fit h-fit object-contain" />
        ) : (
          <span className="text-[#795A3C] text-4xl font-bold">🎓</span>
        )}
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-[#795A3C] text-center mb-1 font-josefin">
        {nom}
      </h2>
      {certification && (
        <div className="text-[#946B47] text-sm mb-1 font-semibold">
          {certification}
        </div>
      )}
      <div className="text-black text-base mb-1 font-josefin">{ecole}</div>
      <div className="text-black text-sm mb-2 font-josefin italic">
        {dateDebut} - {dateFin}
      </div>
      {domaine && (
        <div className="text-[#795A3C] text-xs mb-2 font-josefin">
          {domaine}
        </div>
      )}
      {lien && (
        <a
          href={lien}
          className="text-[#795A3C] text-sm underline mb-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir la formation
        </a>
      )}
      {description && (
        <p className="text-black text-base md:text-lg font-josefin text-center">
          {description}
        </p>
      )}
    </div>
  );
}
