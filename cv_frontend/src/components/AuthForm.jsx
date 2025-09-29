export default function AuthForm({
  handleSubmit,
  onChangeUsername,
  onChangeEmail,
  onChangePassword,
  title,
  isRegister,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg flex flex-col gap-6 bg-[#DAB692] rounded-3xl p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(90,70,50,0.25)] font-josefin"
    >
      <h1 className="text-center text-2xl sm:text-3xl text-[#795A3C]">
        {title}
      </h1>
      {isRegister && (
        <input
          required
          placeholder="Identifiant..."
          className="rounded-2xl px-4 py-3 sm:px-8 sm:py-4 bg-[#795A3C] text-[#F9E5C6] text-lg sm:text-2xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none placeholder-[#F9E5C6] text-center font-josefin"
          type="text"
          onChange={onChangeUsername}
        />
      )}
      <input
        required
        placeholder="Mail..."
        className="rounded-2xl px-4 py-3 sm:px-8 sm:py-4 bg-[#795A3C] text-[#F9E5C6] text-lg sm:text-2xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none placeholder-[#F9E5C6] text-center font-josefin"
        type="email"
        onChange={onChangeEmail}
      />
      <input
        required
        placeholder="Mot de Passe..."
        className="rounded-2xl px-4 py-3 sm:px-8 sm:py-4 bg-[#795A3C] text-[#F9E5C6] text-lg sm:text-2xl font-normal shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] focus:outline-none placeholder-[#F9E5C6] text-center font-josefin"
        type="password"
        onChange={onChangePassword}
      />
      <button className="rounded-2xl bg-black text-[#795A3C] text-lg sm:text-2xl font-normal px-8 py-3 mt-2 shadow-[6px_6px_0px_0px_rgba(90,70,50,0.25)] font-josefin">
        {title}
      </button>
    </form>
  );
}
