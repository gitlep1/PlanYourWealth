import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GlobalContextProvider from "./CustomContexts/GlobalContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./main.scss";

const ClientID = import.meta.env.GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={ClientID}>
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
