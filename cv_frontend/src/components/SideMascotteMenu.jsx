export default function SideMascotteMenu({
  mascotteTop,
  mascotteBottom,
  label,
  bgLabel = "bg-[#F9E5C6]",
  textLabel = "text-black",
}) {
  return (
    <div className="sticky top-10 md:w-1/3 flex flex-col items-center py-20 self-center h-screen">
      {/* Mascotte haute */}
      <img src={mascotteTop} alt="Mascotte" className="w-40 md:w-56 mb-4" />
      {/* Bouton label */}
      <div
        className={`${bgLabel} ${textLabel} font-bold text-2xl rounded-2xl px-8 py-3 shadow-lg mb-6 text-center font-josefin`}
      >
        {label}
      </div>
      {/* Mascotte basse */}
      <img src={mascotteBottom} alt="Mascotte" className="w-40 md:w-56 mb-4" />
    </div>
  );
}
