import React from "react";
import moment from "moment";

// Componente para mostrar el listado de libros
export default function LibrosListado({
    Items,
    Consultar,
    Eliminar,
    Modificar,
    Imprimir,
    Generos = [],
    Autores = [],
    Editoriales = [],
}) {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="text-center align-middle" style={{ width: "15%" }}>Título</th>
                        <th className="text-center align-middle" style={{ width: "10%" }}>Fecha Publicación</th>
                        <th className="text-center align-middle" style={{ width: "10%" }}>Autor</th>
                        <th className="text-center align-middle" style={{ width: "15" }}>Editorial</th>
                        <th className="text-center align-middle" style={{ width: "8%" }}>Precio</th>
                        <th className="text-center align-middle" style={{ width: "10%" }}>Género</th>
                        <th className="text-center align-middle" style={{ width: "8%" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {Items.map((Item) => (
                    <tr key={Item.id}>
                        <td className="text-center align-middle" style={{ width: "15%" }}>{Item.titulo}</td>
                        <td className="text-center align-middle" style={{ width: "10%" }}>
                            {moment(Item.fecha_publicacion).format("YYYY/MM/DD")}
                        </td>
                        <td className="text-center align-middle" style={{ width: "10%" }}>
                            {Autores.find((autor) => autor.id === Item.id_autor)?.nombre || ""}
                        </td>
                        <td className="text-center align-middle" style={{ width: "15%" }}>
                            {Editoriales.find((editorial) => editorial.id === Item.id_editorial)?.nombre || ""}
                        </td>
                        <td className="text-center align-middle" style={{ width: "8%" }}>{Item.precio}</td>
                        <td className="text-center align-middle" style={{ width: "10%" }}>
                            {Generos.find((genero) => genero.id === Item.id_genero)?.nombre || ""}
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