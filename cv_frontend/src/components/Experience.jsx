import experiencesData from "../data/experiences.json";

function Experiences() {
  return (
    <section className="experiences">
      <h2>Expériences</h2>
      <ul>
        {experiencesData.map((exp) => (
          <li key={exp.id} className="experience-item">
            <h3>{exp.titre}</h3>
            <p>{exp.description}</p>
            <span>{exp.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Experiences;
