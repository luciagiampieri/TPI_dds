import React from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import modalDialogService from "../../services/modalDialog.service"; 

// Componente para el registro de editoriales
function EditorialesRegistro({
    AccionABMC,
    Paises, // Corregir la prop a Paises en vez de paises
    Item,
    Grabar,
    Volver,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isValid, isSubmitted },
    } = useForm({ values: Item });

    // const onSubmit = (data) => {
    //     data.fecha_fundacion = moment(data.fecha_fundacion).format("YYYY/MM/DD");
    //     Grabar(data);
    // }; // Función para enviar los datos del formulario al backend

    const onSubmit = async (data) => {
        data.fecha_fundacion = moment(data.fecha_fundacion).format("YYYY-MM-DD");
        try {
              await Grabar(data);
        } catch (error) {
              if (error.message === 'Ya existe la editorial.') {
                    modalDialogService.Alert("Ya existe la editorial.");
        }
  }}; 

    return (
        <div className="container-principal">
            <form className="fregistro" onSubmit={handleSubmit(onSubmit)}>
                <div className="container-fluid">
                    <fieldset disabled={AccionABMC === "C"}>
                        
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

                        {/* campo direccion */}
                        <div className="row">
                            <div className="col-sm-4 col-md-3 offset-md-1">
                                <label className="col-form-label" htmlFor="direccion">
                                    Dirección<span className="text-danger">*</span>:
                                </label>
                            </div>
                            <div className="col-sm-8 col-md-6">
                                <input
                                    type="text"
                                    {...register("direccion", {
                                        required: { 
                                            value: true, 
                                            message: "Dirección es requerida" },
                                        minLength: {
                                            value: 3,
                                            message: "Dirección debe tener al menos 3 caracteres",
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Dirección debe tener como máximo 100 caracteres",
                                        },
                                    })}
                                    className={
                                        "form-control " + (errors?.direccion ? "is-invalid" : "")
                                    }
                                />
                                {errors?.direccion && touchedFields.direccion && (
                                    <div className="invalid-feedback">
                                        {errors?.direccion?.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* campo fecha_fundacion */}
                        <div className="row">
                            <div className="col-sm-4 col-md-3 offset-md-1">
                                <label className="col-form-label" htmlFor="fecha_fundacion">
                                    Fecha Fundacion<span className="text-danger">*</span>:
                                </label>
                            </div>
                            <div className="col-sm-8 col-md-6">
                                <input
                                    type="date"
                                    {...register("fecha_fundacion", {
                                        required: {
                                            value: true,
                                            message: "Fecha Fundacion es requerida",
                                        },
                                    })}
                                    className={
                                        "form-control " + (errors?.fecha_fundacion ? "is-invalid" : "")
                                    }
                                />
                                {errors.fecha_fundacion && touchedFields.fecha_fundacion && (
                                    <div className="invalid-feedback">
                                        {errors.fecha_fundacion.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* campo id_pais */}
                        <div className="row">
                            <div className="col-sm-4 col-md-3 offset-md-1">
                                <label className="col-form-label" htmlFor="id_pais">
                                    Pais<span className="text-danger">*</span>:
                                </label>
                            </div>
                            <div className="col-sm-8 col-md-6">
                                <select
                                    {...register("id_pais", {
                                        required: { 
                                            value: true, 
                                            message: "Pais es requerido" },
                                    })}
                                    className={
                                        "form-control " + (errors?.id_pais ? "is-invalid" : "")
                                    }
                                >
                                    <option value="" key="empty"></option>
                                    {Array.isArray(Paises) &&
                                        Paises.map((x) => (
                                            <option value={x.id} key={x.id}>
                                                {x.nombre}
                                            </option>
                                        ))}
                                </select>
                                {errors.id_pais && touchedFields.id_pais && (
                                    <div className="invalid-feedback">{errors.id_pais.message}</div>
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
        </div>
    );
}

export default EditorialesRegistro;
