// Formatage des dates
export default function FormatDateFR(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

// Bloc date stylé
export default function DateBlock({ dateDebut, dateFin }) {
  return (
    <span
      className="flex items-center gap-1 bg-white/30 border border-white/60 px-4 py-1 rounded-xl shadow-sm font-semibold text-[#946B47] text-sm tracking-wide"
      style={{ letterSpacing: "1px" }}
    >
      <span role="img" aria-label="calendar">
        📅
      </span>
      {FormatDateFR(dateDebut)}
      {dateFin && `  —  ${FormatDateFR(dateFin)}`}
    </span>
  );
}