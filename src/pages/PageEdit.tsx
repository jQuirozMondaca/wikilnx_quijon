import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWiki } from "../context/WikiContext";
import { generateSlug } from "../utils/storage";

export default function PageEdit() {
  const { slug } = useParams<{ slug: string }>();
  const { state, dispatch } = useWiki();
  const navigate = useNavigate();
  const existingPage = state.pages.find((p) => p.slug === slug);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (existingPage) {
      setTitle(existingPage.title);
      setContent(existingPage.content);
    }
  }, [existingPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newSlug = generateSlug(title);
    const updatedPage = {
      title: title.trim(),
      content: content.trim(),
      slug: newSlug,
    };
    dispatch({ type: "UPDATE_PAGE", payload: updatedPage });
    navigate(`/page/${newSlug}`);
  };

  if (!existingPage) return <p>Página no encontrada</p>;

  return (
    <div className="page-shell">
      <div className="page-card">
        <h2>✏️ Editar: {existingPage.title}</h2>
        <p>Ajusta el título y el contenido de esta página.</p>
        <form className="page-form" onSubmit={handleSubmit}>
          <div className="page-field">
            <label htmlFor="edit-title">Título</label>
            <input
              id="edit-title"
              className="page-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Actualiza el título"
              required
            />
          </div>
          <div className="page-field">
            <label htmlFor="edit-content">Contenido (Markdown)</label>
            <textarea
              id="edit-content"
              className="page-textarea"
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Actualiza el contenido aquí..."
            />
          </div>
          <button className="page-submit" type="submit">
            💾 Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
}
