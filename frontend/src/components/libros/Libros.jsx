import React, { useState, useEffect } from "react";
import LibrosBuscar from "./components/libros/LibrosBuscar";
import LibrosRegistro from "./components/libros/LibrosRegistro";
import LibrosListado from "./components/libros/LibrosListado";
import generosService from "../../services/generos.service";
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

      const [Titulo, setTitulo] = useState("");

      const [Items, setItems] = useState(null);
      const [Item, setItem] = useState(null);
      const [RegistrosTotal, setRegistrosTotal] = useState(0);
      const [Pagina, setPagina] = useState(1);
      const [Paginas, setPaginas] = useState([]);

      const [generos, setGeneros] = useState(null);

      useEffect(() => {
            async function BuscarGeneros() {
                  let data = await generosService.getAllGeneros();
                  setGeneros(data);
            }
            BuscarGeneros();
      }, []);

      async function Buscar(_pagina) {
            if (_pagina && _pagina !== Pagina) {
                  setPagina(_pagina);
            } else {
                  _pagina = Pagina;
            }

            const data = await librosService.getAllLibros(Titulo, _pagina);
            modalDialogService.BloquearPantalla(false);

            setItems(data.Libros);
            setRegistrosTotal(data.RegistrosTotal);

            const arrPaginas = [];
            for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
                  arrPaginas.push(i);
            }
            setPaginas(arrPaginas);
      }

      async function BuscarId(item, accionABMC) {
            const data = await librosService.getByIdLibros(item);
            setItem(data);
            setAccionABMC(accionABMC);
      }

      function Consultar(item) {
            BuscarId(item, "C");
      }

      function Modificar(item) {
            BuscarId(item, "M");
      }

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
      }

      const Imprimir = () => {
            {
                  const data = Items.map((item) => ({
                        Título: item.titulo,
                        "Fecha Publicacion": item.fecha_publicacion,
                        Precio: item.precio,
                        Genero: generos.find((genero) => genero.id === item.id_genero)?.nombre || "",
                  }));

                  const worksheet = XLSX.utils.json_to_sheet(data);
                  const workbook = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(workbook, worksheet, "Libros");

                  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
                  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
                  saveAs(dataBlob, "LibrosListado.xlsx");
            };
      }

      async function Eliminar(item) {
            modalDialogService.Confirm(
                  "Esta seguro que quiere eliminar el libro?",
                  undefined,
                  undefined,
                  undefined,
                  async () => {
                        await librosService.Eliminar(item);
                        await Buscar();
                  }
            );
      }

      async function ActivarDesactivar(item) {
            modalDialogService.Confirm(
                  "Esta seguro que quiere " +
                        (item.Activo ? "desactivar" : "activar") +
                        " el registro?",
                  undefined,
                  undefined,
                  undefined,
                  async () => {
                        await librosService.ActivarDesactivar(item);
                        await Buscar();
                  }
            );
      }

      async function Grabar(item) {
            try {
                  await librosService.Grabar(item);
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

                  {AccionABMC === "L" && Items?.length > 0 && (
                        <LibrosListado
                              {...{
                                    Items,
                                    Consultar,
                                    Eliminar,
                                    Modificar,
                                    ActivarDesactivar,
                                    Imprimir,
                                    Pagina,
                                    RegistrosTotal,
                                    Paginas,
                                    Buscar,
                                    generos,
                              }}
                        />
                  )}

                  {AccionABMC === "L" && Items?.length === 0 && (
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
                                    Item, 
                                    Grabar, 
                                    Volver 
                              }}
                        />
                  )}
            </div>
      );
}

export default Libros;