export default function Footer() {
  return (
    <footer
      className="w-screen bg-transparent relative h-50 pt-20"
      style={{
        overflow: "hidden",
      }}
    >
      {/* Image décorative en fond */}
      <img
        src="/src/assets/images/Ellipse2.png"
        alt=""
        className="absolute -bottom-20 w-screen scale-x-180 object-cover opacity-50"
      />
      {/* Images décoratives (optionnelles, masquées sur mobile) */}
      <img
        src="/src/assets/images/asset12.png"
        alt="Plant"
        className="hidden md:block absolute left-5 bottom-0 w-40 h-40 drop-shadow-lg"
      />
      <img
        src="/src/assets/images/laure5.PNG"
        alt="Laure"
        className="hidden md:block absolute right-5 bottom-0 w-40 h-40 drop-shadow-lg"
      />
      {/* Contenu du footer */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mx-60 items-center justify-center w-full ">
        {/* Colonne 1 */}
        <div className="flex flex-col gap-3 items-center md:items-start md:mt-0">
          <div className="flex gap-2 items-center font-bold text-[#795A3C]">
            <img
              src="/src/assets/images/mail.png"
              alt="mail"
              className="w-6 h-6 drop-shadow-lg"
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
          <div className="flex gap-2 items-center font-bold text-[#795A3C]">
            <img
              src="/src/assets/images/phone.png"
              alt="phone"
              className="w-6 h-6 drop-shadow-lg"
            />
            <span>06.86.63.60.73</span>
          </div>
        </div>
        {/* Colonne 2 */}
        <div className="flex flex-col gap-3 items-center md:items-start md:mt-0">
          <div className="flex flex-col gap-1 items-center font-bold text-[#795A3C]">
            <img
              src="/src/assets/images/location.png"
              alt="location"
              className="w-10 h-10 drop-shadow-lg "
            />
            <p className="text-center">
              3 rue Trey
              <br />
              64260 ARUDY
            </p>
          </div>
        </div>
        {/* Colonne 3 */}
        <div className="flex flex-col gap-3 items-center md:items-start md:mt-0">
          <div className="flex flex-wrap gap-2 md:justify-end">
            <a href="https://github.com/LaureLavie">
              <img
                src="/src/assets/images/github.png"
                alt="github"
                target="_blank"
                className="w-8 h-8 drop-shadow-lg "
              />
            </a>
            <a href="https://discord.com/channels/@lorlavie">
              <img
                src="/src/assets/images/discord.png"
                alt="Discord"
                className="w-8 h-8 drop-shadow-lg "
                target="_blank"
                rel="noopener noreferrer"
              />
            </a>
            <a href="https://www.instagram.com/lorlavie/#">
              <img
                src="/src/assets/images/insta.png"
                alt="instagram"
                className="w-8 h-8 drop-shadow-lg "
                target="_blank"
                rel="noopener noreferrer"
              />
            </a>
            <a href="https://fr-fr.facebook.com/laurelavie">
              <img
                src="/src/assets/images/facebook.png"
                alt="facebook"
                className="w-8 h-8 drop-shadow-lg "
                target="_blank"
                rel="noopener noreferrer"
              />
            </a>
            <a href="https://www.etsy.com/fr/shop/LorlavieCreation">
              <img
                src="/src/assets/images/etsy.png"
                alt="Etsy"
                className="w-8 h-8 drop-shadow-lg "
                target="_blank"
                rel="noopener noreferrer"
              />
            </a>
            <a href="https://www.linkedin.com/in/laurelavie/">
              <img
                src="/src/assets/images/linkedin.png"
                alt="linkedin"
                className="w-8 h-8 drop-shadow-lg "
                target="_blank"
                rel="noopener noreferrer"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
