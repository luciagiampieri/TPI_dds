const express = require("express");
const db = require("../base-orm/sequelize-init.js");

const router = express.Router();

router.get("/api/paises", async function (req, res, next) {
    try {
        let data = await db.Paises.findAll({
            attributes: ["id", "nombre"],
        });

        if (data.length === 0) {
            return res.status(404).json({ message: "País no encontrado" });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los países" });
    }
});
// ejemplo de uso: http://localhost:4444/api/paises

module.exports = router;