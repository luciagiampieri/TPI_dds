// import axios from 'axios';
// import { config } from '../config.js';


// const URL = config.urlResourceEditoriales;


// // Obtener todas las editoriales con paginación
// const getAllEditoriales = async ({ nombre = '' }) => {
//     try {
//         const response = await axios.get(URL, {
//             params: {
//                 nombre,
//             },
//         });
//         return response.data; // Asegurarse de devolver el objeto completo
//     } catch (error) {
//         console.error('Error al obtener todas las editoriales:', error);
//         throw error;
//     }
// };


// // Obtener una editorial por ID
// const getEditorialById = async (id) => {
//     try {
//         const response = await axios.get(`${URL}/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error al obtener la editorial por ID:', error);
//         throw error;
//     }
// };


// // Crear una nueva editorial
// const createEditorial = async (editorial) => {
//     try {
//         const response = await axios.post(URL, editorial);
//         return response.data;
//     } catch (error) {
//         console.error('Error al crear la editorial:', error);
//         throw error;
//     }
// };


// // Actualizar una editorial existente
// const updateEditorial = async (id, editorial) => {
//     try {
//         await axios.put(`${URL}/${id}`, editorial);
//     } catch (error) {
//         console.error('Error al actualizar la editorial:', error);
//         throw error;
//     }
// };


// // Eliminar una editorial
// const deleteEditorial = async (id) => {
//     try {
//         await axios.delete(`${URL}/${id}`);
//     } catch (error) {
//         console.error('Error al eliminar la editorial:', error);
//         throw error;
//     }
// };


// const editorialesService = {
//     getAllEditoriales,
//     getEditorialById,
//     createEditorial,
//     updateEditorial,
//     deleteEditorial,
// };


// export default editorialesService;


import axiosInstance from './axiosInstance';
import { config } from '../config.js';


const URL = config.urlResourceEditoriales;
const URLP = config.urlResourceEditorialesPublico;


// Obtener todas las editoriales con paginación
const getAllEditoriales = async ({ nombre = '' }) => {
    try {
        const response = await axiosInstance.get(URLP, { params: { nombre } });
        return response.data;
    } catch (error) {
        console.error('Error al obtener todas las editoriales:', error);
        throw error;
    }
};


// Obtener una editorial por ID
const getEditorialById = async (id) => {
    try {
        const response = await axiosInstance.get(`${URLP}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la editorial por ID:', error);
        throw error;
    }
};


// Crear una nueva editorial (requiere autenticación)
const createEditorial = async (editorial) => {
    try {
        const response = await axiosInstance.post(URL, editorial, { headers: { requiresAuth: true } });
        return response.data;
    } catch (error) {
        console.error('Error al crear la editorial:', error);
        throw error;
    }
};


// Actualizar una editorial existente (requiere autenticación)
const updateEditorial = async (id, editorial) => {
    try {
        await axiosInstance.put(`${URL}/${id}`, editorial, { headers: { requiresAuth: true } });
    } catch (error) {
        console.error('Error al actualizar la editorial:', error);
        throw error;
    }
};


// Eliminar una editorial (requiere autenticación)
const deleteEditorial = async (id) => {
    try {
        await axiosInstance.delete(`${URL}/${id}`, { headers: { requiresAuth: true } });
    } catch (error) {
        console.error('Error al eliminar la editorial:', error);
        throw error;
    }
};


const editorialesService = {
    getAllEditoriales,
    getEditorialById,
    createEditorial,
    updateEditorial,
    deleteEditorial,
};


export default editorialesService;


