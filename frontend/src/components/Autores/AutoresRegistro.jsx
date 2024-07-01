import React from "react";
import moment from "moment";
import { useForm } from "react-hook-form";

function AutoresRegistro({
    AccionABMC,
    Tipodoc,
    Item,
    Grabar,
    Volver,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({
        defaultValues: Item || {
            tipo_documento: "",
            nro_documento: "",
            nombre: "",
            apellido: "",
            fecha_nacimiento: ""
        }
    });

    const onSubmit = (data) => {
        console.log("Datos del formulario:", data);
        data.fecha_nacimiento = moment(data.fecha_nacimiento).format("YYYY-MM-DD");
        Grabar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
                <fieldset disabled={AccionABMC === "C"}>
                    {/* campo tipo documento */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="tipo_documento">
                                Tipo Documento<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                {...register("tipo_documento", {
                                    required: { value: true, message: "Tipo documento es requerido" },
                                })}
                                className={
                                    "form-control " + (errors?.tipo_documento ? "is-invalid" : "")
                                }
                            >
                                <option value="" key="empty"></option>
                                {Array.isArray(Tipodoc) &&
                                    Tipodoc.map((x) => (
                                        <option value={x.tipo} key={x.tipo}>
                                            {x.descripcion}
                                        </option>
                                    ))}
                            </select>
                            <div className="invalid-feedback">
                                {errors?.tipo_documento?.message}
                            </div>
                        </div>
                    </div>
                    
                    {/* campo nro documento */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="nro_documento">
                                Numero documento<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                {...register("nro_documento", {
                                    required: { value: true, message: "El numero de documento es requerido" },
                                    minLength: {
                                        value: 7,
                                        message: "El numero debe tener al menos 7 caracteres",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "El numero debe tener como máximo 20 caracteres",
                                    },
                                })}
                                className={
                                    "form-control " + (errors?.nro_documento? "is-invalid" : "")
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

                    {/* campo apellido */}
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
                                    required: { value: true, message: "Apellido es requerido" },
                                    minLength: {
                                        value: 2,
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
                                        message: "Fecha nacimiento es requerida",
                                    },
                                })}
                                className={
                                    "form-control " + (errors?.fecha_nacimiento ? "is-invalid" : "")
                                }
                            />
                            <div className="invalid-feedback">
                                {errors?.fecha_nacimiento?.message}
                            </div>
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
