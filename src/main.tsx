import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeGTM } from "./utils/gtm.ts";
import { requestIdleCallback } from "./utils/performance.ts";

// Initialiser Google Tag Manager de manière différée
// Le script ne sera chargé que si l'utilisateur a accepté les cookies
// ou après le consentement
requestIdleCallback(() => {
  initializeGTM();
}, { timeout: 2000 });

createRoot(document.getElementById("root")!).render(<App />);
