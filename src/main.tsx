import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-expect-error Are you nuts for adding type for css
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
