// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { config } from '../config';
// // import { useNavigate } from 'react-router-dom';


// // const Login = () => {
// //     const [usuario, setUsuario] = useState('');
// //     const [clave, setClave] = useState('');
// //     const [message, setMessage] = useState('');
// //     const navigate = useNavigate();


// //     const handleLogin = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const response = await axios.post(`${config.urlServidor}/api/login`, { usuario, clave });
// //             const { accessToken, refreshToken } = response.data;
// //             localStorage.setItem('accessToken', accessToken);
// //             localStorage.setItem('refreshToken', refreshToken);
// //             setMessage('Inicio de sesión exitoso');
// //             navigate('/inicio');
// //         } catch (error) {
// //             setMessage('Error en el inicio de sesión');
// //         }
// //     };


// //     const handleVolver = () => {
// //         navigate('/inicio');
// //     };


// //     return (
// //         <form onSubmit={handleLogin}>
// //             <div>
// //                 <label htmlFor="usuario">Usuario:</label>
// //                 <input
// //                     type="text"
// //                     id="usuario"
// //                     value={usuario}
// //                     onChange={(e) => setUsuario(e.target.value)}
// //                 />
// //             </div>
// //             <div>
// //                 <label htmlFor="clave">Clave:</label>
// //                 <input
// //                     type="password"
// //                     id="clave"
// //                     value={clave}
// //                     onChange={(e) => setClave(e.target.value)}
// //                 />
// //             </div>
// //             <button type="submit">Iniciar Sesión</button>
// //             {message && <p>{message}</p>}
// //             <button type="button" onClick={handleVolver}>Volver</button>
// //         </form>
// //     );
// // };


// // export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { config } from '../config';
// import { useNavigate, useLocation } from 'react-router-dom';


// const Login = () => {
//     const [usuario, setUsuario] = useState('');
//     const [clave, setClave] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || '/inicio';


//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${config.urlServidor}/api/login`, { usuario, clave });
//             const { accessToken, refreshToken } = response.data;
//             localStorage.setItem('accessToken', accessToken);
//             localStorage.setItem('refreshToken', refreshToken);
//             setMessage('Inicio de sesión exitoso');
//             navigate(from, { replace: true });
//         } catch (error) {
//             setMessage('Error en el inicio de sesión');
//         }
//     };


//     const handleVolver = () => {
//         navigate('/inicio');
//     };


//     return (
//         <form onSubmit={handleLogin}>
//             <div>
//                 <label htmlFor="usuario">Usuario:</label>
//                 <input
//                     type="text"
//                     id="usuario"
//                     value={usuario}
//                     onChange={(e) => setUsuario(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="clave">Clave:</label>
//                 <input
//                     type="password"
//                     id="clave"
//                     value={clave}
//                     onChange={(e) => setClave(e.target.value)}
//                 />
//             </div>
//             <button type="submit">Iniciar Sesión</button>
//             {message && <p>{message}</p>}
//             <button type="button" onClick={handleVolver}>Volver</button>
//         </form>
//     );
// };


// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { config } from '../config';
import { useNavigate, useLocation } from 'react-router-dom';


const Login = () => {
      const [usuario, setUsuario] = useState('');
      const [clave, setClave] = useState('');
      const [message, setMessage] = useState('');
      const navigate = useNavigate();
      const location = useLocation();
      const from = location.state?.from?.pathname || '/inicio';


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
      };


      const handleVolver = () => {
            navigate('/inicio');
      };


      return (
            <form onSubmit={handleLogin}>
                  <div>
                  <label htmlFor="usuario">Usuario:</label>
                  <input
                        type="text"
                        id="usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                  />
                  </div>
                  <div>
                  <label htmlFor="clave">Clave:</label>
                  <input
                        type="password"
                        id="clave"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                  />
                  </div>
                  <button type="submit">Iniciar Sesión</button>
                  {message && <p>{message}</p>}
                  <button type="button" onClick={handleVolver}>Volver</button>
            </form>
      );
      };


export default Login;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { config } from '../config';
// import { useNavigate, useLocation } from 'react-router-dom';


// const Login = () => {
//     const [usuario, setUsuario] = useState('');
//     const [clave, setClave] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || '/inicio';


//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(`${config.urlServidor}/api/login`, { usuario, clave });
//             const { accessToken, refreshToken } = response.data;
//             localStorage.setItem('accessToken', accessToken);
//             localStorage.setItem('refreshToken', refreshToken);
//             setMessage('Inicio de sesión exitoso');
//             navigate(from, { replace: true });
//         } catch (error) {
//             setMessage('Error en el inicio de sesión');
//         }
//     };


//     const handleVolver = () => {
//         navigate('/inicio');
//     };


//     return (
//         <form onSubmit={handleLogin}>
//             <div>
//                 <label htmlFor="usuario">Usuario:</label>
//                 <input
//                     type="text"
//                     id="usuario"
//                     value={usuario}
//                     onChange={(e) => setUsuario(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="clave">Clave:</label>
//                 <input
//                     type="password"
//                     id="clave"
//                     value={clave}
//                     onChange={(e) => setClave(e.target.value)}
//                 />
//             </div>
//             <button type="submit">Iniciar Sesión</button>
//             {message && <p>{message}</p>}
//             <button type="button" onClick={handleVolver}>Volver</button>
//         </form>
//     );
// };


// export default Login;
