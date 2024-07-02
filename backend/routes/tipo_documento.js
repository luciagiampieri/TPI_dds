const express = require("express");
const db = require("../base-orm/sequelize-init.js");

const router = express.Router();

// GET ALL de la tabla TIPO_DOCUMENTOS que tiene los atributos tipo y descripcion.
router.get("/api/tipodoc", async function (req, res) {
    try {
        let data = await db.Tipo_Documentos.findAll({
            attributes: ["tipo", "descripcion"],
        });

        if (data.length === 0) {
            return res.status(404).json({ message: "Tipo Documento no encontrado" }); //error 404 significa que no se encontró el recurso solicitado
        }
        res.json(data);
    } catch (error) {
        console.error("Error al obtener los tipos de documentos:", error);
        res.status(500).json({ error: "Error al obtener los tipos de documentos" }); //error 500 significa error interno del servidor
    }
});

module.exports = router;