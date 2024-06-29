// src/App.jsx
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
//import { Series } from "./components/Series/Series";
import Libros from "./components/libros/Libros";
import Generos from "./components/Generos";
import { ModalDialog } from "./components/ModalDialog";


function App() {
  return (
    <>
      <BrowserRouter>
        <div className="divBody">
        <ModalDialog />
        <Menu />
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          {/*<Route path="/series" element={<Series />} />*/}
          <Route path="/libros" element={<Libros />} />
          <Route path="/genero" element={<Generos />} />
          <Route path="/documentales" element={<Inicio />} />
          <Route path="/cortos" element={<Inicio />} />
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
