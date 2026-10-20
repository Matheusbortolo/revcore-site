import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { PrivacyPage } from "./PrivacyPage";
import "./styles.css";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const Page = path === "/privacidade" ? PrivacyPage : App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
