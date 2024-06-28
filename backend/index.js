const express = require("express"); // importar express
// Crear servidor
const app = express();
// Middleware para parsear JSON en el body de las solicitudes
app.use(express.json()); 
// Inicializar base de datos (asegúrate de que este archivo exista y funcione correctamente)
require("./base-orm/sqlite-init");  


// Importar rutas de RESEÑAS
const resenasRoutes = require("./routes/resenas");
const librosRoutes = require("./routes/libros");
const generosRoutes = require("./routes/generos");

// Usar rutas (asegúrate de que el archivo y las rutas estén bien definidas)
app.use(resenasRoutes);
app.use(librosRoutes);
app.use(generosRoutes);

// Puerto
const PORT = 4444;
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
