const express = require("express");
const db = require("../base-orm/sequelize-init.js");

const router = express.Router();

// GET ALL de la tabla GENEROS que tiene los atributos id y nombre.
router.get("/api/generos", async function (req, res, next) {
      let data = await db.Generos.findAll({
            attributes: ["id", "nombre"],
      });
      res.json(data);
});
// ejemplo de uso: http://localhost:4444/api/generos

module.exports = router;