import React from 'react';
import autoresService from "../../services/autores.service";
import tipo_documentosService from "../../services/tipo_documentos.service";
import { useState, useEffect } from 'react';

export default function AutoresPublico() {

    const [Autores, setAutores] = useState([]);
    const [TipoDocumentos, setTipoDocumentos] = useState([]);

    useEffect(() => {
        async function BuscarAutores() {
            let data = await autoresService.getAllAutores({ nombre: "" });
            setAutores(data.Items);
        }
        BuscarAutores();
    }, []);

    useEffect(() => {
        async function BuscarTipoDocumentos() {
            let data = await tipo_documentosService.getAllTipoDocumentos();
            setTipoDocumentos(data);
        }
        BuscarTipoDocumentos();
    }, []);

    return (
        <>
            <h1>Autores</h1>
            {Autores && Autores.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Tipo de Documento</th>
                            <th>Documento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Autores.map((autor) => {
                            const tipoDocumento = TipoDocumentos.find(tipo_documento => tipo_documento.tipo === autor.tipo_documento);
                            return (
                                <tr key={autor.id}>
                                    <td>{autor.nombre}</td>
                                    <td>{autor.apellido}</td>
                                    <td>{autor.fecha_nacimiento}</td>
                                    <td>{tipoDocumento ? tipoDocumento.descripcion : 'Desconocido'}</td>
                                    <td>{autor.nro_documento}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No hay autores disponibles.</p>
            )}
        </>
    );
}
