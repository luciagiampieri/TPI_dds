import React from 'react'
import { useState, useEffect } from 'react'
import editorialesService from "../../services/editoriales.service";
import paisesService from "../../services/paises.service";

export default function EditorialesPublico() {

    const [Editoriales, setEditoriales] = useState([]);
    const [Paises, setPaises] = useState([]);

    useEffect(() => {
        async function BuscarEditoriales() {
            let data = await editorialesService.getAllEditoriales({ nombre: "" });
            setEditoriales(data.Items);
        }
        BuscarEditoriales();
    }, []);

    useEffect(() => {
        async function BuscarPaises() {
            let data = await paisesService.getAllPaises();
            setPaises(data);
        }
        BuscarPaises();
    }, []);

    return (
    <>
        <h1>Editoriales</h1>
        {Editoriales && Editoriales.length > 0 ? (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Fecha de Fundación</th>
                        <th>País</th>
                    </tr>
                </thead>
                <tbody>
                    {Editoriales.map((editorial) => {
                        const pais = Paises.find(pais => pais.id === editorial.id_pais);
                        return (
                            <tr key={editorial.id}>
                                <td>{editorial.nombre}</td>
                                <td>{editorial.direccion}</td>
                                <td>{editorial.fecha_fundacion}</td>
                                <td>{pais ? pais.nombre : 'Desconocido'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        ) : (
            <p>No hay editoriales disponibles.</p>
        )}
    </>
    )
}
