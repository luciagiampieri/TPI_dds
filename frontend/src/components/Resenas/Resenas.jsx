import React, { useState, useEffect } from 'react';
import resenasService from '../../services/resenas.service'; // Asegúrate de que la ruta sea correcta

const Resenas = () => {
    const [resenas, setResenas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newResena, setNewResena] = useState({
        id_libro: '',
        fecha_resena: '',
        comentario: '',
        calificacion: '',
        user_name: '',
    });
    const [refreshKey, setRefreshKey] = useState(0); // Para forzar la actualización

    useEffect(() => {
        fetchResenas();
    }, [refreshKey]); // Dependencia en refreshKey para actualizar la lista

    const fetchResenas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await resenasService.getAllResenas(); // Asegúrate de que el servicio esté correctamente configurado
            setResenas(response.data); // Ajusta según el formato de respuesta del servicio
        } catch (err) {
            setError(err.message || 'Error al cargar las reseñas');
        } finally {
            setLoading(false);
        }
    };

    const handleAddResena = async () => {
        if (!newResena.id_libro || !newResena.fecha_resena || !newResena.comentario || !newResena.calificacion || !newResena.user_name) {
            setError('Todos los campos son requeridos');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            await resenasService.createResena(newResena);
            setNewResena({
                id_libro: '',
                fecha_resena: '',
                comentario: '',
                calificacion: '',
                user_name: '',
            });
            setRefreshKey(prevKey => prevKey + 1); // Forzar la actualización de la lista
        } catch (err) {
            setError(err.message || 'Error al agregar la reseña');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Reseñas</h1>
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {resenas.length === 0 && !loading && <p>No hay reseñas disponibles</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID Libro</th>
                        <th>Fecha Reseña</th>
                        <th>Comentario</th>
                        <th>Calificación</th>
                        <th>Nombre Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {resenas.map((resena) => (
                        <tr key={resena.id}>
                            <td>{resena.id_libro}</td>
                            <td>{new Date(resena.fecha_resena).toLocaleDateString()}</td>
                            <td>{resena.comentario}</td>
                            <td>{resena.calificacion}</td>
                            <td>{resena.user_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h2>Agregar Nueva Reseña</h2>
                <input
                    type="number"
                    placeholder="ID Libro"
                    value={newResena.id_libro}
                    onChange={(e) => setNewResena({ ...newResena, id_libro: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Fecha Reseña"
                    value={newResena.fecha_resena}
                    onChange={(e) => setNewResena({ ...newResena, fecha_resena: e.target.value })}
                />
                <textarea
                    placeholder="Comentario"
                    value={newResena.comentario}
                    onChange={(e) => setNewResena({ ...newResena, comentario: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Calificación (1-5)"
                    min="1"
                    max="5"
                    value={newResena.calificacion}
                    onChange={(e) => setNewResena({ ...newResena, calificacion: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Nombre Usuario"
                    value={newResena.user_name}
                    onChange={(e) => setNewResena({ ...newResena, user_name: e.target.value })}
                />
                <button onClick={handleAddResena}>Agregar Reseña</button>
            </div>
        </div>
    );
};

export default Resenas;
