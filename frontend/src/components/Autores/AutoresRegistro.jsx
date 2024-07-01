import React from "react";
import moment from "moment";
import { useForm } from "react-hook-form";

function AutoresRegistro({
    AccionABMC,
    Tipo_Documento, // Corregir la prop a Paises en vez de paises
    Item,
    Grabar,
    Volver,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: Item });

    const onSubmit = (data) => {
        data.fecha_nacimiento = moment(data.fecha_nacimiento).format("YYYY/MM/DD");
        Grabar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
                <fieldset disabled={AccionABMC === "C"}>

                        {/* campo tipo_documento */}
                        <div className="row">
                            <div className="col-sm-4 col-md-3 offset-md-1">
                                <label className="col-form-label" htmlFor="tipo_documento">
                                    Tipo Documento<span className="text-danger">*</span>:
                                </label>
                            </div>
                            <div className="col-sm-8 col-md-6">
                                <select
                                    {...register("tipo_documento", {
                                        required: { 
                                            value: true, 
                                            message: "Tipo de Documento es requerido" },
                                    })}
                                    className={
                                        "form-control " + (errors?.tipo_documento ? "is-invalid" : "")
                                    }
                                >
                                    <option value="" key="empty"></option>
                                    {Array.isArray(Tipo_Documento) &&
                                        Tipo_Documento.map((x) => (
                                            <option value={x.id} key={x.id}>
                                                {x.descripcion}
                                            </option>
                                        ))}
                                </select>
                                {errors.tipo_documento && touchedFields.tipo_documento && (
                                    <div className="invalid-feedback">{errors.tipo_documento.message}</div>
                                )}
                            </div>
                        </div>

                        {/* campo nro_documento */}
                        <div className="row">
                            <div className="col-sm-4 col-md-3 offset-md-1">
                                <label className="col-form-label" htmlFor="nro_documento">
                                    Numero Documento<span className="text-danger">*</span>:
                                </label>
                            </div>
                            <div className="col-sm-8 col-md-6">
                                <input
                                    type="text"
                                    {...register("nro_documento", {
                                        required: {
                                            value: true,
                                            message: "Numero de Documento es requerido",
                                        },
                                        minLength: {
                                            value: 7,
                                            message: "Numero de Documento debe tener al menos 7 caracteres",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "Numero de Documento debe tener como máximo 20 caracteres",
                                        },
                                    })}
                                    className={
                                        "form-control " + (errors?.nro_documento ? "is-invalid" : "")
                                    }
                                />
                                {errors?.nro_documento && touchedFields.nro_documento && (
                                    <div className="invalid-feedback">
                                        {errors?.nro_documento?.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* campo nombre */}
                        <div className="row">
                            <div className="col-sm-4 col-md-3 offset-md-1">
                                <label className="col-form-label" htmlFor="nombre">
                                    Nombre<span className="text-danger">*</span>:
                                </label>
                            </div>
                            <div className="col-sm-8 col-md-6">
                                <input
                                    type="text"
                                    {...register("nombre", {
                                        required: { value: true, message: "Nombre es requerido" },
                                        minLength: {
                                            value: 3,
                                            message: "Nombre debe tener al menos 3 caracteres",
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Nombre debe tener como máximo 50 caracteres",
                                        },
                                    })}
                                    className={
                                        "form-control " + (errors?.nombre ? "is-invalid" : "")
                                    }
                                />
                                {errors?.nombre && touchedFields.nombre && (
                                    <div className="invalid-feedback">
                                        {errors?.nombre?.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-4 col-md-3 offset-md-1">
                                <label className="col-form-label" htmlFor="apellido">
                                    Apellido<span className="text-danger">*</span>:
                                </label>
                            </div>
                            <div className="col-sm-8 col-md-6">
                                <input
                                    type="text"
                                    {...register("apellido", {
                                        required: { 
                                            value: true, 
                                            message: "Apellido es requerido" },
                                        minLength: {
                                            value: 3,
                                            message: "Apellido debe tener al menos 3 caracteres",
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Apellido debe tener como máximo 50 caracteres",
                                        },
                                    })}
                                    className={
                                        "form-control " + (errors?.apellido ? "is-invalid" : "")
                                    }
                                />
                                {errors?.apellido && touchedFields.apellido && (
                                    <div className="invalid-feedback">
                                        {errors?.apellido?.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    

                        {/* campo fecha_nacimiento */}
                        <div className="row">
                            <div className="col-sm-4 col-md-3 offset-md-1">
                                <label className="col-form-label" htmlFor="fecha_nacimiento">
                                    Fecha Nacimiento<span className="text-danger">*</span>:
                                </label>
                            </div>
                            <div className="col-sm-8 col-md-6">
                                <input
                                    type="date"
                                    {...register("fecha_nacimiento", {
                                        required: {
                                            value: true,
                                            message: "Fecha Nacimiento es requerida",
                                        },
                                    })}
                                    className={
                                        "form-control " + (errors?.fecha_nacimiento ? "is-invalid" : "")
                                    }
                                />
                                {errors.fecha_nacimiento && touchedFields.fecha_nacimiento && (
                                    <div className="invalid-feedback">
                                        {errors.fecha_nacimiento.message}
                                    </div>
                                )}
                            </div>
                        </div>

                </fieldset>

                {/* Botones Grabar, Cancelar/Volver */}
                <hr />
                <div className="row justify-content-center">
                    <div className="col text-center botones">
                        {AccionABMC !== "C" && (
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-check"></i> Grabar
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => Volver()}
                        >
                            <i className="fa fa-undo"></i>
                            {AccionABMC === "C" ? " Volver" : " Cancelar"}
                        </button>
                    </div>
                </div>

                {/* texto: Revisar los datos ingresados... */}
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

export default AutoresRegistro;
