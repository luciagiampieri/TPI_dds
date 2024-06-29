import React from 'react'

function ResenasBuscar({ Calif, setCalif, Buscar, Agregar }) {
    return (
        <form name="FormBusqueda">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 col-md-2">
                        <label className="col-form-label">Calificación:</label>
                    </div>
                    <div className="col-sm-8 col-md-4">
                        <input
                            type="number"
                            className="form-control"
                            onChange={(e) => setCalif(e.target.value)}
                            value={Calif}
                            min="1"
                            max="5"
                            autoFocus
                        />
                    </div>
                </div>

                <hr />

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