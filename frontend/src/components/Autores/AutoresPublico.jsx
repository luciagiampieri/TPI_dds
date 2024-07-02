import React from 'react';
import autoresService from "../../services/autores.service";
import tipo_documentosService from "../../services/tipo_documentos.service";
import { useState, useEffect } from 'react';
import moment from 'moment';

export default function AutoresPublico() {

    const [Autores, setAutores] = useState([]); // estado para guardar los autores
    const [TipoDocumentos, setTipoDocumentos] = useState([]); // estado para guardar los tipo_doc

    useEffect(() => {
        async function BuscarAutores() {
            let data = await autoresService.getAllAutores({ nombre: "" });
            setAutores(data.Items);
        }
        BuscarAutores();
    }, []); // useEffect se ejecuta solo una vez buscando autores

    useEffect(() => {
        async function BuscarTipoDocumentos() {
            let data = await tipo_documentosService.getAllTipoDocumentos();
            setTipoDocumentos(data);
        }
        BuscarTipoDocumentos();
    }, []); // useEffect se ejecuta solo una vez buscando tipo_doc

    return (
        <>
            <div>
                <h1 className='tituloPagina'>
                    Autores
                </h1>
            </div>
            {Autores && Autores.length > 0 ? (
                <table className="table table-hover table-sm table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: "10%" }}>Nombre</th>
                            <th className="text-center" style={{ width: "10%" }}>Apellido</th>
                            <th className="text-center" style={{ width: "10%" }}>Fecha de Nacimiento</th>
                            <th className="text-center" style={{ width: "15%" }}>Tipo de Documento</th>
                            <th className="text-center" style={{ width: "10%" }}>Numero Documento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Autores.map((autor) => {
                            const tipoDocumento = TipoDocumentos.find(tipo_documento => tipo_documento.tipo === autor.tipo_documento);
                            return (
                                <tr key={autor.id}>
                                    <td className="text-center" style={{ width: "10%" }}>{autor.nombre}</td>
                                    <td className="text-center" style={{ width: "10%" }}>{autor.apellido}</td>
                                    <td className="text-center" style={{ width: "10%" }}>{moment(autor.fecha_fundacion).format("YYYY/MM/DD")}</td>
                                    <td className="text-center" style={{ width: "15%" }}>{tipoDocumento ? tipoDocumento.descripcion : 'Desconocido'}</td>
                                    <td className="text-center" style={{ width: "10%" }}>{autor.nro_documento}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No hay autores disponibles.</p>
            )}
            <div className="row">
            <div className="col">
                <span className="pyBadge">Registros: {Autores.length}</span>
            </div>
        </div>
        </>
    );
}
