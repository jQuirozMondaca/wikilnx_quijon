import { createElement, useState } from "react";
import "./App.css";

import intro from "../docs_quijon/01_inicio_quijon.md?raw";
import licenses from "../docs_quijon/02_licencias_quijon.md?raw";
import installation from "../docs_quijon/03_instalacion_quijon.md?raw";
import permissions from "../docs_quijon/04_permisos_quijon.md?raw";
import packages from "../docs_quijon/05_paquetes_quijon.md?raw";
import nginx from "../docs_quijon/06_nginx_quijon.md?raw";
import prompts from "../docs_quijon/07_prompts_quijon.md?raw";

const markdownFiles = {
  "../docs_quijon/01_inicio_quijon.md": intro,
  "../docs_quijon/02_licencias_quijon.md": licenses,
  "../docs_quijon/03_instalacion_quijon.md": installation,
  "../docs_quijon/04_permisos_quijon.md": permissions,
  "../docs_quijon/05_paquetes_quijon.md": packages,
  "../docs_quijon/06_nginx_quijon.md": nginx,
  "../docs_quijon/07_prompts_quijon.md": prompts,
};

const imageFiles = import.meta.glob(
  "../docs_quijon/img_quijon/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  },
);

const imageAssets = Object.entries(imageFiles).reduce((map, [path, src]) => {
  const basename = path.split("/").pop();
  if (!basename) return map;
  map[basename] = src;
  const decoded = decodeURIComponent(basename);
  if (decoded !== basename) map[decoded] = src;
  return map;
}, {});

function getTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Documento sin título";
}

function getSummary(markdown) {
  const paragraphs = markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block && !block.startsWith("#"));

  const firstParagraph = paragraphs.find((block) => !/^[-*]\s/.test(block));
  return firstParagraph
    ? firstParagraph.replace(/[#*_`]+/g, "").slice(0, 140)
    : "Contenido del laboratorio";
}

function resolveAssetPath(url, assetMap) {
  const trimmed = (url || "").trim();
  if (!trimmed) return "";
  if (
    /^https?:\/\//i.test(trimmed) ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  const decoded = decodeURIComponent(trimmed).replace(/\\/g, "/");
  const basename = decoded.split("/").pop() || decoded;
  const normalized = decoded
    .replace(/^\.\//, "")
    .replace(/^\.\.\//, "")
    .replace(/\/+/g, "/")
    .replace(/^img_quijon\//, "")
    .replace(/^doc_quijon\//, "")
    .replace(/^docs_quijon\//, "")
    .replace(/^\.\.\/docs_quijon\//, "")
    .replace(/^\.\.\/doc_quijon\//, "");

  const candidates = [
    basename,
    basename.replace(/%20/g, " "),
    normalized,
    normalized.split("/").pop(),
    decoded.split("/").pop(),
  ];

  for (const candidate of candidates) {
    if (assetMap[candidate]) return assetMap[candidate];
  }

  return encodeURI(decoded);
}

function renderInline(text, assetMap) {
  const pattern = /(!?\[([^\]]*)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(`([^`]+)`)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1] && match[1].startsWith("!")) {
      const src = resolveAssetPath(match[3], assetMap);
      parts.push(
        <img
          key={`${match[3]}-${match.index}`}
          src={src}
          alt={match[2]}
          className="inline-image"
        />,
      );
    } else if (match[1]) {
      parts.push(
        <a
          key={`${match[3]}-${match.index}`}
          href={resolveAssetPath(match[3], assetMap)}
          target="_blank"
          rel="noreferrer"
        >
          {match[2]}
        </a>,
      );
    } else if (match[4]) {
      parts.push(
        <strong key={`${match[5]}-${match.index}`}>{match[5]}</strong>,
      );
    } else if (match[6]) {
      parts.push(<code key={`${match[7]}-${match.index}`}>{match[7]}</code>);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function renderMarkdown(markdown, assetMap) {
  const blocks = [];
  const lines = markdown.split(/\r?\n/);
  let paragraphLines = [];
  let listItems = [];

  const flushParagraph = () => {
    if (paragraphLines.length) {
      blocks.push(
        <p key={`p-${blocks.length}`} className="article-paragraph">
          {renderInline(paragraphLines.join(" ").trim(), assetMap)}
        </p>,
      );
      paragraphLines = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="article-list">
          {listItems}
        </ul>,
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    if (/^#{1,3}\s+/.test(trimmed)) {
      flushParagraph();
      flushList();
      const level = trimmed.match(/^#+/)[0].length;
      const content = trimmed.replace(/^#{1,3}\s+/, "");
      const headingTag = `h${Math.min(level + 1, 3)}`;
      blocks.push(
        createElement(
          headingTag,
          { key: `${headingTag}-${index}` },
          renderInline(content, assetMap),
        ),
      );
      return;
    }

    if (/^!\[.*\]\(.*\)$/.test(trimmed)) {
      flushParagraph();
      flushList();
      const match = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      const src = resolveAssetPath(match[2], assetMap);
      blocks.push(
        <img
          key={`img-${index}`}
          src={src}
          alt={match[1]}
          className="article-image"
        />,
      );
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      listItems.push(
        <li key={`li-${index}`}>
          {renderInline(trimmed.replace(/^[-*]\s+/, ""), assetMap)}
        </li>,
      );
      return;
    }

    paragraphLines.push(trimmed);
  });

  flushParagraph();
  flushList();

  return blocks;
}

const docs = Object.entries(markdownFiles)
  .map(([path, content]) => ({
    id: path.split("/").pop().replace(/\.md$/, ""),
    title: getTitle(content),
    summary: getSummary(content),
    content,
    path,
  }))
  .sort((a, b) => a.id.localeCompare(b.id));

function App() {
  const [activeDoc, setActiveDoc] = useState(docs[0]?.id ?? "");
  const selectedDoc = docs.find((doc) => doc.id === activeDoc) ?? docs[0];

  return (
    <div className="wiki-shell">
      <header className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Wiki de laboratorio · Unidad 3</p>
          <h1>Macross Nexus · Administración de Linux Server</h1>
          <p className="hero-text">
            Un portal temático que organiza la documentación de la carpeta de
            recursos del proyecto con una estética inspirada en la saga de
            Macross y su identidad técnica.
          </p>
          <div className="hero-tags">
            <span>React + Vite</span>
            <span>Ubuntu</span>
            <span>Nginx</span>
            <span>Permisos</span>
          </div>
        </div>
      </header>

      <main className="content-grid">
        <aside className="sidebar">
          <h2>Índice del wiki</h2>
          <p>
            Explora cada tema del laboratorio sin alterar la información
            original de la carpeta de documentación.
          </p>
          <nav>
            {docs.map((doc) => (
              <button
                key={doc.id}
                type="button"
                className={
                  doc.id === selectedDoc?.id
                    ? "sidebar-link active"
                    : "sidebar-link"
                }
                onClick={() => setActiveDoc(doc.id)}
              >
                <strong>{doc.title}</strong>
                <span>{doc.summary}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="article-card">
          <div className="article-header">
            <p className="article-kicker">Documento activo</p>
            <h2>{selectedDoc?.title}</h2>
            <p>{selectedDoc?.summary}</p>
          </div>
          <div className="article-body">
            {selectedDoc
              ? renderMarkdown(selectedDoc.content, imageAssets)
              : null}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
