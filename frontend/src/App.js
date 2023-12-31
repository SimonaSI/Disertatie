import React from 'react';

import "./App.css";
import { routes } from "./Utils/appRoutes";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Meniu from "./views/Meniu/Meniu";

import Autentificare from './views/PaginaAutentificare/Autentificare';
import Cheltuieli from './views/PaginaCheltuieli/Cheltuieli';
import Datorii from './views/PaginaDatorii/Datorii';
import EducatieFinanciara from './views/PaginaEducatieFinanciara/EducatieFinanciara';
import Overview from './views/PaginaOverview/Overview';
import Venit from './views/PaginaVenit/Venit';
import Metadata from './views/Metadata/Metadata';

const App = () => {
  return (
    <div className="App">
      {/* global components */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        // autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        closeButton={true}
      />
      <Meniu />
      <Routes>
        <Route path={routes.autentificare} element={<Autentificare />} />
        <Route path={routes.pagCheltuieli} element={<Cheltuieli />} />
        <Route path={routes.pagDatorii} element={<Datorii />} />
        <Route path={routes.pagEducatieFinanciara} element={<EducatieFinanciara />} />
        <Route path={routes.pagOverview} element={<Overview />} />
        <Route path={routes.pagVenit} element={<Venit />} />
        <Route path={routes.pagMetadata} element={<Metadata />} />
      </Routes>
    </div>
  );
};

export default App;
