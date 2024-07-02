import React, { useState } from 'react';
import axios from 'axios';
import { config } from '../config';
import { useNavigate, useLocation } from 'react-router-dom';
import barbie from './images/barbie.jpg';

// Componente para iniciar sesión
const Login = () => {
      const [usuario, setUsuario] = useState(''); // estado para guardar el usuario
      const [clave, setClave] = useState(''); // estado para guardar la clave
      const [message, setMessage] = useState(''); // estado para mostrar mensajes
      const navigate = useNavigate(); // hook para navegar entre rutas
      const location = useLocation(); // hook para obtener la ubicación actual
      const from = location.state?.from?.pathname || '/inicio'; // variable para obtener la ruta anterior

      const handleLogin = async (e) => {
      e.preventDefault();
      try {
            const response = await axios.post(`${config.urlServidor}/api/login`, { usuario, clave });
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setMessage('Inicio de sesión exitoso');
            navigate(from, { replace: true });
      } catch (error) {
            setMessage('Error en el inicio de sesión');
      }
      }; // Función para iniciar sesión

      const handleVolver = () => {
      navigate('/inicio');
      }; // Función para volver a la página de inicio

      return (
            <div className="container mt-5">
            <div className="row justify-content-center">
                  <div className="col-md-6">
                  <div className="card">
                        <div className="card-body text-center">
                              <img src={barbie} alt="Logo" className="mb-3" style={{ maxWidth: '100px' }} />
                              <h5 className="card-title">Iniciar Sesión</h5>
                              <form onSubmit={handleLogin}>
                              <div className="mb-3">
                                    <label htmlFor="usuario" className="col-form-label">Usuario</label>
                                    <input
                                    type="text"
                                    id="usuario"
                                    className="form-control"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    />
                              </div>
                              <div className="mb-2">
                                    <label htmlFor="clave" className="col-form-label">Clave</label>
                                    <input
                                    type="password"
                                    id="clave"
                                    className="form-control"
                                    value={clave}
                                    onChange={(e) => setClave(e.target.value)}
                                    />
                              </div>
                              {message && <div className="alert alert-info">{message}</div>}
                              <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleVolver}>Volver</button>
                              </div>
                              </form>
                  </div>
            </div>
            </div>
            </div>
      </div>
      );
};

export default Login;