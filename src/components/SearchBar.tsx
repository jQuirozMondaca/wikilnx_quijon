import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWiki } from "../context/WikiContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof state.pages>([]);
  const { state } = useWiki();
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = state.pages.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q),
    );
    setResults(filtered.slice(0, 5));
  }, [query, state.pages]);

  const handleSelect = (slug: string) => {
    setQuery("");
    setResults([]);
    navigate(`/page/${slug}`);
  };

  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((p) => (
            <li
              key={p.slug}
              onClick={() => handleSelect(p.slug)}
              className="search-result"
            >
              {p.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
