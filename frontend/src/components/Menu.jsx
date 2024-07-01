/* import React from 'react';
import { NavLink } from 'react-router-dom';
import logout from '../services/auth.service';

function Menu() {
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="/inicio">
          <i className="fa-solid fa-book-open"></i>
          &nbsp;<i>BarbieBiblioteca</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/libros">
                Libros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/autores">
                Autores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/autoresPublico">
                Autores (Público)
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/resenas">
                Reseñas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/editoriales">
                Editoriales
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/editorialesPublico">
                Editoriales (Público)
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <button className="btn btn-outline-light">Iniciar Sesión</button>
              </NavLink>
            </li>
            {localStorage.getItem('accessToken') && (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { Menu };
 */

import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import {config} from '../config';

function Menu() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await axios.post(`${config.urlServidor}/api/logout`, { token: refreshToken });
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="/inicio">
          <i className="fa-solid fa-book-open"></i>
          &nbsp;<i>BarbieBiblioteca</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/libros">
                Libros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/autores">
                Autores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/autoresPublico">
                Autores (Público)
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/resenas">
                Reseñas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/editoriales">
                Editoriales
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/editorialesPublico">
                Editoriales (Público)
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item d-flex align-items-center me-2">
              <NavLink className="nav-link p-0" to="/login">
                <button className="btn btn-outline-light">Iniciar Sesión</button>
              </NavLink>
            </li>
            <li className="nav-item d-flex align-items-center">
              <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar Sesión</button>
            </li>
        </ul>
        </div>
      </div>
    </nav>
  );
}

export { Menu };
