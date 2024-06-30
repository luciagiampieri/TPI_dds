import axios from 'axios';
import { config } from '../config.js';

const URL = config.urlResourceEditoriales

// Obtener todos las editoriales con paginación
const getAllEditoriales = async ( nombre = '', Pagina = 1 ) => {
    try {
        const response = await axios.get(`${URL}`, {
            params: {
                nombre,
                Pagina: Pagina,
            },
        });
        return response.data.Items;
    } catch (error) {
        console.error('Error al obtener todas las editoriales:', error);
        throw error;
    }
};

// Obtener una editorial por ID
const getEditorialById = async (id) => {
    try {
        const response = await axios.get(`${URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la editorial por ID:', error);
        throw error;
    }
};

// Crear un nuevo editorial
const createEditorial = async (editorial) => {
    try {
        const response = await axios.post(`${URL}`, editorial);
        return response.data;
    } catch (error) {
        console.error('Error al crear la editorial:', error);
        throw error;
    }
};

// Actualizar una editorial existente
const updateEditorial = async (id, editorial) => {
    try {
        await axios.put(`${URL}/${id}`, editorial);
    } catch (error) {
        console.error('Error al actualizar la editorial:', error);
        throw error;
    }
};

// Eliminar una editorial
const deleteEditorial = async (id) => {
    try {
        await axios.delete(`${URL}/${id}`);
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
