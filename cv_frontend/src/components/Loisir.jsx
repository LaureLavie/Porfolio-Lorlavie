import loisirsData from "../data/loisirs.json";

function Loisirs() {
  return (
    <section className="loisirs">
      <h2>Loisirs</h2>
      <ul>
        {loisirsData.map((loisir) => (
          <li key={loisir.id} className="loisir-item">
            <h3>{loisir.nom}</h3>
            <p>{loisir.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Loisirs;
