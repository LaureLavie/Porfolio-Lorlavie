export default function LoginForm({
  handleSubmit,
  onChangeEmail,
  onChangePassword,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[500px] h-[400px] flex flex-col gap-8 bg-[#8B6A4F] rounded-3xl p-10 shadow-[8px_8px_0px_0px_rgba(90,70,50,0.25)] font-josefin"
    >
      <h1 className="text-center text-3xl">Connexion</h1>
      <input
        required
        placeholder="Mail..."
        className="rounded-2xl px-8 py-4 bg-[#B1916E] text-[#F9E5C6] text-2xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none placeholder-[#F9E5C6] text-center font-josefin"
        type="email"
        onChange={onChangeEmail}
      />
      <input
        required
        placeholder="Mot de Passe.."
        className="rounded-2xl px-8 py-4 bg-[#B1916E] text-[#F9E5C6] text-2xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none placeholder-[#F9E5C6] text-center font-josefin"
        type="password"
        onChange={onChangePassword}
      />
      <button className="rounded-2xl bg-black text-[#F9E5C6] text-2xl font-normal px-8 py-4 mt-2 shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] font-josefin">
        {title}
      </button>
    </form>
  );
}
