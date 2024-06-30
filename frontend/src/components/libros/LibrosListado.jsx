import React from "react";
import moment from "moment";

export default function LibrosListado({
    Items,
    Consultar,
    Eliminar,
    Modificar,
    Imprimir,
    Pagina,
    RegistrosTotal,
    Paginas,
    Buscar,
    Generos = [],
    Autores = [],
    Editoriales = [],
}) {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="text-center">Título</th>
                        <th className="text-center" style={{ width: "15%" }}>Fecha Publicación</th>
                        <th className="text-center">Autor</th>
                        <th className="text-center">Editorial</th>
                        <th className="text-center">Precio</th>
                        <th className="text-center text-nowrap">Genero</th>
                    </tr>
                </thead>
                <tbody>
                {Items.map((Item) => (
                    <tr key={Item.id}>
                        <td className="text-center align-middle">{Item.titulo}</td>
                        <td className="text-center align-middle">
                            {moment(Item.fecha_publicacion).format("YYYY/MM/DD")}
                        </td>
                        <td className="text-center align-middle">
                            {Autores.find((autor) => autor.id === Item.id_autor)?.nombre || ""}
                        </td>
                        <td className="text-center align-middle">
                            {Editoriales.find((editorial) => editorial.id === Item.id_editorial)?.nombre || ""}
                        </td>
                        <td className="text-center align-middle">{Item.precio}</td>
                        <td className="text-center align-middle">
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
                                Buscar(Number(e.target.value));
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