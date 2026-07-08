import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { useWiki } from "../context/WikiContext";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function PageView() {
  const { slug } = useParams<{ slug: string }>();
  const { state, dispatch } = useWiki();
  const navigate = useNavigate();
  const page = state.pages.find((p) => p.slug === slug);

  if (!page) return <Navigate to="/" />;

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar la página "${page.title}"?`)) {
      dispatch({ type: "DELETE_PAGE", payload: slug! });
      navigate("/");
    }
  };

  return (
    <div className="view-card">
      <div className="page-header">
        <h1 style={{ color: "var(--matrix-neon-green)" }}>{page.title}</h1>
        <div className="page-actions">
          <Link className="page-link" to={`/edit/${page.slug}`}>
            ✏️ Editar
          </Link>
          <button className="page-button" onClick={handleDelete}>
            🗑️ Eliminar
          </button>
        </div>
      </div>
      <MarkdownRenderer content={page.content} />
    </div>
  );
}
