import axios from 'axios';
import { config } from '../config.js';


const URL = config.urlResourceAutores

// Obtener todos los autores con paginación
const getAllAutores = async ({nombre = ''}) => {
    try {
        const response = await axios.get(URL, {
            params: {
                nombre,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los autores:', error);
        throw error;
    }
};

// Obtener un autor por ID
const getAutorById = async (id) => {
    try {
        const response = await axios.get(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el autor por ID:', error);
        throw error;
    }
};

// Crear un nuevo autor
const createAutor = async (autor) => {
    try {
        const response = await axios.post(URL, autor);
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

