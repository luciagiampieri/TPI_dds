import { useState, useEffect } from 'react';
import paisesService from '../services/paises.services';

function Paises() {
    const tituloPagina = 'Paises';
    const [pais, setPais] = useState("");

    useEffect(() => {
        BuscarPaises();
    }, []);

    async function BuscarPaises() {
        let pais = await paisesService.getAllPaises();
        setPais(pais)
    };

    return (
        <div>
            <div className="tituloPagina">{tituloPagina}</div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style={{ width: "40%" }}>Id Pais</th>
                        <th style={{ width: "60%" }}>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {pais &&
                        pais.map((pais) => (
                            <tr key={pais.id}>
                                <td>{pais.id}</td>
                                <td>{pais.nombre}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Paises;
