import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Inicio.css';


function Inicio() {
  return (
    <div className="inicio-container">
      <div className="container mt-5 p-5 bg-light rounded text-center shadow-lg">
        <h3 className="mb-4 text-primary display-4">Bienvenido a BarbieBiblioteca</h3>
        <p className="lead mb-4 text-secondary">Gestiona tus libros, reseñas y más con facilidad.</p>

        <div className="row mb-4">
          <div className="col-md-12 mb-3">
            <div className="p-4 bg-white rounded shadow-sm h-100">
              <h5 className="text-info">Tecnologías Utilizadas</h5>
              <p><strong>Backend:</strong> NodeJs, Express, WebApiRest, Swagger, Sequelize, Sqlite.</p>
              <p><strong>Frontend:</strong> Single Page Application con React, HTML, CSS y Bootstrap.</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-6 mb-3">
            <Link to="/libros" className="btn btn-lg btn-outline-primary w-100">
              <i className="fas fa-book"></i> Ver Libros
            </Link>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-6 mb-3">
            <Link to="/resenas" className="btn btn-lg btn-outline-primary w-100">
              <i className="fas fa-star"></i> Ver Reseñas
            </Link>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-6 mb-3">
            <Link to="/editoriales" className="btn btn-lg btn-outline-primary w-100">
              <i class="fa-solid fa-shop"></i> Ver Editoriales
            </Link>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-6 mb-3">
            <Link to="/autores" className="btn btn-lg btn-outline-primary w-100">
            <i class="fa-regular fa-address-book"></i> Ver Autores
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Inicio };