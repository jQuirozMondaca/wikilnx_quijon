import { useParams, Navigate } from "react-router-dom";
import { useWiki } from "../context/WikiContext";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function PageView() {
  const { slug } = useParams<{ slug: string }>();
  const { state } = useWiki();
  const page = state.pages.find((p) => p.slug === slug);

  if (!page) return <Navigate to="/" />;

  return (
    <div className="view-card">
      <div className="page-header">
        <h1 style={{ color: "var(--matrix-neon-green)" }}>{page.title}</h1>
      </div>
      <MarkdownRenderer content={page.content} />
    </div>
  );
}
