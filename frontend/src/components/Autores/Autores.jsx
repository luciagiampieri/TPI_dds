import React, { useState, useEffect } from "react";
import AutoresBuscar from "./AutoresBuscar";
import AutoresListado from "./AutoresListado";
import AutoresRegistro from "./AutoresRegistro";
import autoresService from "../../services/autores.service";
import modalDialogService from "../../services/modalDialog.service";
import tipo_documentosService from "../../services/tipo_documentos.service";


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
    const [Autor, setAutor] = useState([]); // estado para mostrar el listado de autores
    const [Item, setItem] = useState(null); // estado para mostrar el autor en el formulario
    const [ Tipo_Doc, setTipo_Doc] = useState(""); // estado para mostrar el tipo de documento en el formulario

    useEffect(() => {
        async function BuscarTipo_Doc() {
            let data = await tipo_documentosService.getAllTipoDocumentos();
            setTipo_Doc(data);
        }
        BuscarTipo_Doc();
    }, []); // useEffect se ejecuta solo una vez. Busca los autores disponibles.

    useEffect(() => {
        Buscar();
    }, [Nombre]); // useEffect se ejecuta cada vez que Nombre o Pagina cambian.


    async function Buscar() {
        modalDialogService.BloquearPantalla(true); // Bloquea la pantalla
        const data = await autoresService.getAllAutores({ nombre: Nombre }); // Busca los autores según el nombre
        modalDialogService.BloquearPantalla(false); // Desbloquea la pantalla

        setAutor(data.Items); // Actualiza el estado con los autores encontrados
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
            tipo_documento: 0,
            nro_documento: "",
            nombre: "",
            apellido: "",
            fecha_nacimiento: moment().format("YYYY-MM-DD"),
        });
        modalDialogService.Alert("preparando el Alta...");
        console.log(Item);
    } // Agrega un autor y actualiza el estado con el autor creado y el tipo de acción.

    const Imprimir = () => {
        const data = Autor.map((item) => ({
            "Tipo Documento": Tipo_Doc.find((tipo_doc) => tipo_doc.tipo === item.tipo_documento)?.descripcion || "",
            "Nro Documento": item.nro_documento,
            Nombre: item.nombre,
            Apellido: item.apellido,
            "Fecha Nacimiento": item.fecha_nacimiento,
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
        Buscar();
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

            {AccionABMC === "L" && Autor && Autor.length > 0 && (
                <AutoresListado
                    {...{
                        Items: Autor,
                        Consultar,
                        Eliminar,
                        Modificar,
                        Imprimir,
                        Tipo_Doc,
                    }}
                />
            )}

            {AccionABMC === "L" && Autor && Autor.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            )}

            {AccionABMC !== "L" && (
                <AutoresRegistro
                    {...{
                        AccionABMC,
                        Tipo_Doc,
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
