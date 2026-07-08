import { Link } from "react-router-dom";
import { useWiki } from "../context/WikiContext";

export default function Home() {
  const { state } = useWiki();
  const { pages } = state;

  return (
    <div className="home-card">
      <h1 style={{ color: "var(--matrix-neon-green)" }}>
        Bienvenido a MatrixWiki
      </h1>
      <p style={{ opacity: 0.8 }}>
        {pages.length === 0
          ? "No hay páginas aún. ¡Crea la primera!"
          : `Hay ${pages.length} página(s) disponibles.`}
      </p>
      <ul className="home-list">
        {pages.map((p) => (
          <li key={p.slug} className="home-list-item">
            <Link to={`/page/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
