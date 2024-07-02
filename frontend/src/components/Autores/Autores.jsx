import React, { useState, useEffect } from "react";
import AutoresBuscar from "./AutoresBuscar";  
import AutoresListado from "./AutoresListado";
import AutoresRegistro from "./AutoresRegistro";
import autoresService from "../../services/autores.service";
import tipo_documentosService from "../../services/tipo_documentos.service";
import modalDialogService from "../../services/modalDialog.service";

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
    const [Tipodoc, setTipodoc] = useState([]); // estado para guardar los tipo_doc

    useEffect(() => {
        async function BuscarTipodoc() {
            let data = await tipo_documentosService.getAllTipoDocumentos();
            setTipodoc(data); // Guardar los tipo_doc en el estado
        }
        BuscarTipodoc();
    }, []); // useEffect se ejecuta solo una vez.

    useEffect(() => {
        Buscar();
    }, [Nombre]); // useEffect se ejecuta cada vez que cambia el estado Nombre.

    async function Buscar() {
        
        // Llamar al servicio para buscar autores
        modalDialogService.BloquearPantalla(true); // Bloquear la pantalla mientras se busca autores
        const data = await autoresService.getAllAutores({ nombre: Nombre});
        modalDialogService.BloquearPantalla(false); // Desbloquear la pantalla
    
        setAutor(data.Items);
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
    } // Modifica una editorial por ID y actualiza el estado con el autor encontrado y el tipo de acción.

    async function Agregar() {
        setAccionABMC("A");
        setItem({
            tipo_documento: "",
            nro_documento: "",
            nombre: "",
            apellido: "",
            fecha_nacimiento: "",
        });
        modalDialogService.Alert("preparando el Alta...");
        console.log(Item);
    } // Agrega un autor y actualiza el estado con el autor creado y el tipo de acción.

    const Imprimir = () => {
        const data = Autor.map((item) => ({
            "Tipo documento": Tipodoc.find((tipodoc) => tipodoc.tipo === item.tipo_documento)?.descripcion || "",
            "Numero documento": item.nro_documento,
            Nombre: item.nombre,
            Apellido: item.apellido,
            "Fecha Fundacion": item.fecha_nacimiento,
        })); // Mapea los autores encontrados y los muestra en el listado.

        const worksheet = XLSX.utils.json_to_sheet(data); // Convierte los datos a una hoja de cálculo
        const workbook = XLSX.utils.book_new(); // Crea un libro de trabajo
        XLSX.utils.book_append_sheet(workbook, worksheet, "Autores"); // Agrega la hoja de cálculo al libro de trabajo

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" }); // Escribe el libro de trabajo en un buffer
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" }); // Crea un blob con el buffer
        saveAs(dataBlob, "AutoresListado.xlsx"); // Descarga el archivo
    };


    async function Eliminar(item) {
        modalDialogService.Confirm(
            "¿Estás seguro de que deseas eliminar este autor?",
            "Confirmar eliminación",
            "Sí",
            "No",
            async () => {
                await autoresService.deleteAutor(item.id);
                modalDialogService.Alert("Autor eliminado correctamente.", "Eliminación exitosa", "Aceptar", "", null, null, "success");
                setTimeout(() => {
                    Buscar();
                }, 3000);
            },
            null,
            'warning'
        );
    } // Elimina un autor por ID y actualiza el estado con el autor eliminado.   

    async function Grabar(item) {
        console.log("Datos a grabar:", item);
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
    } // Graba un autor y actualiza el estado con el autor creado o modificado.

    function Volver() {
        setAccionABMC("L"); 
    } // Vuelve al listado de autores.

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
            )} {/* Muestra el formulario de búsqueda de autores. */} 

            {AccionABMC === "L" && Autor && Autor.length > 0 && (
                <AutoresListado
                    {...{
                        Items: Autor,
                        Consultar,
                        Eliminar,
                        Modificar,
                        Imprimir,
                        Tipodoc, // Pasar los tipo_doc al componente AutoresListado
                    }}
                />
            )} {/* Muestra el listado de autores. */}

            {AccionABMC === "L" && Autor && Autor.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            )} {/* Muestra un mensaje si no se encontraron autores. */}

            {AccionABMC !== "L" && (
                <AutoresRegistro
                    {...{
                        AccionABMC,
                        Tipodoc, // Pasar los tipo_doc al componente AutoresRegistro
                        Item,
                        Grabar,
                        Volver,
                    }}
                />
            )} {/* Muestra el formulario de registro de autores. */}
        </div>
    );
}

export default Autores;