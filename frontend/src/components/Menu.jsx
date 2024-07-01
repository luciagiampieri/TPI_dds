import { NavLink } from "react-router-dom";


function Menu() {
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
              <NavLink className="nav-link" to="/resenas">
                Reseñas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/editoriales">
                Editoriales
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <button className="btn btn-outline-light">Iniciar Sesión</button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


export { Menu };
