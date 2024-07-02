import React from "react";
import moment from "moment";

export default function AutoresListado({
    Items,
    Consultar,
    Eliminar,
    Modificar,
    Imprimir,
    Tipodoc = [], // Asegurarse de que Tipo_Doc está en las props y tenga un valor por defecto
}) {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        {/* Agregar las columnas de la tabla */}
                        <th className="text-center align-middle" style={{ width: "15%" }}>Tipo documento</th>
                        <th className="text-center align-middle" style={{ width: "10%" }}>Numero documento </th>
                        <th className="text-center align-middle" style={{ width: "15%" }}>Nombre</th>
                        <th className="text-center align-middle" style={{ width: "15%" }}>Apellido</th>
                        <th className="text-center align-middle" style={{ width: "10%" }}>Fecha nacimiento</th>
                        <th className="text-center align-middle" style={{ width: "8%" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Agregar las filas de la tabla */}
                {Items.map((Item) => (
                    <tr key={Item.id}>
                        <td className="text-center align-middle" style={{ width: "15%" }}>
                            {Tipodoc.find((tipodoc) => tipodoc.tipo === Item.tipo_documento)?.descripcion|| ""}
                        </td>
                        <td className="text-center align-middle" style={{ width: "10%" }}>{Item.nro_documento}</td>
                        <td className="text-center align-middle" style={{ width: "15%" }}>{Item.nombre}</td>
                        <td className="text-center align-middle" style={{ width: "15%" }}>{Item.apellido}</td>
                        <td className="text-center align-middle" style={{ width: "10%" }}>{moment(Item.fecha_fundacion).format("YYYY/MM/DD")}</td>
                        
                        <td className="text-center align-middle text-nowrap">
                            {/* Agregar los botones de la tabla */}
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
