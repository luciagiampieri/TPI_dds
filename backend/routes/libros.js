const express = require("express");
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const moment = require("moment");
// const auth = require("../seguridad/auth");
const router = express.Router();

// Rutas de Libros.

// Obtener por filtro.
router.get("/api/libros", async function (req, res, next) {
      let where = {};
      let include = [];

      if (req.query.titulo != undefined && req.query.titulo !== "") {
            where.titulo = { [Op.like]: `%${req.query.titulo}%` };
      };

      const Pagina = req.query.Pagina ?? 1;
      const TamañoPagina = 10;
      const { count, rows } = await db.Libros.findAndCountAll({
            attributes: [
                  "id",
                  "titulo",
                  "fecha_publicacion",
                  "id_autor",
                  "id_editorial",
                  "precio",
                  "id_genero",
            ],
            order: [["id", "ASC"]],
            where,
            include,
            offset: (Pagina - 1) * TamañoPagina,
            limit: TamañoPagina,
      });

      return res.json({ Items: rows, RegistrosTotal: count });
}); // ejemplo de uso: http://localhost:4444/api/libros?titulo=el&Pagina=1
// ejemplo de uso sin filtro: https://localhost:4444/api/libros

// Ruta de libros: obtener por ID.
router.get("/api/libros/:id", async function (req, res, next) {
      let item = await db.Libros.findOne({
            attributes: [
                  "id",
                  "titulo",
                  "fecha_publicacion",
                  "id_autor",
                  "id_editorial",
                  "precio",
                  "id_genero",
            ],
            where: { id: req.params.id },
      });
      res.json(item);
});

// Ruta de reseña: crear.
router.post("/api/libros/", async (req, res) => {
      try {
            let data = await db.Libros.create({
                  id: req.body.id,
                  titulo: req.body.titulo,
                  fecha_publicacion: moment(req.body.fecha_publicacion).format('YYYY-MM-DD'),
                  id_autor: req.body.id_autor,
                  id_editorial: req.body.id_editorial,
                  precio: req.body.precio,
                  id_genero: req.body.id_genero,
            });
            res.status(200).json(data.dataValues);
      } catch (err) {
            console.error("Error in POST /api/libros/", err);
            res.status(500).json({ error: "Internal server error" });
      }
});

// Ruta de reseña: actualizar.
router.put("/api/libros/:id", async (req, res) => {
      try {
            let item = await db.Libros.findOne({
                  attributes: [
                        "id",
                        "titulo",
                        "fecha_publicacion",
                        "id_autor",
                        "id_editorial",
                        "precio",
                        "id_genero",
                  ],
                  where: { id: req.params.id },
            });
            if (!item) {
                  res.status(404).json({ message: "Libro no encontrado" });
                  return;
            }

            item.id = req.body.id;
            item.titulo = req.body.titulo;
            item.fecha_publicacion = moment(req.body.fecha_publicacion).format('YYYY-MM-DD');
            item.id_autor = req.body.id_autor;
            item.id_editorial = req.body.id_editorial;
            item.precio = req.body.precio;
            item.id_genero = req.body.id_genero;
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

// Ruta de reseña: eliminar.
router.delete("/api/libros/:id", async (req, res) => {
      try {
            let data = await db.Libros.destroy({
                  where: { id: req.params.id },
            });
            if (data === 1) {
                  res.sendStatus(200);
            } else {
                  res.sendStatus(404);
            }
      } catch (err) {
            console.error("Error in POST /api/libros/", err);
            res.status(500).json({ error: "Internal server error" });
      }
});

// exportamos nuestro nuevo router.
module.exports = router;
