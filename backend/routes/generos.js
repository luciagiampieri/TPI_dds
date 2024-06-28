const express = require("express");
const db = require("../base-orm/sequelize-init.js");

const router = express.Router();


router.get("/api/generos", async function (req, res, next) {
      let data = await db.Generos.findAll({
            attributes: ["IdGenero", "Nombre"],
      });
      res.json(data);
});

module.exports = router;