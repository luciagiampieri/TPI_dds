import axiosInstance from './axiosInstance';
import { config } from '../config';


const URL = config.urlResourceResenas;

// Obtener todas las reseñas
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

// Obtener una reseña por ID
const getResenaById = async (id) => {
    try {
        const response = await axiosInstance.get(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la reseña por ID:', error);
        throw error;
    }
};

// Crear una nueva reseña
const createResena = async (resena) => {
    try {
        const response = await axiosInstance.post(URL, resena, { headers: { requiresAuth: true } });
        return response.data;
    } catch (error) {
        console.error('Error al crear la reseña:', error);
        throw error;
    }
};

//  Actualizar una reseña existente
const updateResena = async (id, resena) => {
    try {
        await axiosInstance.put(`${URL}/${id}`, resena, { headers: { requiresAuth: true } });
    } catch (error) {
        console.error('Error al actualizar la reseña:', error);
        throw error;
    }
};

// Eliminar una reseña
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

// Exportar el servicio
export default resenasService;
