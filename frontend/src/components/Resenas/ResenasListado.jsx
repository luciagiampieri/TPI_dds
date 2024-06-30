import React from "react";
import moment from "moment";

export default function ResenasListado({
    Items,
    Consultar,
    Eliminar,
    Modificar,
    Imprimir,
    Pagina,
    RegistrosTotal,
    Paginas,
    Buscar,
    Libros = []
}) {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="text-center">Libro</th>
                        <th className="text-center" style={{ width: "15%" }}>
                            Fecha Reseña
                        </th>
                        <th className="text-center">Comentario</th>
                        <th className="text-center">Calificación</th>
                        <th className="text-center">Usuario</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Items.map((Item) => (
                        <tr key={Item.id}>
                            <td className="text-center align-middle" style={{ width: "15%" }}>
                                {Libros.find((libro) => libro.id === Item.id_libro)?.titulo || ""}
                            </td>
                            <td className="text-center align-middle">{moment(Item.fecha_resena).format("YYYY/MM/DD")}</td>
                            <td className="text-center align-middle">{Item.comentario}</td>
                            <td className="text-center align-middle">{Item.calificacion}</td>
                            <td className="text-center align-middle">{Item.user_name}</td>
                            <td className="text-center align-middle text-nowrap">
                                <button className="btn btn-sm btn-outline-primary" title="Consultar" onClick={() => Consultar(Item)}>
                                    <i className="fa fa-eye"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-primary" title="Modificar" onClick={() => Modificar(Item)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger" title="Eliminar" onClick={() => Eliminar(Item)}>
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
                        <select value={Pagina} onChange={(e) => Buscar(Number(e.target.value))}>
                            {Paginas.map((x) => (
                                <option value={x} key={x}>{x}</option>
                            ))}
                        </select>
                        &nbsp; de {Paginas.length}
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