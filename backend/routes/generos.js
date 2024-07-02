const express = require("express");
const db = require("../base-orm/sequelize-init.js");

const router = express.Router();

// GET ALL de la tabla GENEROS que tiene los atributos id y nombre.
router.get("/api/generos", async function (req, res) {
      try {
            let data = await db.Generos.findAll({
                  attributes: ["id", "nombre"],
            });
            
            if (data.length === 0) {
                  return res.status(404).json({ message: "Genero no encontrado" }); //error 404 significa que no se encontró el recurso solicitado
            }
      
            res.json(data);
      } catch (error) {
            console.error("Error al obtener los géneros:", error);
            res.status(500).json({ error: "Error al obtener los géneros" }); //error 500 significa error interno del servidor
      }
});

// ejemplo de uso: http://localhost:4444/api/generos

//Exportamos el router
module.exports = router;