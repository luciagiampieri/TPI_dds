const express = require("express"); // importar express
// crear servidor
const app = express();
app.use(express.json()); // para poder leer json en el body
require("./base-orm/sqlite-init");  // crear base si no existe
