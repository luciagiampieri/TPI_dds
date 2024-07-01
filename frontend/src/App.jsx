import "./App.css";
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { ModalDialog } from "./components/ModalDialog";
import Resenas from "./components/Resenas/Resenas";
import Libros from "./components/Libros/Libros";
import Autores from "./components/Autores/Autores";
import Editoriales from "./components/Editoriales/Editoriales";
import Login from './components/Login';
import AutoresPublico from './components/Autores/AutoresPublico';
import EditorialesPublico from './components/Editoriales/EditorialesPublico';

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  return localStorage.getItem('accessToken') ? (
      children
  ) : (
      <Navigate to="/login" state={{ from: location }} replace />
  );
};
// location.state.from.pathname

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="divBody">
          <ModalDialog />
          <Menu />
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/login" element={<Login />} />

            {/*RUTAS PUBLICAS*/}
            <Route path="/resenas" element={<Resenas />} />
            <Route path="/libros" element={<Libros />} />
            <Route path="/autoresPublico" element={<AutoresPublico/>} />
            <Route path="/editorialesPublico" element={<EditorialesPublico/>} />

            {/*RUTAS PRIVADAS*/} 
            <Route path="/autores" element={<PrivateRoute><Autores /></PrivateRoute>} />
            <Route path="/editoriales" element={<PrivateRoute><Editoriales /></PrivateRoute>} />

            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
