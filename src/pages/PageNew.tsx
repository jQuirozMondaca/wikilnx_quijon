import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWiki } from "../context/WikiContext";
import { generateSlug } from "../utils/storage";

export default function PageNew() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { dispatch } = useWiki();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const slug = generateSlug(title);
    const newPage = { title: title.trim(), content: content.trim(), slug };
    dispatch({ type: "ADD_PAGE", payload: newPage });
    navigate(`/page/${slug}`);
  };

  return (
    <div className="page-shell">
      <div className="page-card">
        <h2>📝 Nueva página</h2>
        <p>Crea una nueva entrada con contenido en Markdown.</p>
        <form className="page-form" onSubmit={handleSubmit}>
          <div className="page-field">
            <label htmlFor="page-title">Título</label>
            <input
              id="page-title"
              className="page-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Comandos útiles"
              required
            />
          </div>
          <div className="page-field">
            <label htmlFor="page-content">Contenido (Markdown)</label>
            <textarea
              id="page-content"
              className="page-textarea"
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe el contenido de la página aquí..."
            />
          </div>
          <button className="page-submit" type="submit">
            ✨ Crear página
          </button>
        </form>
      </div>
    </div>
  );
}
