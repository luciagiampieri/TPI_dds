const express = require("express");
const db = require("../base-orm/sequelize-init.js");

const router = express.Router();

router.get("/api/tipodoc", async function (req, res, next) {
    try {
        let data = await db.Tipo_Documentos.findAll({
            attributes: ["tipo", "descripcion"],
        });
        res.json(data);
    } catch (error) {
        console.error("Error al obtener los tipos de documentos:", error);
        res.status(500).json({ error: "Error al obtener los tipos de documentos" });
    }
});

module.exports = router;