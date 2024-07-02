const express = require("express");
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const moment = require("moment");
const router = express.Router();


// Rutas de LIBROS.


// Obtener los libros filtrados por titulo.
router.get("/api/libros", async function (req, res) {
      try {
            let where = {};
            let include = [];

            if (req.query.titulo != undefined && req.query.titulo !== "") {
                  where.titulo = { [Op.like]: `%${req.query.titulo}%` };
            };

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
            });


            return res.json({ Items: rows, RegistrosTotal: count });
      } catch (err) {
            console.error("Error in GET /api/libros", err);
            res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
      }
});




// Obtener libros por ID.
router.get("/api/libros/:id", async function (req, res) {
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
                  return res.status(404).json({ message: "Libro no encontrado" }); //error 404 significa que no se encontró el recurso solicitado
            }
            res.json(item);
      } catch (err) {
            console.error("Error in GET /api/libros/", err);
            res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
      }
});


// Crear un nuevo libro
router.post("/api/libros/", async (req, res) => {
      try {
          let data = await db.Libros.create({
              id: req.body.id,
              titulo: req.body.titulo,
              fecha_publicacion: moment(req.body.fecha_publicacion).format("YYYY-MM-DD"),
              id_autor: req.body.id_autor,
              id_editorial: req.body.id_editorial,
              precio: req.body.precio,
              id_genero: req.body.id_genero,
          });
          res.status(200).json(data.dataValues); // 200 significa que la solicitud ha tenido éxito
      } catch (err) {
          if (err instanceof ValidationError) { // si el error es de validación
              let messages = "";
              err.errors.forEach((x) => (messages += x.message + ""));
              res.status(400).json({ message: messages }); // 400 significa error en la solicitud del cliente
          } else {
              console.error("Error in POST /api/libros/", err);
              res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
          }
      }
  }); 




// Actualizar un nuevo libro
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
                  res.status(404).json({ message: "Libro no encontrado" }); //error 404 significa que no se encontró el recurso solicitado
                  return;
            }


            item.id = req.body.id;
            item.titulo = req.body.titulo;
            item.fecha_publicacion = moment(req.body.fecha_publicacion).format("YYYY-MM-DD");
            item.id_autor = req.body.id_autor;
            item.id_editorial = req.body.id_editorial;
            item.precio = req.body.precio;
            item.id_genero = req.body.id_genero;
            await item.save();


            res.sendStatus(204); // 204 significa que la solicitud ha tenido éxito
      } catch (err) {
            if (err instanceof ValidationError) {
                  let messages = "";
                  err.errors.forEach(
                  (x) => (messages += x.path + ": " + x.message + "\n")
                  );
                  res.status(400).json({ message: messages }); // 400 significa error en la solicitud del cliente
            } else {
                  console.error("Error in PUT /api/libros", err);
                  res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
            }
      }
});


// Eliminar un libro
router.delete("/api/libros/:id", async (req, res) => {
      try {
            let data = await db.Libros.destroy({
                  where: { id: req.params.id },
            });
            console.log("Numero de filas borradas:", data);
            if (data === 1) {
                  res.sendStatus(200); // 200 significa que la solicitud ha tenido éxito
            } else {
                  res.sendStatus(404); // 404 significa que no se encontró el recurso solicitado
            }
      } catch (err) {
            console.error("Error in DELETE /api/libros/", err);
            res.status(500).json({ error: "Internal server error" }); //error 500 significa error interno del servidor
      }
});


// exportamos nuestro nuevo router.
module.exports = router;