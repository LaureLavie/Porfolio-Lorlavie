import projetsData from "../data/projets.json";

function Projets() {
  return (
    <section className="projets">
      <h2>Projets</h2>
      <ul>
        {projetsData.map((projet) => (
          <li key={projet.id} className="projet-item">
            <h3>{projet.nom}</h3>
            <p>{projet.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projets;
