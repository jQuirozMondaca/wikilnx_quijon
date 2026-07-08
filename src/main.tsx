import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { WikiProvider } from "./context/WikiContext";
import App from "./App";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WikiProvider>
        <App />
      </WikiProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
