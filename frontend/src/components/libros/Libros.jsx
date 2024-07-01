import React, { useState, useEffect } from "react";
import LibrosBuscar from "./LibrosBuscar";
import LibrosRegistro from "./LibrosRegistro";
import LibrosListado from "./LibrosListado";
import generosService from "../../services/generos.service";
import autoresService from "../../services/autores.service";
import editorialesService from "../../services/editoriales.service";
import librosService from "../../services/libros.service";
import modalDialogService from "../../services/modalDialog.service";

import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Libros() {
      const TituloAccionABMC = {
            A: "(Agregar)",
            B: "(Eliminar)",
            M: "(Modificar)",
            C: "(Consultar)",
            L: "(Listado)",
      };
      const [AccionABMC, setAccionABMC] = useState("L");

      const [Titulo, setTitulo] = useState(""); // estado para filtrar la búsqueda de libros
      const [Libro, setLibro] = useState([]); // estado para mostrar el listado de libros
      const [Item, setItem] = useState(null); // estado para mostrar el libro en el formulario

      const [Autores, setAutores] = useState([]); // estado para mostrar los autores disponibles
      const [Editoriales, setEditoriales] = useState([]); // estado para mostrar las editoriales disponibles
      const [Generos, setGeneros] = useState([]); // estado para mostrar los géneros disponibles

      useEffect(() => {
            async function BuscarGeneros() {
                  let data = await generosService.getAllGeneros();
                  setGeneros(data);
            }
            BuscarGeneros();
      }, []); // useEffect se ejecuta solo una vez. Busca los géneros disponibles.

      useEffect(() => {
            async function BuscarAutores() {
                  let data = await autoresService.getAllAutores();
                  setAutores(data.Items || []);
            }
            BuscarAutores();
      }, []);

      useEffect(() => {
            async function BuscarEditoriales() {
                  let data = await editorialesService.getAllEditoriales({ nombre: "" });
                  setEditoriales(data.Items || []); // Asegurarse de que data.Items sea un array
            }
            BuscarEditoriales();
      }, []);

      useEffect(() => {
            Buscar();
      }, [Titulo]);

      async function Buscar() {
            modalDialogService.BloquearPantalla(true); // Bloquea la pantalla
            const data = await librosService.getAllLibros({ titulo: Titulo }); // Busca los libros según el título
            modalDialogService.BloquearPantalla(false); // Desbloquea la pantalla

            setLibro(data.Items); // Actualiza el estado con los libros encontrados
      }

      async function BuscarId(item, accionABMC) {
            const data = await librosService.getByIdLibros(item.id);
            setItem(data);
            setAccionABMC(accionABMC);
      } // Busca un libro por ID y actualiza el estado con el libro encontrado y el tipo de acción.

      function Consultar(item) {
            BuscarId(item, "C");
      } // Consulta un libro por ID y actualiza el estado con el libro encontrado y el tipo de acción.

      function Modificar(item) {
            BuscarId(item, "M");
      } // Modifica un libro por ID y actualiza el estado con el libro encontrado y el tipo de acción.

      async function Agregar() {
            setAccionABMC("A");
            setItem({
                  titulo: "",
                  fecha_publicacion: moment().format("YYYY-MM-DD"),
                  precio: 0,
                  id_genero: 0,
            });
            modalDialogService.Alert("preparando el Alta...");
            console.log(Item);
      } // Agrega un libro y actualiza el estado con el libro creado y el tipo de acción.

      const Imprimir = () => {
            const data = Libro.map((item) => ({
                  Título: item.titulo,
                  "Fecha Publicacion": item.fecha_publicacion,
                  Autor:
                        Autores.find((autor) => autor.id === item.id_autor)?.nombre || "",
                  Editorial:
                        Editoriales.find((editorial) => editorial.id === item.id_editorial)
                              ?.nombre || "",
                  Precio: item.precio,
                  Genero: Generos.find((genero) => genero.id === item.id_genero)?.nombre || "",
            })); // Mapea los libros encontrados y los muestra en el listado.

            const worksheet = XLSX.utils.json_to_sheet(data); // Convierte los datos a una hoja de cálculo
            const workbook = XLSX.utils.book_new(); // Crea un libro de trabajo
            XLSX.utils.book_append_sheet(workbook, worksheet, "Libros"); // Agrega la hoja de cálculo al libro de trabajo

            const excelBuffer = XLSX.write(workbook, {
                  bookType: "xlsx",
                  type: "array",
            }); // Escribe el libro de trabajo en un buffer
            const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" }); // Crea un blob con el buffer
            saveAs(dataBlob, "LibrosListado.xlsx"); // Descarga el archivo
      };

      async function Eliminar(item) {
            await librosService.deleteLibro(item.id);
            Buscar();
      } // Elimina un libro y actualiza el estado con los libros encontrados.

      async function Grabar(item) {
            if (AccionABMC === "A") {
                  await librosService.createLibro(item);
            } else if (AccionABMC === "M") {
                  await librosService.updateLibro(item.id, item);
            }

            await Buscar();
            Volver();

            setTimeout(() => {
                  modalDialogService.Alert(
                        "Registro " +
                              (AccionABMC === "A" ? "agregado" : "modificado") +
                              " correctamente."
                  );
            }, 0);
      }

      function Volver() {
            setAccionABMC("L");
      }

      return (
            <div>
                  <div className="tituloPagina">
                        Libros <small>{TituloAccionABMC[AccionABMC]}</small>
                  </div>

                  {AccionABMC === "L" && (
                        <LibrosBuscar
                              {...{
                                    Titulo,
                                    setTitulo,
                                    Buscar,
                                    Agregar,
                              }}
                        />
                  )}

                  {AccionABMC === "L" && Libro && Libro.length > 0 && (
                        <LibrosListado
                              {...{
                                    Items: Libro,
                                    Consultar,
                                    Eliminar,
                                    Modificar,
                                    Imprimir,
                                    Generos,
                                    Autores,
                                    Editoriales,
                              }}
                        />
                  )}

                  {AccionABMC === "L" && Libro && Libro.length === 0 && (
                        <div className="alert alert-info mensajesAlert">
                              <i className="fa fa-exclamation-sign"></i>
                              No se encontraron registros...
                        </div>
                  )}

                  {AccionABMC !== "L" && (
                        <LibrosRegistro
                              {...{
                                    AccionABMC,
                                    Generos,
                                    Autores,
                                    Editoriales,
                                    Item,
                                    Grabar,
                                    Volver,
                              }}
                        />
                  )}
            </div>
      );
}

export default Libros;