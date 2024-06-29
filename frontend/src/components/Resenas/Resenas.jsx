import React, { useState, useEffect } from "react";
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

    const [Calif, setCalif] = useState(""); 
    const [Libro, setLibro] = useState([]);
    const [Resenas, setResenas] = useState([]);
    const [Item, setItem] = useState(null);
    const [RegistrosTotal, setRegistrosTotal] = useState(0); 
    const [Pagina, setPagina] = useState(1); 
    const [Paginas, setPaginas] = useState([]); 
    const [Users, setUsers] = useState([]); 

    useEffect(() => {
        async function BuscarUsers() {
            let data = await user_namesServices.getAllUserNames();
            setUsers(data); 
        }
        BuscarUsers();
    }, []); 

    useEffect(() => {
        Buscar(Pagina);
    }, [Calif, Pagina]);

    useEffect(() => {
        async function BuscarLibros() {
            let data = await librosService.getAllLibros();
            setLibro(data); 
        }
        BuscarLibros();
    }, []);


    async function Buscar(_pagina) {
        if (_pagina && _pagina !== Pagina) {
            setPagina(_pagina);
        } else {
            _pagina = Pagina;
        }
    
        const data = await resenasService.getAllResenas({ calificacion: Calif, Pagina: _pagina });
    
        setResenas(data.Items);
        setRegistrosTotal(data.RegistrosTotal);
    
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
            arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
    }

    async function BuscarId(item, accionABMC) {
        const data = await resenasService.getResenaById(item.id);
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
            id_libro: "",
            fecha_resena: "",
            comentario: "",
            calificacion: "",
            username: "",
        });
    } 

    const Imprimir = () => {
        const data = Resenas.map((item) => ({
            Libro: Libro.find((libro) => libro.id === item.id_libro)?.titulo || "",
            Fecha: item.fecha_resena,
            Comentario: item.comentario,
            Calificacion: item.calificacion,
            Usuario: item.user_name
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
        await Buscar();
    }

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
    }

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
                        Calif,
                        setCalif,
                        Buscar,
                        Agregar,
                    }}
                />
            )}

            {AccionABMC === "L" && Resenas && Resenas.length > 0 && (
                <ResenasListado
                    {...{
                        Items: Resenas,
                        Consultar,
                        Eliminar,
                        Modificar,
                        Imprimir,
                        Pagina,
                        RegistrosTotal,
                        Paginas,
                        Buscar,
                        Libro,
                    }}
                />
            )}

            {AccionABMC === "L" && Resenas && Resenas.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros... Presione buscar...
                </div>
            )}

            {AccionABMC !== "L" && (
                <ResenasRegistro
                    {...{
                        AccionABMC,
                        Libro, 
                        Users, 
                        Item,
                        Grabar,
                        Volver,
                    }}
                />
            )}
        </div>
    );
}

export default Resenas;