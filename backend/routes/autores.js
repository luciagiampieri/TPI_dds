const express = require("express");
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const router = express.Router();
const moment = require("moment");
const { authenticateJWT, authorizeUser } = require("../seguridad/auth"); // Importa el middleware de autenticación y autorización

// ROUTER AUTORES

// obtener autores por filtro nombre
router.get("/api/autores", async function (req, res) {
    try {
        // Construir el filtro `where`
        let where = {};

        if (req.query.nombre != undefined && req.query.nombre !== "") {
            where.nombre = { [Op.like]: `%${req.query.nombre}%` };
        }

        // Consultar los autores con paginación
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
            where,  // Aplicar el filtro
        });

        // Devolver los resultados
        return res.json({ Items: rows, RegistrosTotal: count });
    } catch (error) {
        // Manejar los errores
        console.error("Error in GET /api/autores", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


// obtener autor por ID 
router.get("/api/autores/:id", authenticateJWT, authorizeUser(['ticigatica']), async function (req, res) {
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
            return res.status(404).json({ message: "Autor no encontrada" });
        }
        res.json(item);
    } catch (error) {
        console.error("Error al obtener el autor:", error);
        res.status(500).json({ error: "Error al obtener el autor" });
    }
});

// crear un autor
router.post("/api/autores/", authenticateJWT, authorizeUser(['ticigatica']), async (req, res) => {
    try {
        let data = await db.Autores.create({
                id: req.body.id,
                tipo_documento: req.body.tipo_documento,
                nro_documento: req.body.nro_documento,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                fecha_nacimiento: moment(req.body.fecha_nacimiento).format("YYYY-MM-DD"),
        });
        res.status(200).json(data.dataValues);
    } catch (err) {
        console.error("Error in POST /api/autores", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// actualizar un autor
router.put("/api/autores/:id", authenticateJWT, authorizeUser(['ticigatica']), async (req, res) => {
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
            res.status(404).json({ message: "Autor no encontrado" });
            return;
        }

        item.id = req.body.id;
        item.tipo_documento = req.body.tipo_documento;
        item.nro_documento = req.body.nro_documento;
        item.nombre = req.body.nombre;
        item.apellido = req.body.apellido;
        item.fecha_nacimiento = moment(req.body.fecha_nacimiento).format("YYYY-MM-DD");
        await item.save();

        res.sendStatus(204);
    } catch (err) {
        if (err instanceof ValidationError) {
            let messages = "";
            err.errors.forEach(
            (x) => (messages += x.path + ": " + x.message + "\n")
            );
            res.status(400).json({ message: messages });
        } else {
            throw err;
        }
    } 
});

// eliminar un autor
router.delete("/api/autores/:id", authenticateJWT, authorizeUser(['ticigatica']), async (req, res) => {
    try {
        let data = await db.Autores.destroy({
            where: { id: req.params.id },
            });
            if (data === 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
    } catch (err) {
        console.error("Error in POST /api/autores/", err);
        res.status(500).json({ error: "Internal server error" });
    }
});



// exportamos nuestro nuevo router.
module.exports = router;