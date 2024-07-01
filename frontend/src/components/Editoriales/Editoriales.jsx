import React, { useState, useEffect } from "react";
import EditorialesBuscar from "./EditorialesBuscar";
import EditorialesListado from "./EditorialesListado";
import EditorialesRegistro from "./EditorialesRegistro";
import editorialesService from "../../services/editoriales.service";
import paisesService from "../../services/paises.service";
import modalDialogService from "../../services/modalDialog.service";

import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Editoriales() {
    const TituloAccionABMC = {
        A: "(Agregar)",
        B: "(Eliminar)",
        M: "(Modificar)",
        C: "(Consultar)",
        L: "(Listado)",
    };

    const [AccionABMC, setAccionABMC] = useState("L");
    const [Nombre, setNombre] = useState(""); // estado para filtrar la búsqueda de autores
    const [Editorial, setEditorial] = useState([]); // estado para mostrar el listado de autores
    const [Item, setItem] = useState(null); // estado para mostrar el autor en el formulario
    const [Paises, setPaises] = useState([]); // estado para guardar los países

    useEffect(() => {
        async function BuscarPaises() {
            let data = await paisesService.getAllPaises();
            setPaises(data); // Guardar los países en el estado
        }
        BuscarPaises();
    }, []); // useEffect se ejecuta solo una vez. Busca los autores disponibles.

    useEffect(() => {
        Buscar();
    }, [Nombre]); // useEffect se ejecuta cada vez que Nombre o Pagina cambian.

    async function Buscar() {
        modalDialogService.BloquearPantalla(true); // Bloquea la pantalla
        const data = await editorialesService.getAllEditoriales({ nombre: Nombre }); // Busca los libros según el título
        modalDialogService.BloquearPantalla(false); // Desbloquea la pantalla

        setEditorial(data.Items); // Actualiza el estado con los libros encontrados
    }

    async function BuscarId(item, accionABMC) {
        const data = await editorialesService.getEditorialById(item.id);
        setItem(data);
        setAccionABMC(accionABMC);
    } // Busca un autor por ID y actualiza el estado con el autor encontrado y el tipo de acción.

    function Consultar(item) {
        BuscarId(item, "C");
    } // Consulta un autor por ID y actualiza el estado con el autor encontrado y el tipo de acción.

    function Modificar(item) {
        BuscarId(item, "M");
    } // Modifica una editorial por ID y actualiza el estado con el autor encontrado y el tipo de acción.

    async function Agregar() {
        setAccionABMC("A");
        setItem({
            nombre: "",
            direccion: "",
            fecha_fundacion: moment().format("YYYY-MM-DD"),
            id_pais: "",
        });
        modalDialogService.Alert("preparando el Alta...");
        console.log(Item);
    } // Agrega una editorial y actualiza el estado con el autor creado y el tipo de acción.

    const Imprimir = () => {
        const data = Editorial.map((item) => ({
            Nombre: item.nombre,
            Direccion: item.direccion,
            "Fecha Fundacion": item.fecha_fundacion,
            Pais: Paises.find((pais) => pais.id === item.id_pais)?.nombre || "",
        })); // Mapea los autores encontrados y los muestra en el listado.

        const worksheet = XLSX.utils.json_to_sheet(data); // Convierte los datos a una hoja de cálculo
        const workbook = XLSX.utils.book_new(); // Crea un libro de trabajo
        XLSX.utils.book_append_sheet(workbook, worksheet, "Editoriales"); // Agrega la hoja de cálculo al libro de trabajo

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" }); // Escribe el libro de trabajo en un buffer
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" }); // Crea un blob con el buffer
        saveAs(dataBlob, "EditorialListado.xlsx"); // Descarga el archivo
    };


    async function Eliminar(item) {
        modalDialogService.Confirm(
            "¿Estás seguro de que deseas eliminar esta editorial?",
            "Confirmar eliminación",
            "Sí",
            "No",
            async () => {
                await editorialesService.deleteEditorial(item.id);
                modalDialogService.Alert("Editorial eliminada correctamente.", "Eliminación exitosa", "Aceptar", "", null, null, "success");
                setTimeout(() => {
                    Buscar();
                }, 3000);
            },
            null,
            'warning'
        );
    }

    async function Grabar(item) {
        if (AccionABMC === "A") {
            await editorialesService.createEditorial(item);
        } else if (AccionABMC === "M") {
            await editorialesService.updateEditorial(item.id, item);
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
                Editoriales <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>

            {AccionABMC === "L" && (
                <EditorialesBuscar
                    {...{
                        Nombre,
                        setNombre,
                        Buscar,
                        Agregar,
                    }}
                />
            )}

            {AccionABMC === "L" && Editorial && Editorial.length > 0 && (
                <EditorialesListado
                    {...{
                        Items: Editorial,
                        Consultar,
                        Eliminar,
                        Modificar,
                        Imprimir,
                        Paises, // Pasar los países al componente EditorialesListado
                    }}
                />
            )}

            {AccionABMC === "L" && Editorial && Editorial.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            )}

            {AccionABMC !== "L" && (
                <EditorialesRegistro
                    {...{
                        AccionABMC,
                        Paises, // Pasar los países al componente EditorialesRegistro
                        Item,
                        Grabar,
                        Volver,
                    }}
                />
            )}
        </div>
    );
}

export default Editoriales;
