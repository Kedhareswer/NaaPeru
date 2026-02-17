import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const redirectPath = new URL(window.location.href).searchParams.get("__spa");
if (redirectPath) {
  window.history.replaceState(null, "", redirectPath);
}

createRoot(document.getElementById("root")!).render(<App />);
