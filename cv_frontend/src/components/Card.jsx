export default function Card({
  title,
  link,
  image,
  description,
  titleColor = "text-black",
  bgColor = "bg-[#F9E5C6]/80",
  textColor = "text-black",
}) {
  return (
    <div
      className={`${bgColor} rounded-2xl shadow-2xl p-6 flex flex-col items-center`}
    >
      <h2
        className={`text-xl md:text-2xl font-bold ${titleColor} shadow-lg text-center mb-1 font-josefin`}
      >
        {title}
      </h2>
      {link && (
        <a
          href={link.url}
          className={`${textColor} text-sm underline mb-2`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      )}
      <img
        src={image}
        alt={title}
        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#795A3C] shadow-xl mb-4"
      />
      <p
        className={`${textColor} text-base md:text-lg font-josefin text-center`}
      >
        {description}
      </p>
    </div>
  );
}
