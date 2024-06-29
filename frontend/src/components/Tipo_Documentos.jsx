import { useState, useEffect } from 'react';
import tipo_documentosService from '../services/tipo_documentos.service';

function Tipo_Documentos() {
    const tituloPagina = 'Tipo de Documentos';
    const [tipodocs, setTipoDocs] = useState("");

    useEffect(() => {
        BuscarTipoDocs();
    }, []);

    async function BuscarTipoDocs() {
        let docs = await tipo_documentosService.getAllTipoDocumentos();
        setTipoDocs(docs);
    };

    return (
        <div>
            <div className="tituloPagina">{tituloPagina}</div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style={{ width: "40%" }}>tipo</th>
                        <th style={{ width: "60%" }}>descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {tipodocs &&
                        tipodocs.map((doc) => (
                            <tr key={doc.tipo}>
                                <td>{doc.tipo}</td>
                                <td>{doc.descripcion}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tipo_Documentos;
