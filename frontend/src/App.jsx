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
            <Route path="/resenas" element={<PrivateRoute><Resenas /></PrivateRoute>} />
            <Route path="/libros" element={<PrivateRoute><Libros /></PrivateRoute>} />
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
