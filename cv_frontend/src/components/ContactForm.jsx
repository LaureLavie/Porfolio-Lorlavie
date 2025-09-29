export default function RegisterForm({
  handleSubmit,
  onChangeUsername,
  onChangeEmail,
  onChangeMessage,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[500px] flex flex-col gap-8 bg-[#DAB692] rounded-3xl p-10 shadow-[8px_8px_0px_0px_rgba(90,70,50,0.25)] font-josefin"
    >
      <h1 className="text-center text-3xl text-[#795A3C]">Contactez-Moi</h1>
      <input
        required
        placeholder="Entrez votre nom..."
        className="rounded-2xl px-8 py-4 bg-[#795A3C] text-[#F9E5C6] text-2xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none placeholder-[#F9E5C6] text-center font-josefin"
        type="text"
        onChange={onChangeUsername}
      />
      <input
        required
        placeholder="Entrez votre email..."
        className="rounded-2xl px-8 py-4 bg-[#795A3C] text-[#F9E5C6] text-2xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none placeholder-[#F9E5C6] text-center font-josefin"
        type="email"
        onChange={onChangeEmail}
      />
      <textarea
        required
        rows={10}
        placeholder="Entrez votre message"
        className="rounded-2xl px-8 py-4 bg-[#795A3C] text-[#F9E5C6] text-2xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none placeholder-[#F9E5C6] text-center font-josefin"
        type="text"
        onChange={onChangeMessage}
      />

      <button className="rounded-2xl bg-black text-[#795A3C] text-2xl font-normal px-8 py-4 mt-2 shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] font-josefin">
        Envoyer le Message
      </button>
    </form>
  );
}
