const express = require("express");
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
// const auth = require("../seguridad/auth");
const router = express.Router();

// Rutas de RESEÑAS.

// Obtener por filtro.
router.get("/api/resenas", async function (req, res, next) {
    try {
        let where = {};
        let include = [];

        if (req.query.nombre_libro != undefined && req.query.nombre_libro !== "") {
            include.push({
                model: db.Libros,
                as: 'libro',
                where: {
                    titulo: { [Op.like]: `%${req.query.nombre_libro}%` }
                },
                attributes: []  // No necesitamos atributos del libro en los resultados de reseñas
            });
        }

        const Pagina = req.query.Pagina ?? 1;
        const TamañoPagina = 10;
        const { count, rows } = await db.Resenas.findAndCountAll({
            attributes: [
                "id",
                "id_libro",
                "fecha_resena",
                "comentario",
                "calificacion",
                "user_name",
            ],
            order: [["id", "ASC"]],
            where,
            include,
            offset: (Pagina - 1) * TamañoPagina,
            limit: TamañoPagina,
        });
        return res.json({ Items: rows, RegistrosTotal: count });
    } catch (err) {
        console.error("Error in GET /api/resenas", err);
        res.status(500).json({ error: "Internal server error" });
    }
}); // ejemplo de uso: http://localhost:4444/api/resenas?nombre_libro=el&Pagina=1
// ejemplo de uso sin filtro pero con página: http://localhost:4444/api/resenas?Pagina=1

// Ruta de reseña: obtener por ID.
router.get("/api/resenas/:id", async function (req, res, next) {
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
            include: [
                {
                    model: db.Libros,
                    as: 'libro',
                    attributes: ["titulo"]
                }
            ]
        });
        res.json(item);
    } catch (err) {
        console.error("Error in GET /api/resenas/:id", err);
        res.status(500).json({ error: "Internal server error" });
    }
}); // ejemplo de uso: http://localhost:4444/api/resenas/1

// Ruta de reseña: crear.
router.post("/api/resenas/", async (req, res) => {
    try {
        let data = await db.Resenas.create({
            id_libro: req.body.id_libro,
            fecha_resena: req.body.fecha_resena,
            comentario: req.body.comentario,
            calificacion: req.body.calificacion,
            user_name: req.body.user_name,
        });
        res.status(200).json(data.dataValues);
    } catch (err) {
        console.error("Error in POST /api/resenas/", err);
        res.status(500).json({ error: "Internal server error" });
    }
}); // ejemplo de uso: POST http://localhost:4444/api/resenas/ con body en formato JSON
// ejemplo de body: {"id_libro":1,"fecha_resena":"2021-10-10","comentario":"Muy entretenido!","calificacion":5,"user_name":"user10"}

// Ruta de reseña: actualizar.
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
            res.status(404).json({ message: "Resena no encontrada" });
            return;
        }

        item.id_libro = req.body.id_libro;
        item.fecha_resena = req.body.fecha_resena;
        item.comentario = req.body.comentario;
        item.calificacion = req.body.calificacion;
        item.user_name = req.body.user_name;
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
}); // ejemplo de uso: PUT http://localhost:4444/api/resenas/1 con body en formato JSON
// ejemplo de body: {"fecha_resena":"2021-10-10","comentario":"Muy entretenido!","calificacion":5,"user_name":"user10"}

// Ruta de reseña: eliminar.
router.delete("/api/resenas/:id", async (req, res) => {
    try {
        let data = await db.Resenas.destroy({
            where: { id: req.params.id },
        });
        if (data === 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error("Error in POST /api/resenas/", err);
        res.status(500).json({ error: "Internal server error" });
    }
}); // ejemplo de uso: DELETE http://localhost:4444/api/resenas/1

// exportamos nuestro nuevo router.
module.exports = router;