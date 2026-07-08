import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PageView from "./pages/PageView";
import PageEdit from "./pages/PageEdit";
import PageNew from "./pages/PageNew";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:slug" element={<PageView />} />
        <Route path="/edit/:slug" element={<PageEdit />} />
        <Route path="/new" element={<PageNew />} />
      </Routes>
    </Layout>
  );
}

export default App;
