import React from "react";

// Buscar un libro por título y actualiza el estado con el libro encontrado y el tipo de acción.
function LibrosBuscar({ titulo, setTitulo, Buscar, Agregar }) {
    return (
        <form name="FormBusqueda">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 col-md-2">
                        <label className="col-form-label">Título:</label>
                    </div>
                    <div className="col-sm-8 col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setTitulo(e.target.value)}
                            value={titulo}
                            minLength="2"
                            maxLength="80"
                            autoFocus
                        />
                    </div>
                </div>

                <hr />

                {/* Botones */}
                <div className="row">
                    <div className="col text-center botones">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => Buscar()}
                        >
                            <i className="fa fa-search"> </i> Buscar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => Agregar()}
                        >
                            <i className="fa fa-plus"> </i> Agregar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default LibrosBuscar;