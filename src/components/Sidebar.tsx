import { Link } from "react-router-dom";
import { useWiki } from "../context/WikiContext";

export default function Sidebar() {
  const { state } = useWiki();
  const { pages } = state;

  return (
    <nav>
      <h4 className="sidebar-title">📄 Páginas</h4>
      <ul className="sidebar-list">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link className="sidebar-link" to={`/page/${page.slug}`}>
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
