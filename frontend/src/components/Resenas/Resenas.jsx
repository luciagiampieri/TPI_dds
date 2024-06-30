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
    const [RegistrosTotal, setRegistrosTotal] = useState(0);
    const [Pagina, setPagina] = useState(1);
    const [Paginas, setPaginas] = useState([]);
    const [Users, setUsers] = useState([]);

    const Buscar = useCallback(async (pagina) => {
        pagina = pagina || Pagina;
        const data = await resenasService.getAllResenas({ comentario: Comentario, Pagina: pagina });
        setResenas(data.Items);
        setRegistrosTotal(data.RegistrosTotal);
        setPaginas(Array.from({ length: Math.ceil(data.RegistrosTotal / 10) }, (_, i) => i + 1));
        setPagina(pagina);
    }, [Comentario, Pagina]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await user_namesServices.getAllUserNames();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchLibros = async () => {
            const data = await librosService.getAllLibros({ titulo: '', Pagina: 1 });
            setLibros(data.Items || []); // Asegurarse de que data.Items sea un array
        };
        fetchLibros();
    }, []);

    useEffect(() => {
        Buscar();
    }, [Buscar, Pagina]);

    const BuscarId = async (item, accionABMC) => {
        const data = await resenasService.getResenaById(item.id);
        setItem(data);
        setAccionABMC(accionABMC);
    };

    const Consultar = (item) => BuscarId(item, "C");
    const Modificar = (item) => BuscarId(item, "M");
    const Agregar = () => {
        setAccionABMC("A");
        setItem({
            id_libro: "",
            fecha_resena: "",
            comentario: "",
            calificacion: "",
            username: "",
        });
    };

    const Imprimir = () => {
        const data = Resenas.map((item) => ({
            Libro: Libros.find((libro) => libro.id === item.id_libro)?.titulo || "",
            Fecha: item.fecha_resena,
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

    const Eliminar = async (item) => {
        await resenasService.deleteResena(item.id);
        Buscar();
    };

    const Grabar = async (item) => {
        if (AccionABMC === "A") {
            await resenasService.createResena(item);
        } else if (AccionABMC === "M") {
            await resenasService.updateResena(item.id, item);
        }
        Buscar();
        Volver();
        setTimeout(() => {
            modalDialogService.Alert(`Registro ${AccionABMC === "A" ? "agregado" : "modificado"} correctamente.`);
        }, 0);
    };

    const Volver = () => setAccionABMC("L");

    return (
        <div>
            <div className="tituloPagina">
                Reseñas <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>
            {AccionABMC === "L" && (
                <ResenasBuscar {...{ Comentario, setComentario, Buscar, Agregar }} />
            )}
            {AccionABMC === "L" && Resenas.length > 0 && (
                <ResenasListado {...{ Items: Resenas, Consultar, Eliminar, Modificar, Imprimir, Pagina, RegistrosTotal, Paginas, Buscar, Libros }} />
            )}
            {AccionABMC === "L" && Resenas.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros... Presione buscar...
                </div>
            )}
            {AccionABMC !== "L" && (
                <ResenasRegistro {...{ AccionABMC, Libros, Users, Item, Grabar, Volver }} />
            )}
        </div>
    );
}

export default Resenas;