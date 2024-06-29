import React from "react";

export default function AutoresListado({
    Items,
    Consultar,
    Eliminar,
    Modificar,
    Imprimir,
    Pagina,
    RegistrosTotal,
    Paginas,
    Buscar,
    tipo_documento,
}) {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="text-center">Tipo Documento</th>
                        <th className="text-center" style={{ width: "15%" }}>
                            Numero Documento
                        </th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Apellido</th>
                        <th className="text-center">Fecha Nacimiento</th>
                    </tr>
                </thead>
                <tbody>
                {Items.map((Item) => (
                    <tr key={Item.id}>
                        <td className="text-center align-middle" style={{ width: "15%" }}>
                            {tipo_documento.find((TipoDoc) => TipoDoc.tipo === Item.tipo_documento)?.descripcion || ""}
                        </td>
                        <td className="text-center align-middle">{Item.nro_documento}</td>
                        <td className="text-center align-middle">{Item.nombre}</td>
                        <td className="text-center align-middle">{Item.apellido}</td>
                        <td className="text-center align-middle" style={{ width: "15%" }}>
                            {Item.fecha_nacimiento}
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