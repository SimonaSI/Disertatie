import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./App.css";
import { routes } from "./Utils/appRoutes";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Meniu from "./views/Meniu/Meniu";

import Autentificare from "./views/PaginaAutentificare/Autentificare";
import Cheltuieli from "./views/PaginaCheltuieli/Cheltuieli";
import Datorii from "./views/PaginaDatorii/Datorii";
import EducatieFinanciara from "./views/PaginaEducatieFinanciara/EducatieFinanciara";
import Overview from "./views/PaginaOverview/Overview";
import Venit from "./views/PaginaVenit/Venit";
import Metadata from "./views/Metadata/Metadata";

const App = () => {
  const location = useLocation();

  const shouldShowMenu = location.pathname !== routes.autentificare; // Decideți dacă trebuie să afișați meniul sau nu

  useEffect(() => {
    if (location.pathname !== routes.autentificare) {
      // Create script element for Botpress WebChat
      const script = document.createElement("script");
      script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
      script.async = true;

      // Create script element for initialization
      const script1 = document.createElement("script");
      script1.async = true;
      // Append the main script to the document body
      document.body.appendChild(script);

      // Add event listener for when the script is loaded
      script.onload = () => {
        script1.innerHTML = `window.botpressWebChat.init({
          composerPlaceholder: "Chat with support team",
          botConversationDescription: "Suntem aici pentru a va ajuta!",
          botId: "6338d451-2a60-4f6d-8873-9f9e99c21f11",
          hostUrl: "https://cdn.botpress.cloud/webchat/v1",
          messagingUrl: "https://messaging.botpress.cloud",
          clientId: "6338d451-2a60-4f6d-8873-9f9e99c21f11",
          webhookId: "ae368f40-95a8-4b51-8ed2-c28721b85ede",
          lazySocket: true,
          themeName: "prism",
          botName: "Suport",
          stylesheet:
            "https://webchat-styler-css.botpress.app/prod/code/eeb2ab87-23b6-4467-97ad-f0cf042b46e6/v542/style.css",
          frontendVersion: "v1",
          useSessionStorage: true,
          enableConversationDeletion: true,
          showPoweredBy: true,
          theme: "prism",
          themeColor: "#2563eb",
          allowedOrigins: [],
        });`;

        // Append the initialization script to the document body after the main script is loaded
        document.body.appendChild(script1);
      };

      // Clean up the scripts when the component is unmounted
      return () => {
        document.body.removeChild(script);
        if (script1.parentNode) {
          document.body.removeChild(script1);
        }
      };
    }
  }, []);

  return (
    <div className="App">
      {/* global components */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        closeButton={true}
      />
      {shouldShowMenu && <Meniu />}{" "}
      {/* Afișați meniul numai dacă shouldShowMenu este true */}
      <Routes>
        <Route path={routes.autentificare} element={<Autentificare />} />
        <Route path={routes.pagCheltuieli} element={<Cheltuieli />} />
        <Route path={routes.pagDatorii} element={<Datorii />} />
        <Route
          path={routes.pagEducatieFinanciara}
          element={<EducatieFinanciara />}
        />
        <Route path={routes.pagOverview} element={<Overview />} />
        <Route path={routes.pagVenit} element={<Venit />} />
        <Route path={routes.pagMetadata} element={<Metadata />} />
      </Routes>
    </div>
  );
};

export default App;
