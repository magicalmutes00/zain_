import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/* Self-hosted fonts (no third-party CDN): removes an external dependency, improves
   privacy and eliminates the font-swap layout shift. Only the latin subsets and the
   weights actually used are imported. Family names match the design tokens. */
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/inter/latin-ext-400.css";
import "@fontsource/inter/latin-ext-500.css";
import "@fontsource/inter/latin-ext-600.css";
import "@fontsource/inter/latin-ext-700.css";
import "@fontsource/sora/latin-600.css";
import "@fontsource/sora/latin-700.css";
import "@fontsource/sora/latin-800.css";
import "@fontsource/sora/latin-ext-600.css";
import "@fontsource/sora/latin-ext-700.css";
import "@fontsource/sora/latin-ext-800.css";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
