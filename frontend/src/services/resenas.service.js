// src/services/resenas.service.js
import http from './http.service';

const API_URL = '/api/resenas';

const getAllResenas = async (params) => {
    const response = await http.get(API_URL, { params });
    return response.data;
};

const getResenaById = async (id) => {
    const response = await http.get(`${API_URL}/${id}`);
    return response.data;
};

const createResena = async (data) => {
    const response = await http.post(API_URL, data);
    return response.data;
};

const updateResena = async (id, data) => {
    await http.put(`${API_URL}/${id}`, data);
};

const deleteResena = async (id) => {
    await http.delete(`${API_URL}/${id}`);
};

const servicios_resenas = {
    getAllResenas,
    getResenaById,
    createResena,
    updateResena,
    deleteResena,
};

export default servicios_resenas;
