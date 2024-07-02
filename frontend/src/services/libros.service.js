import axiosInstance from './axiosInstance';
import { config } from '../config';

// export default librosService;
const URL = config.urlResourceLibros;

// Obtener todos los libros
const getAllLibros = async ({ titulo = '' }) => {
      try {
            const response = await axiosInstance.get(URL, {
                  params: { titulo },
            });
            return response.data;
      } catch (error) {
            console.error('Error al obtener todas los libros:', error);
            throw error;
      }
};

// Obtener un libro por ID
const getByIdLibros = async (id) => {
      try {
            const response = await axiosInstance.get(`${URL}/${id}`);
            return response.data;
      } catch (error) {
            console.error('Error al obtener el libro por ID:', error);
            throw error;
      }
};


const createLibro = async (libro) => {
      try {
            const response = await axiosInstance.post(URL, libro, { headers: { requiresAuth: true } });
            return response.data;
      } catch (error) {
            if (error.response.status === 400) {
                  throw new Error('Ya existe un libro con este título.');
            }
            console.error('Error al crear el libro:', error);
            throw error;
      }
};


// Actualizar un libro existente
const updateLibro = async (id, libro) => {
      try {
            await axiosInstance.put(`${URL}/${id}`, libro, { headers: { requiresAuth: true } });
      } catch (error) {
            
            if (error.response.status === 400) {
            throw new Error('Ya existe un libro con este título.');
      }

           console.error('Error al actualizar el libro:', error);
           throw error;
      }
};

// Eliminar un libro
const deleteLibro = async (id) => {
      try {
            await axiosInstance.delete(`${URL}/${id}`, { headers: { requiresAuth: true } });
      } catch (error) {
            console.error('Error al eliminar el libro:', error);
            throw error;
      }
};


const librosService = {
      getAllLibros,
      getByIdLibros,
      createLibro,
      updateLibro,
      deleteLibro,
};

// Exportar el servicio
export default librosService;
