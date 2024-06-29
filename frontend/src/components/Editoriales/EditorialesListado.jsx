import React from "react";
import moment from "moment";

export default function EditorialesListado({
    Items,
    Consultar,
    Eliminar,
    Modificar,
    Imprimir,
    Pagina,
    RegistrosTotal,
    Paginas,
    Buscar,
    Paises = [], // Asegurarse de que Paises está en las props y tenga un valor por defecto
}) {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="text-center">Nombre</th>
                        <th className="text-center" style={{ width: "15%" }}>
                            Dirección
                        </th>
                        <th className="text-center">Fecha Fundacion</th>
                        <th className="text-center">Pais</th>
                    </tr>
                </thead>
                <tbody>
                {Items.map((Item) => (
                    <tr key={Item.id}>
                        <td className="text-center align-middle">{Item.nombre}</td>
                        <td className="text-center align-middle">{Item.direccion}</td>
                        <td className="text-center align-middle">{moment(Item.fecha_fundacion).format("YYYY/MM/DD")}</td>
                        <td className="text-center align-middle" style={{ width: "15%" }}>
                            {Paises.find((pais) => pais.id === Item.id_pais)?.nombre || ""}
                        </td>
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

            <div className="paginador">
                <div className="row">
                    <div className="col">
                        <span className="pyBadge">Registros: {RegistrosTotal}</span>
                    </div>
                    <div className="col text-center">
                        Pagina: &nbsp;
                        <select
                            value={Pagina}
                            onChange={(e) => {
                                Buscar(e.target.value);
                            }}
                        >
                            {Paginas?.map((x) => (
                                <option value={x} key={x}>
                                    {x}
                                </option>
                            ))}
                        </select>

                        &nbsp; de {Paginas?.length}
                    </div>
                    <div className="col">
                        <button className="btn btn-primary float-end" onClick={Imprimir}>
                            <i className="fa fa-print"></i> Imprimir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
