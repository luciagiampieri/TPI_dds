import React, { useState, useEffect, useCallback } from "react";
import ResenasBuscar from "./ResenasBuscar";
import ResenasListado from "./ResenasListado";
import ResenasRegistro from "./ResenasRegistro";
import resenasService from "../../services/resenas.service";
import user_namesServices from "../../services/user_names.service";
import modalDialogService from "../../services/modalDialog.service";
import librosService from "../../services/libros.service";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Resenas() {
    const TituloAccionABMC = {
        A: "(Agregar)",
        B: "(Eliminar)",
        M: "(Modificar)",
        C: "(Consultar)",
        L: "(Listado)",
    };

    const [AccionABMC, setAccionABMC] = useState("L"); // Estado para controlar la acción a realizar
    const [Comentario, setComentario] = useState(""); // Estado para filtrar la búsqueda de reseñas
    const [Libros, setLibros] = useState([]); // Estado para guardar los libros
    const [Resenas, setResenas] = useState([]); // Estado para guardar las reseñas
    const [Item, setItem] = useState(null); // Estado para mostrar la reseña en el formulario
    const [Users, setUsers] = useState([]); // Estado para guardar los usuarios

    const Buscar = useCallback(async () => {
        const data = await resenasService.getAllResenas({ comentario: Comentario });
        setResenas(data.Items);
    }, [Comentario]); // Busca las reseñas según el comentario

    useEffect(() => {
        async function BuscarUsers() {
            let data = await user_namesServices.getAllUserNames();
            setUsers(data);
        };
        BuscarUsers();
    }, []); // useEffect se ejecuta solo una vez. Busca los usuarios disponibles.

    useEffect(() => {
        async function BuscarLibros() {
            let data = await librosService.getAllLibros({ titulo: '' });
            setLibros(data.Items || []); // Asegurarse de que data.Items sea un array
        };
        BuscarLibros();
    }, []); // useEffect se ejecuta solo una vez. Busca los libros disponibles.

    useEffect(() => {
        Buscar();
    }, [Buscar]); // useEffect se ejecuta cada vez que cambia el estado Comentario.

    async function BuscarId(item, accionABMC) {
        const data = await resenasService.getResenaById(item.id);
        setItem(data);
        setAccionABMC(accionABMC);
    }; // Busca una reseña por ID y actualiza el estado con las reseñas encontradas y el tipo de acción.

    function Consultar(item) {
        BuscarId(item, "C");
    } // Consulta una reseña por ID y actualiza el estado con la reseña encontrada y el tipo de acción.

    function Modificar(item) {
        BuscarId(item, "M");
    } // Modifica una reseña por ID y actualiza el estado con la reseña encontrada y el tipo de acción.

    async function Agregar() {
        setAccionABMC("A");
        setItem({
            id_libro: "",
            fecha_resena: "",
            comentario: "",
            calificacion: "",
            username: "",
        });
        modalDialogService.Alert("preparando el Alta...");
        console.log(Item);
    }; // Agrega una reseña y actualiza el estado con la reseña encontrada y el tipo de acción.

    const Imprimir = () => {
        const data = Resenas.map((item) => ({
            Libro: Libros.find((libro) => libro.id === item.id_libro)?.titulo || "",
            "Fecha": item.fecha_resena,
            Comentario: item.comentario,
            Calificacion: item.calificacion,
            Usuario: item.user_name,
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Reseñas");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "ReseñaListado.xlsx");
    }; // Mapea las reseñas encontradas y las muestra en el listado.


    async function Eliminar(item) {
        modalDialogService.Confirm(
            "¿Estás seguro de que deseas eliminar esta reseña?",
            "Confirmar eliminación",
            "Sí",
            "No",
            async () => {
                await resenasService.deleteResena(item.id);
                modalDialogService.Alert("Reseña eliminada correctamente.", "Eliminación exitosa", "Aceptar", "", null, null, "success");
                setTimeout(() => {
                    Buscar();
                }, 3000);
            },
            null,
            'warning'
        );
    } // Elimina una reseña por ID y actualiza el estado con las reseñas encontradas.

    async function Grabar(item) {
        if (AccionABMC === "A") {
            await resenasService.createResena(item);
        } else if (AccionABMC === "M") {
            await resenasService.updateResena(item.id, item);
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
    }; // Graba una reseña y actualiza el estado con las reseñas encontradas.

    function Volver() {
        setAccionABMC("L");
    } // Vuelve al listado de reseñas.

    return (
        <div>
            <div className="tituloPagina">
                Reseñas <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>

            {AccionABMC === "L" && (
                <ResenasBuscar 
                    {...{ 
                        Comentario, 
                        setComentario, 
                        Buscar, 
                        Agregar 
                    }} 
                />
            )} {/*Muestra el formulario de búsqueda de reseñas*/}

            {AccionABMC === "L" && Resenas.length > 0 && (
                <ResenasListado 
                    {...{ 
                        Items: Resenas, 
                        Consultar, 
                        Eliminar, 
                        Modificar, 
                        Imprimir, 
                        Libros 
                    }} 
                />
            )} {/*Muestra el listado de reseñas*/}

            {AccionABMC === "L" && Resenas && Resenas.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            )} {/*Muestra un mensaje si no se encuentran registros*/}
            
            {AccionABMC !== "L" && (
                <ResenasRegistro 
                    {...{ 
                        AccionABMC, 
                        Libros, 
                        Users, 
                        Item, 
                        Grabar, 
                        Volver 
                    }} 
                />
            )} {/*Muestra el formulario de registro de reseñas*/}
        </div>
    );
}

export default Resenas;