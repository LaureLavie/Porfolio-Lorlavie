import formationsData from "../data/formations.json";

function Formations() {
  return (
    <section className="formations">
      <h2>Formations</h2>
      <ul>
        {formationsData.map((formation) => (
          <li key={formation.id} className="formation-item">
            <h3>{formation.nom}</h3>
            <p>{formation.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Formations;
