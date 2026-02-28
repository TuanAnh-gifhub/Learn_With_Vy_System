import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import "./i18n";
import App from "./App.tsx";
import { AuthProvider } from "../src/context/AuthContext";
import { LanguageProvider } from "./components/Language/LanguageContext";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);