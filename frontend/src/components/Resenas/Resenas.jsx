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

    const [AccionABMC, setAccionABMC] = useState("L");
    const [Comentario, setComentario] = useState("");
    const [Libros, setLibros] = useState([]); // Inicializar como array
    const [Resenas, setResenas] = useState([]);
    const [Item, setItem] = useState(null);
    const [Users, setUsers] = useState([]);

    const Buscar = useCallback(async () => {
        const data = await resenasService.getAllResenas({ comentario: Comentario });
        setResenas(data.Items);
    }, [Comentario]);

    useEffect(() => {
        async function BuscarUsers() {
            let data = await user_namesServices.getAllUserNames();
            setUsers(data);
        };
        BuscarUsers();
    }, []);

    useEffect(() => {
        async function BuscarLibros() {
            let data = await librosService.getAllLibros({ titulo: '' });
            setLibros(data.Items || []); // Asegurarse de que data.Items sea un array
        };
        BuscarLibros();
    }, []);

    useEffect(() => {
        Buscar();
    }, [Buscar]);

    async function BuscarId(item, accionABMC) {
        const data = await resenasService.getResenaById(item.id);
        setItem(data);
        setAccionABMC(accionABMC);
    };

    function Consultar(item) {
        BuscarId(item, "C");
    }

    function Modificar(item) {
        BuscarId(item, "M");
    }

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
    };

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
    };

    async function Eliminar(item) {
        await resenasService.deleteResena(item.id);
        Buscar();
    };

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
    };

    function Volver() {
        setAccionABMC("L");
    }

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
            )}
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
            )}
            {AccionABMC === "L" && Resenas && Resenas.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            )}
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
            )}
        </div>
    );
}

export default Resenas;