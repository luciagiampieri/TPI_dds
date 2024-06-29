import axios from 'axios';
import { config } from '../config.js';

const URL = config.urlResourceResenas

// Obtener todos los autores con paginación
const getAllResenas = async ({ calificacion = 1, Pagina = 1 }) => {
    try {
        const response = await axios.get(URL, {
            params: {
                calificacion,
                Pagina,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener todas las reseñas:', error);
        throw error;
    }
};


// Obtener un autor por ID
const getResenaById = async (id) => {
    try {
        const response = await axios.get(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la reseña por ID:', error);
        throw error;
    }
};

// Crear un nuevo autor
const createResena = async (resena) => {
    try {
        const response = await axios.post(`${URL}`, resena);
        return response.data;
    } catch (error) {
        console.error('Error al crear la reseña:', error);
        throw error;
    }
};

// Actualizar un autor existente
const updateResena = async (id, resena) => {
    try {
        await axios.put(`${URL}/${id}`, resena);
    } catch (error) {
        console.error('Error al actualizar la reseña:', error);
        throw error;
    }
};

// Eliminar un autor
const deleteResena = async (id) => {
    try {
        await axios.delete(`${URL}/${id}`);
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