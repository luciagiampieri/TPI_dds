const express = require("express");
const db = require("../base-orm/sequelize-init.js");

const router = express.Router();

// GET ALL de la tabla USER_NAME que tiene los atributos user_name y edad.
router.get("/api/user", async function (req, res) {
    try {
        let data = await db.User_Name.findAll({
            attributes: ["user_name", "edad"],
        });

        if (data.length === 0) {
            return res.status(404).json({ message: "UserName no encontrado" }); //error 404 significa que no se encontró el recurso solicitado
        }
        res.json(data);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ error: "Error al obtener los usuarios" }); //error 500 significa error interno del servidor
    }
});

// ejemplo de uso: http://localhost:4444/api/user

module.exports = router;