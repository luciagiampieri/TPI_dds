import axios from 'axios';
import { config } from "../config";

const URL = config.urlResourceLibros;

// Obtener todos los libros con paginación
const getAllLibros = async ({ titulo = '', Pagina = 1 }) => {
      try {
            const response = await axios.get(URL, {
                  params: {
                        titulo,
                        Pagina,
                  },
            });
            return response.data; // Asegurarse de devolver el objeto completo
      } catch (error) {
            console.error('Error al obtener todas los libros:', error);
            throw error;
      }
};

// Obtener un libro por ID
const getByIdLibros = async (id) => {
      try {
            const response = await axios.get(`${URL}/${id}`);
            return response.data;
      } catch (error) {
            console.error('Error al obtener el libro por ID:', error);
            throw error;
      }
};

// Crear un nuevo libro
const createLibro = async (libro) => {
      try {
            const response = await axios.post(URL, libro);
            return response.data;
      } catch (error) {
            console.error('Error al crear el libro:', error);
            throw error;
      }
};

// Actualizar un libro existente
const updateLibro = async (id, libro) => {
      try {
            await axios.put(`${URL}/${id}`, libro);
      } catch (error) {
            console.error('Error al actualizar el libro:', error);
            throw error;
      }
};

// Eliminar un libro
const deleteLibro = async (id) => {
      try {
            await axios.delete(`${URL}/${id}`);
      } catch (error) {
            console.error('Error al eliminar el libro:', error);
            throw error;
      }
};

const librosService = {
      getAllLibros,
      getByIdLibros,
      updateLibro,
      createLibro,
      deleteLibro,
};

export default librosService;
