import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeNeedleFallback } from "./lib/chatbotNeedleFallback";

const redirectPath = new URL(window.location.href).searchParams.get("__spa");
if (redirectPath) {
  window.history.replaceState(null, "", redirectPath);
}

// Pre-initialize the local Needle model on site load (async, non-blocking;
// resolves quietly to "absent" when no weights are deployed)
void initializeNeedleFallback();

createRoot(document.getElementById("root")!).render(<App />);
