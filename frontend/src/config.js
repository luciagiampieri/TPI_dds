import axios from 'axios';
import refreshToken from './services/auth.service';


/*
En este archivo se definen las URL de los servicios REST que se van a consumir. Para
estandarizar un poco más el proceso y no tener que modificar cada archivo que consuma una URL
*/


// opción 1 cuando se hacen pruebas locales.


const urlServidor = "http://localhost:4444";
const urlResourceLibros = urlServidor + "/api/libros";
const urlResourceEditoriales = urlServidor + "/api/editoriales";
const urlResourceAutores = urlServidor + "/api/autores";
const urlResourceResenas = urlServidor + "/api/resenas";
const urlResourceResenasPublico = urlServidor + "/api/resenasALL";
const urlResourceLibrosPublico = urlServidor + "/api/librosALL";


// Interceptor para manejar la renovación del token
axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshToken();
            return axios(originalRequest);
        }
        return Promise.reject(error);
    }
);


const accessToken = localStorage.getItem('accessToken');


if (accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}


export const config = {
    urlServidor,
    urlResourceLibros,
    urlResourceEditoriales,
    urlResourceAutores,
    urlResourceResenas,
    urlResourceResenasPublico,
    urlResourceLibrosPublico
};
