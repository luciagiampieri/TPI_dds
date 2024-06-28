const express = require("express");
const db = require("../base-orm/sequelize-init.js");

const router = express.Router();

// GET ALL de la tabla GENEROS que tiene los atributos id y nombre.
router.get("/api/generos", async function (req, res, next) {
      try {
            let data = await db.Generos.findAll({
                  attributes: ["id", "nombre"],
            });
            res.json(data);
      } catch (error) {
            console.error("Error al obtener los géneros:", error);
            res.status(500).json({ error: "Error al obtener los géneros" });
      }
});

// ejemplo de uso: http://localhost:4444/api/generos

module.exports = router;