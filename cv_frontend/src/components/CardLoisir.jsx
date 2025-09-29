export default function CardLoisir({
  nom,
  niveau,
  nbreAnnee,
  categorie,
  image,
}) {
  return (
    <div className="bg-[#F9E5C6]/80 rounded-2xl shadow-2xl p-6 flex flex-col items-center w-full max-w-md">
      {/* Image ronde en haut */}
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#F9E5C6] flex items-center justify-center overflow-hidden shadow-2xl mb-4">
        {image ? (
          <img src={image} alt={nom} className="w-fit h-fit object-cover" />
        ) : (
          <span className="text-[#795A3C] text-4xl font-bold">🎵</span>
        )}
      </div>
      {/* Contenu */}
      <h2 className="text-xl md:text-2xl font-bold text-black text-center mb-1 font-josefin">
        {nom}
      </h2>
      {categorie && (
        <div className="text-[#795A3C] text-xs mb-1 font-josefin">
          {categorie}
        </div>
      )}
      {niveau && (
        <div className="text-[#795A3C] text-sm mb-1 font-josefin">
          Niveau : {niveau}
        </div>
      )}
      {nbreAnnee && (
        <div className="text-[#795A3C] text-sm mb-1 font-josefin">
          Expérience : {nbreAnnee}
        </div>
      )}
    </div>
  );
}
