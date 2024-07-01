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
        <div>
            <h1 className='tituloPagina'>
                Editoriales
            </h1>
        </div>
        {Editoriales && Editoriales.length > 0 ? (
            <table className="table table-hover table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="text-center" style={{ width: "15%" }}>Nombre</th>
                        <th className="text-center" style={{ width: "15%" }}>Dirección</th>
                        <th className="text-center" style={{ width: "10%" }}>Fecha de Fundación</th>
                        <th className="text-center" style={{ width: "10%" }}>País</th>
                    </tr>
                </thead>
                <tbody>
                    {Editoriales.map((editorial) => {
                        const pais = Paises.find(pais => pais.id === editorial.id_pais);
                        return (
                            <tr key={editorial.id}>
                                <td className="text-center" style={{ width: "15%" }}>{editorial.nombre}</td>
                                <td className="text-center" style={{ width: "15%" }}>{editorial.direccion}</td>
                                <td className="text-center" style={{ width: "10%" }}>{editorial.fecha_fundacion}</td>
                                <td className="text-center" style={{ width: "10%" }}>{pais ? pais.nombre : 'Desconocido'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        ) : (
            <p>No hay editoriales disponibles.</p>
        )}
        <div className="row">
            <div className="col">
                <span className="pyBadge">Registros: {Editoriales.length}</span>
            </div>
        </div>
    </>
    )
}
