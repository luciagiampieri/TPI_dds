const express = require("express");
const db = require("../base-orm/sequelize-init.js");

const router = express.Router();


router.get("/api/user", async function (req, res, next) {
    try {
        let data = await db.User_Name.findAll({
            attributes: ["user_name", "edad"],
        });
        res.json(data); 
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

// ejemplo de uso: http://localhost:4444/api/user

module.exports = router;