import React from 'react';

function ResenasBuscar({ Comentario, setComentario, Buscar, Agregar }) {
    return (
        <form name="FormBusqueda">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 col-md-2">
                        <label className="col-form-label">Comentario:</label>
                    </div>
                    <div className="col-sm-8 col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setComentario(e.target.value)}
                            value={Comentario}
                            minLength="3"
                            maxLength="500"
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
                            onClick={() => Buscar(1)}
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

export default ResenasBuscar;