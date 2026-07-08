import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div
      className="markdown-body"
      style={{
        background: "rgba(0, 20, 0, 0.3)",
        padding: "1.5rem",
        borderRadius: "8px",
        border: "1px solid var(--matrix-dim-green)",
        color: "var(--matrix-text)",
      }}
    >
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1
              style={{
                color: "var(--matrix-neon-green)",
                borderBottom: "1px solid var(--matrix-dim-green)",
              }}
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2 style={{ color: "var(--matrix-light-green)" }} {...props} />
          ),
          a: ({ node, ...props }) => (
            <a style={{ color: "var(--matrix-neon-green)" }} {...props} />
          ),
          code: ({ node, ...props }) => (
            <code
              style={{
                background: "var(--matrix-dark-green)",
                padding: "0.2rem 0.4rem",
                borderRadius: "4px",
              }}
              {...props}
            />
          ),
          pre: ({ node, ...props }) => (
            <pre
              style={{
                background: "var(--matrix-dark-green)",
                padding: "1rem",
                borderRadius: "4px",
                overflow: "auto",
              }}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
