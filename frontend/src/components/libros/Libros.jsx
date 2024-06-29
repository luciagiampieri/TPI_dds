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
      const [Items, setItems] = useState([]); // estado para mostrar el listado de libros
      const [Item, setItem] = useState(null); // estado para mostrar el libro en el formulario
      const [RegistrosTotal, setRegistrosTotal] = useState(0); // estado para mostrar la cantidad de registros
      const [Pagina, setPagina] = useState(1); // estado para mostrar la página actual
      const [Paginas, setPaginas] = useState([]); // estado para mostrar las páginas disponibles

      const [autores, setAutores] = useState([]); // estado para mostrar los autores disponibles
      const [editoriales, setEditoriales] = useState([]); // estado para mostrar las editoriales disponibles
      const [generos, setGeneros] = useState([]); // estado para mostrar los géneros disponibles

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
                  setAutores(data);
            }
            BuscarAutores();
      }, []);

      useEffect(() => {
            async function BuscarEditoriales() {
                  let data = await editorialesService.getAllEditoriales();
                  setEditoriales(data);
            }
            BuscarEditoriales();
      }, []);

      async function Buscar(_pagina) {
            if (_pagina && _pagina !== Pagina) {
                  setPagina(_pagina); // Si se pasa la página por parámetro, se actualiza el estado
            } else {
                  _pagina = Pagina; // Si no se pasa la página por parámetro, se usa la página actual
            }

            const data = await librosService.getAllLibros(Titulo, _pagina); // Busca los libros según el título y la página
            modalDialogService.BloquearPantalla(false); // Desbloquea la pantalla

            setItems(data.Items); // Actualiza el estado con los libros encontrados
            setRegistrosTotal(data.RegistrosTotal); // Actualiza el estado con la cantidad de registros encontrados

            const arrPaginas = [];
            for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
                  arrPaginas.push(i);
            }
            setPaginas(arrPaginas); // Actualiza el estado con las páginas disponibles
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
                  id: 0,
                  titulo: "",
                  fecha_publicacion: moment().format("YYYY-MM-DD"),
                  precio: 0,
                  id_genero: 0,
            });
            modalDialogService.Alert("preparando el Alta...");
            console.log(Item);
      } // Agrega un libro y actualiza el estado con el libro creado??? y el tipo de acción.

      const Imprimir = () => {
            const data = Items.map((item) => ({
                  Título: item.titulo,
                  "Fecha Publicacion": item.fecha_publicacion,
                  Autor: autores.find((autor) => autor.id === item.id_autor)?.nombre || "",
                  Editorial: editoriales.find((editorial) => editorial.id === item.id_editorial)?.nombre || "",
                  Precio: item.precio,
                  Genero: generos.find((genero) => genero.id === item.id_genero)?.nombre || "",
            })); // Mapea los libros encontrados y los muestra en el listado.

            const worksheet = XLSX.utils.json_to_sheet(data); // Convierte los datos a una hoja de cálculo
            const workbook = XLSX.utils.book_new(); // Crea un libro de trabajo
            XLSX.utils.book_append_sheet(workbook, worksheet, "Libros"); // Agrega la hoja de cálculo al libro de trabajo

            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" }); // Escribe el libro de trabajo en un buffer
            const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" }); // Crea un blob con el buffer
            saveAs(dataBlob, "LibrosListado.xlsx"); // Descarga el archivo
      };

      async function Eliminar(item) {
            modalDialogService.Confirm(
                  "Esta seguro que quiere eliminar el libro?",
                  async () => {
                        await librosService.deleteLibro(item.id);
                        await Buscar();
                  }
            );
      } // Elimina un libro y actualiza el estado con los libros encontrados.

      async function Grabar(item) {
            try {
                  await librosService.saveLibros(item);
            } catch (error) {
                  modalDialogService.Alert(
                        error?.response?.data?.message ?? error.toString()
                  );
                  return;
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

                  {AccionABMC === "L" && Items && Items.length > 0 && (
                        <LibrosListado
                              {...{
                                    Items,
                                    Consultar,
                                    Eliminar,
                                    Modificar,
                                    Imprimir,
                                    Pagina,
                                    RegistrosTotal,
                                    Paginas,
                                    Buscar,
                                    generos,
                                    autores,
                                    editoriales,
                              }}
                        />
                  )}

                  {AccionABMC === "L" && Items && Items.length === 0 && (
                        <div className="alert alert-info mensajesAlert">
                              <i className="fa fa-exclamation-sign"></i>
                              No se encontraron registros...
                        </div>
                  )}

                  {AccionABMC !== "L" && (
                        <LibrosRegistro
                              {...{
                                    AccionABMC,
                                    generos,
                                    autores,
                                    editoriales,
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

