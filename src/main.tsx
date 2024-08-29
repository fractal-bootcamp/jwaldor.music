import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createContext } from "react";

const AccessContext = createContext(undefined);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {" "}
    <>
      {" "}
      <App />
    </>
  </StrictMode>
);
