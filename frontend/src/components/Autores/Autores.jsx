import React, { useState, useEffect } from "react";
import AutoresBuscar from "./AutoresBuscar";
import AutoresListado from "./AutoresListado";
import AutoresRegistro from "./AutoresRegistro";
import autoresService from "../../services/autores.service";
import modalDialogService from "../../services/modalDialog.service";


import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Autores() {
    const TituloAccionABMC = {
        A: "(Agregar)",
        B: "(Eliminar)",
        M: "(Modificar)",
        C: "(Consultar)",
        L: "(Listado)",
    };
    const [AccionABMC, setAccionABMC] = useState("L");

    const [Nombre, setNombre] = useState(""); // estado para filtrar la búsqueda de autores
    const [Items, setItems] = useState([]); // estado para mostrar el listado de autores
    const [Item, setItem] = useState(null); // estado para mostrar el autor en el formulario
    const [RegistrosTotal, setRegistrosTotal] = useState(0); // estado para mostrar la cantidad de registros
    const [Pagina, setPagina] = useState(1); // estado para mostrar la página actual
    const [Paginas, setPaginas] = useState([]); // estado para mostrar las páginas disponibles

    useEffect(() => {
        async function BuscarAutores() {
            let data = await autoresService.getAllAutores();
            setItems(data);
        }
        BuscarAutores();
    }, []); // useEffect se ejecuta solo una vez. Busca los autores disponibles.

    async function Buscar(_pagina) {
        if (_pagina && _pagina !== Pagina) {
            setPagina(_pagina); // Si se pasa la página por parámetro, se actualiza el estado
        } else {
            _pagina = Pagina; // Si no se pasa la página por parámetro, se usa la página actual
        }

        const data = await autoresService.getAllAutores({ nombre: Nombre, pagina: _pagina }); // Busca los autores según el título y la página

        setItems(data); // Actualiza el estado con los autores encontrados
        setRegistrosTotal(data.length); // Actualiza el estado con la cantidad de registros encontrados

        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.length / 10); i++) {
            arrPaginas.push(i);
        }
        setPaginas(arrPaginas); // Actualiza el estado con las páginas disponibles
    }

    async function BuscarId(item, accionABMC) {
        const data = await autoresService.getAutorById(item.id);
        setItem(data);
        setAccionABMC(accionABMC);
    } // Busca un autor por ID y actualiza el estado con el autor encontrado y el tipo de acción.

    function Consultar(item) {
        BuscarId(item, "C");
    } // Consulta un autor por ID y actualiza el estado con el autor encontrado y el tipo de acción.

    function Modificar(item) {
        BuscarId(item, "M");
    } // Modifica un autor por ID y actualiza el estado con el autor encontrado y el tipo de acción.

    async function Agregar() {
        setAccionABMC("A");
        setItem({
            id: 0,
            tipo_documento: "",
            nro_documento: "",
            nombre: "",
            apellido: "",
            fecha_nacimiento: moment().format("YYYY-MM-DD"),
        });
        console.log(Item);
    } // Agrega un autor y actualiza el estado con el autor creado y el tipo de acción.

    const Imprimir = () => {
        const data = Items.map((item) => ({
            Nombre: item.nombre,
            Apellido: item.apellido,
            "Fecha Nacimiento": item.fecha_nacimiento,
            "Tipo Documento": item.tipo_documento,
            "Nro Documento": item.nro_documento,
        })); // Mapea los autores encontrados y los muestra en el listado.

        const worksheet = XLSX.utils.json_to_sheet(data); // Convierte los datos a una hoja de cálculo
        const workbook = XLSX.utils.book_new(); // Crea un libro de trabajo
        XLSX.utils.book_append_sheet(workbook, worksheet, "Autores"); // Agrega la hoja de cálculo al libro de trabajo

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" }); // Escribe el libro de trabajo en un buffer
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" }); // Crea un blob con el buffer
        saveAs(dataBlob, "AutoresListado.xlsx"); // Descarga el archivo
    };

    async function Eliminar(item) {
        await autoresService.deleteAutor(item.id);
        await Buscar();
    } // Elimina un autor y actualiza el estado con los autores encontrados.

    async function Grabar(item) {
        if (AccionABMC === "A") {
            await autoresService.createAutor(item);
        } else if (AccionABMC === "M") {
            await autoresService.updateAutor(item.id, item);
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
                Autores <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>

            {AccionABMC === "L" && (
                <AutoresBuscar
                    {...{
                        Nombre,
                        setNombre,
                        Buscar,
                        Agregar,
                    }}
                />
            )}

            {AccionABMC === "L" && Items && Items.length > 0 && (
                <AutoresListado
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
                <AutoresRegistro
                    {...{
                        AccionABMC,
                        Item,
                        Grabar,
                        Volver,
                    }}
                />
            )}
        </div>
    );
}

export default Autores;
