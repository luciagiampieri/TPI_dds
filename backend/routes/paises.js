const express = require("express");
const db = require("../base-orm/sequelize-init.js");

const router = express.Router();

// GET ALL de la tabla PAISES que tiene los atributos id y nombre.
router.get("/api/paises", async function (req, res) {
    try {
        let data = await db.Paises.findAll({
            attributes: ["id", "nombre"],
        });

        if (data.length === 0) {
            return res.status(404).json({ message: "País no encontrado" }); //error 404 significa que no se encontró el recurso solicitado
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los países" }); //error 500 significa error interno del servidor
    }
}); // ejemplo de uso: http://localhost:4444/api/paises

module.exports = router;