import React from "react";
import moment from "moment";
import { useForm } from "react-hook-form";

function ResenasRegistro({ 
    AccionABMC, 
    Libros, 
    Users, 
    Item, 
    Grabar, 
    Volver 
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: Item });

    const onSubmit = (data) => {
        data.fecha_resena = moment(data.fecha_resena).format("YYYY-MM-DD");
        Grabar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
                <fieldset disabled={AccionABMC === "C"}>

                    {/* campo libro */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="id_libro">
                                Libro<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select 
                            {...register("id_libro", { 
                                required: {
                                    value: true,
                                    message: "Libro es requerido"},
                                })} 
                                className={
                                    "form-control " + (errors?.id_libro ? "is-invalid" : "")
                                    }
                            >

                                <option value="" key="empty"></option>
                                {Array.isArray(Libros) && 
                                    Libros.map((x) => (
                                        <option value={x.id} key={x.id}>
                                            {x.titulo}
                                        </option>
                                    ))}
                            </select>
                            {errors.id_libro && touchedFields.id_libro && (
                                <div className="invalid-feedback">{errors.id_libro.message}</div>
                            )}
                        </div>
                    </div>

                    {/* campo fecha_resena */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="fecha_resena">
                                Fecha Reseña<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="date"
                                {...register("fecha_resena", {
                                    required: { 
                                        value: true, 
                                        message: "Fecha reseña es requerido" 
                                    },
                                })}
                                className={
                                    "form-control " + (errors.fecha_resena ? "is-invalid" : "")
                                }
                            />
                            {errors.fecha_resena && touchedFields.fecha_resena && (
                                <div className="invalid-feedback">{errors.fecha_resena.message}</div>
                            )}
                        </div>
                    </div>

                    {/* campo comentario */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="comentario">
                                Comentario<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("comentario", {
                                    required: { 
                                        value: true, 
                                        message: "Comentario es requerido" 
                                    },
                                    minLength: { 
                                        value: 3, 
                                        message: "Comentario debe tener al menos 3 caracteres" 
                                    },
                                    maxLength: { 
                                        value: 500, 
                                        message: "Comentario debe tener como máximo 500 caracteres" 
                                    },
                                })}
                                className={"form-control " + (errors.comentario ? "is-invalid" : "")}
                            />
                            {errors.comentario && touchedFields.comentario && (
                                <div className="invalid-feedback">
                                    {errors.comentario.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* campo calificacion */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="calificacion">
                                Calificación<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="number"
                                {...register("calificacion", {
                                    required: { 
                                        value: true, 
                                        message: "Calificación es requerida" 
                                    },
                                    minLength: { 
                                        value: 1, 
                                        message: "Calificación debe ser mayor o igual a 1" 
                                    },
                                    maxLength: { 
                                        value: 5, 
                                        message: "Calificación debe ser menor o igual a 5" 
                                    },
                                })}
                                className={"form-control " + (errors.calificacion ? "is-invalid" : "")}
                            />
                            {errors.calificacion && touchedFields.calificacion && (
                                <div className="invalid-feedback">{errors.calificacion.message}</div>
                            )}
                        </div>
                    </div>

                    {/* campo user_name */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="user_name">
                                Usuario<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register("user_name", {
                                    required: { 
                                        value: true, 
                                        message: "Usuario es requerido" 
                                    },
                                })}
                                className={
                                    "form-control " + (errors.user_name ? "is-invalid" : "")
                                }
                            >
                                <option value="" key="empty"></option>
                                {Array.isArray(Users) && 
                                    Users.map((x) => (
                                        <option value={x.id} key={x.id}>
                                            {x.user_name}
                                        </option>
                                ))}
                            </select>
                            {errors.user_name && touchedFields.user_name && (
                                <div className="invalid-feedback">{errors.user_name.message}</div>
                            )}
                        </div>
                    </div>
                </fieldset>
                <hr />
                <div className="row justify-content-center">
                    <div className="col text-center botones">
                        {AccionABMC !== "C" && (
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-check"></i> Grabar
                            </button>
                        )}
                        <button type="button" className="btn btn-warning" onClick={Volver}>
                            <i className="fa fa-undo"></i>
                            {AccionABMC === "C" ? " Volver" : " Cancelar"}
                        </button>
                    </div>
                </div>
                {!isValid && isSubmitted && (
                    <div className="row alert alert-danger mensajesAlert">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )}
            </div>
        </form>
    );
}

export default ResenasRegistro;