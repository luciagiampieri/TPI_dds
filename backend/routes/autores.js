const express = require("express");
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
// const auth = require("../seguridad/auth");
const router = express.Router();
const moment = require("moment");

// obtener autores por filtro nombre
router.get("/api/autores", async function (req, res, next) {
    try {
        // Construir el filtro `where`
        let where = {};

        if (req.query.nombre != undefined && req.query.nombre !== "") {
            where.nombre = { [Op.like]: `%${req.query.nombre}%` };
        }

        const Pagina = parseInt(req.query.Pagina, 10) || 1;
        const TamañoPagina = 10;

        // Consultar los autores con paginación
        const { count, rows } = await db.Autores.findAndCountAll({
            attributes: [
                "id",
                "tipo_documento",
                "nro_documento",
                "nombre",
                "apellido",
                "fecha_nacimiento",
            ],
            order: [["id", "ASC"]],
            where,  // Aplicar el filtro
            offset: (Pagina - 1) * TamañoPagina,
            limit: TamañoPagina,
        });

        // Devolver los resultados
        return res.json({ Items: rows, RegistrosTotal: count });
    } catch (error) {
        // Manejar los errores
        console.error("Error al obtener autores:", error);
        return res.status(500).json({ error: "Error al obtener autores" });
    }
});


// obtener autor por ID 
router.get("/api/autores/:id", async function (req, res, next) {
    try {
        let item = await db.Autores.findOne({
            attributes: [
                "id",
                "tipo_documento",
                "nro_documento",
                "nombre",
                "apellido",
                "fecha_nacimiento",
            ],
            where: { id: req.params.id },
        });
        res.json(item);
    } catch (error) {
        console.error("Error al obtener el autor:", error);
        res.status(500).json({ error: "Error al obtener el autor" });
    }
});

// crear un autor
router.post("/api/autores", async (req, res) => {
    try {
          let data = await db.Autores.create({
                id: req.body.id,
                tipo_documento: req.body.tipo_documento,
                nro_documento: req.body.nro_documento,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                fecha_nacimiento: req.body.fecha_nacimiento,
          });
          res.status(200).json(data.dataValues);
    } catch (err) {
          console.error("Error in POST /api/autores", err);
          res.status(500).json({ error: "Internal server error" });
    }
});

// actualizar un autor
router.put("/api/autores/:id", async (req, res) => {
    try {
          let item = await db.Autores.findOne({
                attributes: [
                    "id",
                    "tipo_documento",
                    "nro_documento",
                    "nombre",
                    "apellido",
                    "fecha_nacimiento",
                ],
                where: { id: req.params.id },
          });
          if (!item) {
                res.status(404).json({ message: "Autor no encontrado" });
                return;
          }

          item.id = req.body.id;
          item.tipo_documento = req.body.tipo_documento;
          item.nro_documento = req.body.nro_documento;
          item.nombre = req.body.nombre;
          item.apellido = req.body.apellido;
          item.fecha_nacimiento = req.body.fecha_nacimiento;
          await item.save();

          res.sendStatus(204);
    } catch (err) {
          if (err instanceof ValidationError) {
                let messages = "";
                err.errors.forEach(
                (x) => (messages += x.path + ": " + x.message + "\n")
                );
                res.status(400).json({ message: messages });
          } else {
                throw err;
          }
    } 
});

// eliminar un autor
router.delete("/api/autores/:id", async (req, res) => {
    try {
        // Buscar el autor por ID
        let item = await db.Autores.findOne({
            where: { id: req.params.id },
        });
        
        // Si el autor no existe, devolver un error 404
        if (!item) {
            res.status(404).json({ message: "Autor no encontrado" });
            return;
        }

        // Eliminar el autor
        await item.destroy();
        
        // Devolver una respuesta de éxito
        res.sendStatus(200);
    } catch (err) {
        console.error("Error al eliminar el autor:", err);
        res.status(500).json({ error: "Error al eliminar el autor" });
    }
});



// exportamos nuestro nuevo router.
module.exports = router;