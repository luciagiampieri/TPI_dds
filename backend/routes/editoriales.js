const express = require("express");
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const moment = require("moment");
const router = express.Router();
const { authenticateJWT, authorizeUser } = require("../seguridad/auth"); // Importa el middleware de autenticación y autorización


// Rutas de Editoriales.


// Obtener editoriales por filtro.
router.get("/api/editorialesPublico", async function (req, res) {
    try {
        let where = {};

        if (req.query.nombre != undefined && req.query.nombre !== "") {
            where.nombre = { [Op.like]: `%${req.query.nombre}%` };
        };


        const { count, rows } = await db.Editoriales.findAndCountAll({
            attributes: [
                "id",
                "nombre",
                "direccion",
                "fecha_fundacion",
                "id_pais",
            ],
            order: [["id", "ASC"]],
            where,
        });


        return res.json({Items: rows, RegistrosTotal: count})
    } catch (error) {
        console.error("Error in GET /api/editoriales", err);
        res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
    }
});
// ejemplo de uso sin filtro: https://localhost:4444/api/editoriales
        // ejemplo de uso: http://localhost:4444/api/editoriales?nombre=el&Pagina=1



// Obtener editorial por ID.
router.get("/api/editorialesPublico/:id", async function (req, res) {
    try {
        let item = await db.Editoriales.findOne({
            attributes: [
                "id",
                "nombre",
                "direccion",
                "fecha_fundacion",
                "id_pais",
            ],
            where: { id: req.params.id },
        });


        if (!item) {
            return res.status(404).json({ message: "Editorial no encontrada" }); //error 404 significa que no se encontró el recurso
        }
        res.json(item);
    } catch (error) {
        console.error("Error in GET /api/editoriales", err);
        res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
    }
}); // ejemplo de uso: http://localhost:4444/api/editoriales/1


// Agregar una nueva editorial
router.post("/api/editoriales/", authenticateJWT, authorizeUser(['chicasdds']), async (req, res) => {
    try {
        let data = await db.Editoriales.create({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            fecha_fundacion: moment(req.body.fecha_fundacion).format("YYYY-MM-DD"),
            id_pais: req.body.id_pais,
        });
        res.status(200).json(data.dataValues); // 200 significa que la solicitud ha tenido éxito
    } catch (err) {
        if (err instanceof ValidationError) { // si el error es de validación
            let messages = "";
            err.errors.forEach((x) => (messages += x.message + ""));
            res.status(400).json({ message: messages }); // 400 significa error en la solicitud del cliente
        } else {    
            console.error("Error in POST /api/editoriales/", err);
            res.status(500).json({ error: "Internal server error" }); // 500 significa error interno del servidor
    }};
}); // ejemplo de uso: http://localhost:4444/api/editoriales/


// Actualizar una editorial
router.put("/api/editoriales/:id", authenticateJWT, authorizeUser(['chicasdds']), async (req, res) => {
    try {
        let item = await db.Editoriales.findOne({
            attributes: [
                "id",
                "nombre",
                "direccion",
                "fecha_fundacion",
                "id_pais",
            ],
            where: { id: req.params.id },
        });
        if (!item) {
            res.status(404).json({ message: "Editorial no encontrada" }); // 404 significa que no se encontró el recurso solicitado
            return;
        }
        item.nombre =  req.body.nombre;
        item.direccion = req.body.direccion;
        item.fecha_fundacion = moment(req.body.fecha_fundacion).format("YYYY-MM-DD");
        item.id_pais = req.body.id_pais;
        await item.save();


        res.sendStatus(204); // 204 significa que la solicitud ha tenido éxito
    } catch (err) {
        if (err instanceof ValidationError) {
            let messages = "";
            err.errors.forEach(
                (x) => (messages += x.path + ": " + x.message + "\n")
            );
            res.status(400).json({ message: messages }); // 400 significa error en la solicitud del cliente
        } else {
            console.error("Error in PUT /api/editoriales", err);
            res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor;
        }
    }
}); // ejemplo de uso: http://localhost:4444/api/editoriales/1




// Eliminar una editorial
router.delete("/api/editoriales/:id", authenticateJWT, authorizeUser(['chicasdds']), async (req, res) => {
    try {
        let data = await db.Editoriales.destroy({
            where: { id: req.params.id },
            });
            if (data === 1) {
                res.sendStatus(200); // 200 significa que la solicitud ha tenido éxito
            } else {
                res.sendStatus(404); // 404 significa que no se encontró el recurso solicitado
            }
    } catch (err) {
        console.error("Error in DELETE /api/editoriales/", err);
        res.status(500).json({ error: "Internal server error" }); // 500 significa error interno del servidor
    }
}); // ejemplo de uso: http://localhost:4444/api/editoriales/1


// exportamos nuestro nuevo router.
module.exports = router;