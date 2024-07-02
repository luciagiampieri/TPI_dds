const express = require("express");
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const moment = require("moment");
const router = express.Router();
const { authenticateJWT, authorizeUser } = require("../seguridad/auth"); // Importa el middleware de autenticación y autorización

// Rutas de Editoriales.

// Obtener autores por filtro.
router.get("/api/autoresPublico", async function (req, res) {
    try {
        let where = {};
        if (req.query.nombre != undefined && req.query.nombre !== "") {
            where.nombre = { [Op.like]: `%${req.query.nombre}%` };
        };

        const { count, rows } = await db.Autores.findAndCountAll({
            attributes: [
                "id",
                "tipo_documento",
                "nro_documento",
                "nombre",
                "apellido",
                "fecha_nacimiento",
            ],
            order: [["id", "ASC"]],
            where,
        });

        return res.json({ Items: rows, RegistrosTotal: count });
    } catch (error) {
        // Manejar los errores
        console.error("Error in GET /api/autores", err); 
        res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
    }
});
// ejemplo de uso: http://localhost:4444/api/autores?nombre=pepe&Pagina=1


// Obtener autor por id.
router.get("/api/autoresPublico/:id", async function (req, res) {
    try {
        let item = await db.Autores.findOne({
            attributes: [
                "id",
                "tipo_documento",
                "nro_documento",
                "nombre",
                "apellido",
                "fecha_nacimiento",
            ],
            where: { id: req.params.id },
            include: [
                {
                    model: db.Tipo_Documentos,
                    as: 'Tipo_Documentos',
                    attributes: ["descripcion"]
                }
            ]
        });

        if (!item) {
            return res.status(404).json({ message: "Autor no encontrado" }); //error 404 significa que no se encontró el recurso solicitado
        }
        res.json(item);
    } catch (error) {
        console.error("Error in GET /api/autores", err);
        res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
    }
});// ejemplo de uso: http://localhost:4444/api/autores/1


// Crear un nuevo autor
router.post("/api/autores/", authenticateJWT, authorizeUser(['chicasdds']), async (req, res) => {
    try {
        let data = await db.Autores.create({
            tipo_documento: req.body.tipo_documento,
            nro_documento: req.body.nro_documento,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            fecha_nacimiento: moment(req.body.fecha_nacimiento).format("YYYY-MM-DD"),
        });
        res.status(200).json(data.dataValues); //status 200 significa que la solicitud fue exitosa
    } catch (err) {
        console.error("Error in POST /api/autores", err);
        res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
    }
}); // ejemplo de uso: http://localhost:4444/api/autores


// Actualizar un autor.
router.put("/api/autores/:id", authenticateJWT, authorizeUser(['chicasdds']), async (req, res) => {
    try {
        let item = await db.Autores.findOne({
            attributes: [
                "id",
                "tipo_documento",
                "nro_documento",
                "nombre",
                "apellido",
                "fecha_nacimiento",
            ],
            where: { id: req.params.id },
        });
        if (!item) {
            res.status(404).json({ message: "Autor no encontrado" }); //error 404 significa que no se encontró el recurso solicitado
            return;
        }
        item.tipo_documento = req.body.tipo_documento;
        item.nro_documento = req.body.nro_documento;
        item.nombre =  req.body.nombre;
        item.apellido = req.body.apellido;
        item.fecha_nacimiento = moment(req.body.fecha_nacimiento).format("YYYY-MM-DD");
        await item.save();

        res.sendStatus(204); //status 204 significa que la solicitud fue exitosa 
    } catch (err) {
        if (err instanceof ValidationError) {
            let messages = "";
            err.errors.forEach(
                (x) => (messages += x.path + ": " + x.message + "\n")
            );
            res.status(400).json({ message: messages }); //error 400 significa error en la solicitud del cliente
        } else {
            console.error("Error in PUT /api/autores", err);
            res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
        }
    }
}); // ejemplo de uso: http://localhost:4444/api/autores/1


// Eliminar un autor.
router.delete("/api/autores/:id", authenticateJWT, authorizeUser(['chicasdds']), async (req, res) => {
    try {
        let data = await db.Autores.destroy({
            where: { id: req.params.id },
            });
            if (data === 1) {
                res.sendStatus(200); //status 200 significa que la solicitud fue exitosa
            } else {
                res.sendStatus(404); //error 404 significa que no se encontró el recurso solicitado
            }
    } catch (err) {
        console.error("Error in DELETE /api/autores", err);
        res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
    }
}); // ejemplo de uso: http://localhost:4444/api/editoriales/1


// exportamos nuestro nuevo router.
module.exports = router;