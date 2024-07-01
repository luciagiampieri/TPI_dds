// import axios from 'axios';
// import { config } from "../config";


// const URL = config.urlResourceResenas;


// const getAllResenas = async ({ comentario = '' }) => {
//     try {
//         const response = await axios.get(URL, {
//             params: {
//                 comentario,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error al obtener todas las reseñas:', error);
//         throw error;
//     }
// };




// const getResenaById = async (id) => {
//     try {
//         const response = await axios.get(`${URL}/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error al obtener la reseña por ID:', error);
//         throw error;
//     }
// };




// const createResena = async (resena) => {
//     try {
//         const response = await axios.post(URL, resena);
//         return response.data;
//     } catch (error) {
//         console.error('Error al crear la reseña:', error);
//         throw error;
//     }
// };


// const updateResena = async (id, resena) => {
//     try {
//         await axios.put(`${URL}/${id}`, resena);
//     } catch (error) {
//         console.error('Error al actualizar la reseña:', error);
//         throw error;
//     }
// };


// const deleteResena = async (id) => {
//     try {
//         await axios.delete(`${URL}/${id}`);
//     } catch (error) {
//         console.error('Error al eliminar la reseña:', error);
//         throw error;
//     }
// };


// const resenasService = {
//     getAllResenas,
//     getResenaById,
//     createResena,
//     updateResena,
//     deleteResena
// };


// export default resenasService;


import axiosInstance from './axiosInstance';
import { config } from '../config';


const URL = config.urlResourceResenas;


const getAllResenas = async ({ comentario = '' }) => {
    try {
        const response = await axiosInstance.get(URL, {
            params: { comentario },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener todas las reseñas:', error);
        throw error;
    }
};


const getResenaById = async (id) => {
    try {
        const response = await axiosInstance.get(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la reseña por ID:', error);
        throw error;
    }
};


const createResena = async (resena) => {
    try {
        const response = await axiosInstance.post(URL, resena, { headers: { requiresAuth: true } });
        return response.data;
    } catch (error) {
        console.error('Error al crear la reseña:', error);
        throw error;
    }
};


const updateResena = async (id, resena) => {
    try {
        await axiosInstance.put(`${URL}/${id}`, resena, { headers: { requiresAuth: true } });
    } catch (error) {
        console.error('Error al actualizar la reseña:', error);
        throw error;
    }
};


const deleteResena = async (id) => {
    try {
        await axiosInstance.delete(`${URL}/${id}`, { headers: { requiresAuth: true } });
    } catch (error) {
        console.error('Error al eliminar la reseña:', error);
        throw error;
    }
};


const resenasService = {
    getAllResenas,
    getResenaById,
    createResena,
    updateResena,
    deleteResena,
};


export default resenasService;
