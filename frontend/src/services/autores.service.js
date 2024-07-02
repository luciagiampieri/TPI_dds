import axiosInstance from './axiosInstance';
import { config } from '../config.js';

const URL = config.urlResourceAutores
const URLP = config.urlResourceAutoresPublico

// Obtener todos los autores
const getAllAutores = async ({ nombre = ''}) => {
    try {
        const response = await axiosInstance.get(URLP, {
            params: {
                nombre,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener todas los autores:', error);
        throw error;
    }
};

// Obtener un autor por ID
const getAutorById = async (id) => {
    try {
        const response = await axiosInstance.get(`${URLP}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el autor por ID:', error);
        throw error;
    }
};

// Crear un nuevo autor (requiere autenticación)
const createAutor = async (autor) => {
    try {
        console.log("Datos enviados al backend:", autor);
        const response = await axiosInstance.post(`${URL}`, autor, { headers: { requiresAuth: true } });
        return response.data;
    } catch (error) {
        console.error('Error al crear el autor:', error);
        throw error;
    }
};

// Actualizar un autor existente 
const updateAutor = async (id, autor) => {
    try {
        await axiosInstance.put(`${URL}/${id}`, autor, { headers: { requiresAuth: true } });
    } catch (error) {
        console.error('Error al actualizar el autor:', error);
        throw error;
    }
};

// Eliminar un autor  (requiere autenticación)
const deleteAutor = async (id) => {
    try {
        await axiosInstance.delete(`${URL}/${id}`, { headers: { requiresAuth: true } });
    } catch (error) {
        console.error('Error al eliminar el autor:', error);
        throw error;
    }
};


const autoresService = {
    getAllAutores,
    getAutorById,
    createAutor,
    updateAutor,
    deleteAutor,
};

// Exportar el servicio
export default autoresService;

