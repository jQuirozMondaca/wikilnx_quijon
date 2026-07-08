import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container app-layout">
      <aside className="sidebar-panel">
        <Link to="/" className="sidebar-brand">
          ⌨️ MatrixWiki
        </Link>
        <SearchBar />
        <Sidebar />
      </aside>
      <main className="main-panel">{children}</main>
    </div>
  );
}
