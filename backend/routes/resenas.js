const express = require("express");
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const moment = require("moment");
const router = express.Router();

// Rutas de RESEÑAS.

// Obtener por filtro.
router.get("/api/resenas", async function (req, res) {
    try {
        let where = {};

        if (req.query.comentario != undefined && req.query.comentario !== "") {
            where.comentario = { [Op.like]: `%${req.query.comentario}%` };
        };

        const { count, rows } = await db.Resenas.findAndCountAll({
            attributes: [
                "id",
                "id_libro",
                "fecha_resena",
                "comentario",
                "calificacion",
                "user_name"
            ],
            order: [["id", "ASC"]],
            where,
        });


        return res.json({ Items: rows, RegistrosTotal: count });
    } catch (error) {
        console.error("Error in GET /api/resenas", err);
        res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
    }
});
// ejemplo de uso con filtro de comentario: http://localhost:4444/api/resenas?comentario=entretenido&Pagina=1
// ejemplo de uso sin filtro: http://localhost:4444/api/resenas


// Obtener reseñas por ID
router.get("/api/resenas/:id", async function (req, res) {
    try {
        let item = await db.Resenas.findOne({
            attributes: [
                "id",
                "id_libro",
                "fecha_resena",
                "comentario",
                "calificacion",
                "user_name",
            ],
            where: { id: req.params.id },
        
        });
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: "Reseña no encontrada" }); //error 404 significa que no se encontró el recurso solicitado
        }
    } catch (error) {
        console.error("Error in GET /api/resenas", err);
        res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor


    }
}); // ejemplo de uso: http://localhost:4444/api/resenas/1


// Crear una nueva reseña
router.post("/api/resenas/", async (req, res) => {
    try {
        let data = await db.Resenas.create({
            id_libro: req.body.id_libro,
            fecha_resena: moment(req.body.fecha_resena).format("YYYY-MM-DD"),
            comentario: req.body.comentario,
            calificacion: req.body.calificacion,
            user_name: req.body.user_name,
        });
        res.status(200).json(data.dataValues); // 200 significa que la solicitud ha tenido éxito
    } catch (err) {
        console.error("Error in POST /api/resenas/", err);
        res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
    }
}); // ejemplo de uso: POST http://localhost:4444/api/resenas/ con body en formato JSON
// ejemplo de body: {"id_libro":1,"fecha_resena":"2021-10-10","comentario":"Muy entretenido!","calificacion":5,"user_name":"user10"}


// Modificar una reseña
router.put("/api/resenas/:id", async (req, res) => {
    try {
        let item = await db.Resenas.findOne({
            attributes: [
                "id",
                "id_libro",
                "fecha_resena",
                "comentario",
                "calificacion",
                "user_name",
            ],
            where: { id: req.params.id },
        });
        if (!item) {
            res.status(404).json({ message: "Reseña no encontrada" }); // 404 significa que no se encontró el recurso solicitado
            return;
        }


        item.id_libro = req.body.id_libro;
        item.fecha_resena = moment(req.body.fecha_resena).format("YYYY-MM-DD"),
        item.comentario = req.body.comentario;
        item.calificacion = req.body.calificacion;
        item.user_name = req.body.user_name;
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
            console.error("Error in PUT /api/resenas/", err);
            res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
        }
    }
});
// ejemplo de uso: PUT http://localhost:4444/api/resenas/1 con body en formato JSON
// ejemplo de body: {"fecha_resena":"2021-10-10","comentario":"Muy entretenido!","calificacion":5,"user_name":"user10"}


// Eliminar una reseña
router.delete("/api/resenas/:id", async (req, res) => {
    try {
        let data = await db.Resenas.destroy({
            where: { id: req.params.id },
        });
        if (data === 1) {
            res.sendStatus(200); // 200 significa que la solicitud ha tenido éxito
        } else {
            res.sendStatus(404); // 404 significa que no se encontró el recurso solicitado
        }
    } catch (err) {
        console.error("Error in DELETE /api/resenas/", err);
        res.status(500).json({ error: "Internal server error" }); // 500 significa error interno del servidor
    }
}); // ejemplo de uso: DELETE http://localhost:4444/api/resenas/1


// exportamos nuestro nuevo router.
module.exports = router;
