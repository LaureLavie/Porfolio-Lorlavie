export default function Footer() {
  return (
    <footer className="w-full bg-transparent relative pt-10 pb-6 mt-auto overflow-hidden">
      {/* Image décorative en fond */}
      <img
        src="/src/assets/images/Ellipse2.png"
        alt=""
        className="absolute -bottom-20 w-full object-cover opacity-40 pointer-events-none"
        style={{ transform: "scaleX(1.5)" }}
      />

      {/* Images décoratives - masquées sur mobile */}
      <img
        src="/src/assets/images/asset12.png"
        alt=""
        className="hidden lg:block absolute left-5 bottom-0 w-32 xl:w-40 h-32 xl:h-40 drop-shadow-lg"
      />
      <img
        src="/src/assets/images/laure5.PNG"
        alt=""
        className="hidden lg:block absolute right-5 bottom-0 w-32 xl:w-40 h-32 xl:h-40 drop-shadow-lg"
      />

      {/* Contenu du footer */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-8 lg:px-60 items-start justify-items-center lg:justify-items-start max-w-7xl mx-auto">
        {/* Colonne 1 - Contact */}
        <div className="flex flex-col gap-3 items-center sm:items-start w-full">
          <h3 className="font-bold text-[#795A3C] text-lg mb-2 font-josefin">
            📞 Contact
          </h3>
          <div className="flex gap-2 items-center font-semibold text-[#795A3C] text-sm md:text-base">
            <img
              src="/src/assets/images/mail.png"
              alt=""
              className="w-5 h-5 md:w-6 md:h-6 drop-shadow-lg flex-shrink-0"
            />
            <a
              href="mailto:laure.lavie@gmail.com"
              className="hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              laure.lavie@gmail.com
            </a>
          </div>
          <div className="flex gap-2 items-center font-semibold text-[#795A3C] text-sm md:text-base">
            <img
              src="/src/assets/images/phone.png"
              alt=""
              className="w-5 h-5 md:w-6 md:h-6 drop-shadow-lg flex-shrink-0"
            />
            <a href="tel:+33686636073" className="hover:underline">
              06.86.63.60.73
            </a>
          </div>
        </div>

        {/* Colonne 2 - Adresse */}
        <div className="flex flex-col gap-3 items-center sm:items-start w-full">
          <h3 className="font-bold text-[#795A3C] text-lg mb-2 font-josefin">
            📍 Adresse
          </h3>
          <div className="flex flex-col items-center sm:items-start font-semibold text-[#795A3C] text-sm md:text-base">
            <img
              src="/src/assets/images/location.png"
              alt=""
              className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg mb-2"
            />
            <p className="text-center sm:text-left">
              3 rue Trey
              <br />
              64260 ARUDY
            </p>
          </div>
        </div>

        {/* Colonne 3 - Réseaux sociaux */}
        <div className="flex flex-col gap-3 items-center sm:items-start w-full">
          <h3 className="font-bold text-[#795A3C] text-lg mb-2 font-josefin">
            🌐 Réseaux
          </h3>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <a
              href="https://github.com/LaureLavie"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="GitHub"
            >
              <img
                src="/src/assets/images/github.png"
                alt="GitHub"
                className="w-7 h-7 md:w-8 md:h-8 drop-shadow-lg"
              />
            </a>
            <a
              href="https://discord.com/channels/@lorlavie"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Discord"
            >
              <img
                src="/src/assets/images/discord.png"
                alt="Discord"
                className="w-7 h-7 md:w-8 md:h-8 drop-shadow-lg"
              />
            </a>
            <a
              href="https://www.instagram.com/lorlavie/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <img
                src="/src/assets/images/insta.png"
                alt="Instagram"
                className="w-7 h-7 md:w-8 md:h-8 drop-shadow-lg"
              />
            </a>
            <a
              href="https://fr-fr.facebook.com/laurelavie"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <img
                src="/src/assets/images/facebook.png"
                alt="Facebook"
                className="w-7 h-7 md:w-8 md:h-8 drop-shadow-lg"
              />
            </a>
            <a
              href="https://www.etsy.com/fr/shop/LorlavieCreation"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="Etsy"
            >
              <img
                src="/src/assets/images/etsy.png"
                alt="Etsy"
                className="w-7 h-7 md:w-8 md:h-8 drop-shadow-lg"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/laurelavie/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              aria-label="LinkedIn"
            >
              <img
                src="/src/assets/images/linkedin.png"
                alt="LinkedIn"
                className="w-7 h-7 md:w-8 md:h-8 drop-shadow-lg"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative text-center mt-8 text-[#795A3C] text-xs md:text-sm font-semibold">
        <p>© {new Date().getFullYear()} Laure Lavie - Tous droits réservés</p>
      </div>
    </footer>
  );
}
