// src/App.jsx
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { ModalDialog } from "./components/ModalDialog";
import Resenas from "./components/Resenas/Resenas";
//import Libros from "./components/Libros/Libros";
import Autores from "./components/Autores/Autores";
import Editoriales from "./components/Editoriales/Editoriales";


function App() {
  return (
    <>
      <BrowserRouter>
        <div className="divBody">
        <ModalDialog />
        <Menu />
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/resenas" element={<Resenas />} />
          {/*<Route path="/libros" element={<Libros />} />*/}
          <Route path="/autores" element={<Autores />} />
          <Route path="/editoriales" element={<Editoriales />} />
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
