import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { captureAndSendAnalytics } from "./lib/visitorLog.js";

const root = document.getElementById("root");

createRoot(root).render(<App />);


if (typeof window !== "undefined") {
  window.addEventListener(
    "load",
    () => {
      captureAndSendAnalytics("portfolio_view");
    },
    { once: true },
  );
}
