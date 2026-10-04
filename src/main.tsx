import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Light-only theme: clear any previously saved dark-mode preference so
// returning visitors always get the light experience.
document.documentElement.classList.remove("dark");
try {
  localStorage.removeItem("darkMode");
} catch {
  /* storage unavailable — ignore */
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);