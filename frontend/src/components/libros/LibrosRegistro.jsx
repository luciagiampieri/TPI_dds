import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";

function LibrosRegistro({
      AccionABMC,
      generos,
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
            //data.fecha_publicacion = moment(data.fecha_publicacion).format("YYYY-MM-DD");
            Grabar(data);
      };

      return (
      <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">

                  <fieldset disabled={AccionABMC === "C"}>

                        {/* campo titulo */}
                        <div className="row">
                              <div className="col-sm-4 col-md-3 offset-md-1">
                                    <label className="col-form-label" htmlFor="titulo">
                                          Título<span className="text-danger">*</span>:
                                    </label>
                              </div>
                              <div className="col-sm-8 col-md-6">
                                    <input
                                          type="text"
                                          {...register("titulo", {
                                                required: { value: true, message: "Título es requerido" },
                                                minLength: {
                                                      value: 2,
                                                      message: "Título debe tener al menos 2 caracteres",
                                                },
                                                maxLength: {
                                                      value: 80,
                                                      message: "Título debe tener como máximo 80 caracteres",
                                                },
                                                unique: { value: true, message: "Título ya existe" },
                                          })}
                                          autoFocus
                                          className={
                                                "form-control " + (errors?.titulo ? "is-invalid" : "")
                                          }
                                    />
                                    {errors?.titulo && touchedFields.titulo && (
                                    <div className="invalid-feedback">
                                          {errors?.titulo?.message}
                                    </div>
                                    )}
                              </div>
                        </div>

                        {/* campo fecha Publicacion */}
                        <div className="row">
                              <div className="col-sm-4 col-md-3 offset-md-1">
                                    <label className="col-form-label" htmlFor="fecha_publicacion">
                                          Fecha Publicacion<span className="text-danger">*</span>:
                                    </label>
                              </div>
                              <div className="col-sm-8 col-md-6">
                                    <input
                                          type="date"
                                          {...register("fecha_publicacion", {
                                                required: { 
                                                      value: true, 
                                                      message: "Fecha Publicacion es requerida" }
                                          })}
                                          className={
                                                "form-control " + (errors?.fecha_publicacion ? "is-invalid" : "")
                                          }
                                    />
                                    <div className="invalid-feedback">
                                          {errors?.fecha_publicacion?.message}
                                    </div>
                              </div>
                        </div>

                        {/* campo idAutor */}
                        <div className="row">
                              <div className="col-sm-4 col-md-3 offset-md-1">
                                    <label className="col-form-label" htmlFor="id_autor">
                                          Autor<span className="text-danger">*</span>:
                                    </label>
                              </div>
                              <div className="col-sm-8 col-md-6">
                                    <select
                                          {...register("id_autor", {
                                                required: { 
                                                      value: true, 
                                                      message: "Autor es requerido" },
                                          })}
                                          className={
                                                "form-control " +
                                                (errors?.id_autor ? "is-invalid" : "")
                                          }
                                          >
                                          <option value="" key={1}></option>
                                          {Array.isArray(autores) && generos.map((x) => (
                                                <option value={x.id_autor} key={x.id_autor}>
                                                      {x.nombre}
                                                </option>
                                          ))}
                                    </select>
                                    <div className="invalid-feedback">
                                          {errors?.id_autor?.message}
                                    </div>
                              </div>
                        </div>

                        {/* campo idEditorial */}
                        <div className="row">
                              <div className="col-sm-4 col-md-3 offset-md-1">
                                    <label className="col-form-label" htmlFor="id_editorial">
                                          Editorial<span className="text-danger">*</span>:
                                    </label>
                              </div>
                              <div className="col-sm-8 col-md-6">
                                    <select
                                          {...register("id_editorial", {
                                                required: { 
                                                      value: true, 
                                                      message: "Editorial es requerido" },
                                          })}
                                          className={
                                                "form-control " +
                                                (errors?.id_editorial ? "is-invalid" : "")
                                          }
                                          >
                                          <option value="" key={1}></option>
                                          {Array.isArray(editorial) && generos.map((x) => (
                                                <option value={x.id_editorial} key={x.id_editorial}>
                                                      {x.nombre}
                                                </option>
                                    ))}
                                    </select>
                                    <div className="invalid-feedback">
                                          {errors?.id_editorial?.message}
                                    </div>
                              </div>
                        </div>
                  
                        {/* campo precio */}
                        <div className="row">
                              <div className="col-sm-4 col-md-3 offset-md-1">
                                    <label className="col-form-label" htmlFor="precio">
                                          Precio<span className="text-danger">*</span>:
                                    </label>
                              </div>
                              <div className="col-sm-8 col-md-6">
                                    <input
                                          type="number"
                                                {...register("precio", {
                                                      required: { 
                                                            value: true, 
                                                            message: "Precio es requerido" },
                                                      min: {
                                                            value: 0,
                                                            message: "Precio debe ser al menos 0",
                                                      },
                                                })}
                                                className={
                                                      "form-control " + (errors?.precio ? "is-invalid" : "")
                                                }
                                    />
                                    <div className="invalid-feedback">
                                          {errors?.precio?.message}
                                    </div>
                              </div>
                        </div>


                        {/* campo id_genero */}
                        <div className="row">
                              <div className="col-sm-4 col-md-3 offset-md-1">
                                    <label className="col-form-label" htmlFor="id_genero">
                                          Género<span className="text-danger">*</span>:
                                    </label>
                              </div>
                              <div className="col-sm-8 col-md-6">
                                    <select
                                          {...register("id_genero", {
                                                required: { 
                                                      value: true, 
                                                      message: "Género es requerido" },
                                          })}
                                          className={
                                                "form-control " +
                                                (errors?.id_genero ? "is-invalid" : "")
                                          }
                                    >
                                    <option value="" key={1}></option>
                                    {Array.isArray(generos) && generos.map((x) => (
                                          <option value={x.id_genero} key={x.id_genero}>
                                                {x.nombre}
                                          </option>
                                    ))}
                                    </select>
                                    <div className="invalid-feedback">
                                          {errors?.id_genero?.message}
                                    </div>
                              </div>
                        </div>

                        <div className="row">
                              <div className="col-sm-4 col-md-3 offset-md-1">
                                    <label className="col-form-label" htmlFor="idGenero">
                                          Género<span className="text-danger">*</span>:
                                    </label>
                              </div>
                              <div className="col-sm-8 col-md-6">
                                    <select
                                          {...register("id_genero", {
                                                required: { value: true, message: "Genero es requerido" },
                                          })}
                                          className={
                                                "form-control " +
                                                (errors?.id_genero ? "is-invalid" : "")
                                          }
                                          >
                                          <option value="" key={1}></option>
                                          {id_genero?.map((x) => (
                                                <option value={x.id_genero} key={x.id_genero}>
                                                      {x.nombre}
                                                </option>
                                          ))}
                                    </select>
                                    <div className="invalid-feedback">
                                          {errors?.id_genero?.message}
                                    </div>
                              </div>
                        </div>


                  </fieldset>

                  {/* Botones Grabar, Cancelar/Volver' */}
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

export default LibrosRegistro;