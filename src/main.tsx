import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SpotifyProvider } from "./components/helpers/SpotifyProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {" "}
    <>
      {" "}
      <SpotifyProvider>
        <App />
      </SpotifyProvider>
    </>
  </StrictMode>
);
