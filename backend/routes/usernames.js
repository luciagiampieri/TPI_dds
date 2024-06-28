const express = require("express");
const db = require("../base-orm/sequelize-init");
// import auth from "../seguridad/auth";
const router = express.Router();

// GET ALL de la tabla User_Name que tiene los atributos user_name y edad.
router.get("/api/usernames", async function (req, res) {
    try {
        const { count, rows } = await db.User_Name.findAndCountAll({
            attributes: ["user_name","edad"],
            order: [["user_name", "ASC"]],
        });
        return res.json({ Items: rows, RegistrosTotal: count });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}); // ejemplo de uso: http://localhost:4444/api/usernames

// exportamos el router.
module.exports = router;