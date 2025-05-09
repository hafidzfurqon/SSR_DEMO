import "./index.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

// entry client disini