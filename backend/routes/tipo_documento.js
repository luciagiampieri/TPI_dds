const express = require("express");
const db = require("../base-orm/sequelize-init.js");

const router = express.Router();


router.get("/api/tipodoc", async function (req, res, next) {
      let data = await db.Autores.findAll({
            attributes: ["Tipo", "Descripcion"],
      });
      res.json(data);
});

module.exports = router;