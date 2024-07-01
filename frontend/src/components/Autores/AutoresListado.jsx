import React from "react";
import moment from "moment";

export default function AutoresListado({
    Items,
    Consultar,
    Eliminar,
    Modificar,
    Imprimir,
    Tipodoc = [], // Asegurarse de que Paises está en las props y tenga un valor por defecto
}) {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="text-center">Tipo documento</th>
                        <th className="text-center">Numero documento </th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Apellido</th>
                        <th className="text-center">Fecha nacimiento</th>
                    </tr>
                </thead>
                <tbody>
                {Items.map((Item) => (
                    <tr key={Item.id}>
                        <td className="text-center align-middle">
                            {Tipodoc.find((tipodoc) => tipodoc.tipo === Item.tipo_documento)?.descripcion|| ""}
                        </td>
                        <td className="text-center align-middle">{Item.nro_documento}</td>
                        <td className="text-center align-middle">{Item.nombre}</td>
                        <td className="text-center align-middle">{Item.apellido}</td>
                        <td className="text-center align-middle">{moment(Item.fecha_nacimiento).format("YYYY-MM-DD")}</td>
                        
                        <td className="text-center align-middle text-nowrap">
                            <button
                                className="btn btn-sm btn-outline-primary"
                                title="Consultar"
                                onClick={() => Consultar(Item)}
                            >
                                <i className="fa fa-eye"></i>
                            </button>
                            <button
                                className="btn btn-sm btn-outline-primary"
                                title="Modificar"
                                onClick={() => Modificar(Item)}
                            >
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                title="Eliminar"
                                onClick={() => Eliminar(Item)}
                            >
                                <i className="fa fa-times"></i>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="row">
                <div className="col">
                    <span className="pyBadge">Registros: {Items.length}</span>
                </div>
                <div className="col">
                    <button className="btn btn-primary float-end" onClick={Imprimir}>
                        <i className="fa fa-print"></i> Imprimir
                    </button>
                </div>
            </div>
            
        </div>
    );
}
