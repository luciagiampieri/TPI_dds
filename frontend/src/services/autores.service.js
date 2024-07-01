import axios from 'axios';
import { config } from '../config.js';

const URL = config.urlResourceAutores
const URLP = config.urlResourceAutoresPublico

// Obtener todos los autores con paginación
const getAllAutores = async ({ nombre = ''}) => {
    try {
        const response = await axios.get(URLP, {
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
        const response = await axios.get(`${URLP}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el autor por ID:', error);
        throw error;
    }
};

// Crear un nuevo autor
const createAutor = async (autor) => {
    try {
        console.log("Datos enviados al backend:", autor);
        const response = await axios.post(`${URL}`, autor);
        return response.data;
    } catch (error) {
        console.error('Error al crear el autor:', error);
        throw error;
    }
};

// Actualizar un autor existente
const updateAutor = async (id, autor) => {
    try {
        await axios.put(`${URL}/${id}`, autor);
    } catch (error) {
        console.error('Error al actualizar el autor:', error);
        throw error;
    }
};

// Eliminar un autor
const deleteAutor = async (id) => {
    try {
        await axios.delete(`${URL}/${id}`);
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

export default autoresService;

