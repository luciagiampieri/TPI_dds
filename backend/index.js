const express = require("express"); // importar express
// Crear servidor
const app = express();
// Middleware para parsear JSON en el body de las solicitudes
app.use(express.json()); 
// Inicializar base de datos (asegúrate de que este archivo exista y funcione correctamente)
require("./base-orm/sqlite-init");  

const cors = require('cors');
// Middleware para permitir CORS (acceso a la API desde otros dominios)
app.use(cors());

// Importar rutas
const resenasRoutes = require("./routes/resenas");
const usuariosRoutes = require("./routes/usernames");
const librosRoutes = require("./routes/libros");
const generosRoutes = require("./routes/generos");
const editorialesRoutes = require("./routes/editoriales");
const tipodocRoutes = require("./routes/tipo_documento");
const paisesRoutes = require("./routes/paises");
const autoresRoutes = require("./routes/autores");
const seguridadRoutes = require("./routes/seguridad");

// Usar rutas (asegúrate de que el archivo y las rutas estén bien definidas)
app.use(resenasRoutes);
app.use(librosRoutes);
app.use(generosRoutes);
app.use(usuariosRoutes);
app.use(editorialesRoutes);
app.use(tipodocRoutes);
app.use(paisesRoutes);
app.use(autoresRoutes);
app.use(seguridadRoutes);

// Puerto
const PORT = 4444;
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});