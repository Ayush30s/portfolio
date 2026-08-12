import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { logVisit } from "./lib/visitorLog.js";

logVisit();

createRoot(document.getElementById("root")).render(<App />);
