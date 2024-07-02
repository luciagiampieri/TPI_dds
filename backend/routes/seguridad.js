const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../seguridad/auth");

// Definición de la ruta
const router = express.Router();
// Creación de usuarios
const users = [
    {
        usuario: "admin",
        clave: "123",
        rol: "admin",
    },
    {
        usuario: "chicasdds",
        clave: "abc",
        rol: "member",
    }
];


let refreshTokens = [];

// Rutas de seguridad
router.post("/api/login", (req, res) => {
    const { usuario, clave } = req.body;

    // Buscar el usuario en la lista de usuarios
    const user = users.find((u) => {
        return u.usuario === usuario && u.clave === clave;
    });

    // Si el usuario existe, se genera un token de acceso y un token de refresco
    if (user) {
        const accessToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            auth.accessTokenSecret,
            { expiresIn: "20m" }
        );

    
        const refreshToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            auth.refreshTokenSecret
        );

        // Se guarda el token de refresco en la lista de tokens de refresco
        refreshTokens.push(refreshToken);

        // Se devuelve el token de acceso y el token de refresco
        res.json({
            accessToken,
            refreshToken,
            message: "Bienvenido " + user.usuario + "!",
        });
    } else {
        // Si el usuario no existe, se devuelve un mensaje de error
        res.json({ message: "usuario o clave incorrecto" });
    }
}); // ejemplo de uso: POST http://localhost:4444/api/login
// con el siguiente JSON en el body: { "usuario": "admin", "clave": "123abc" }
// esto devolverá un token de acceso y un token de refresco. Cuando yo haga una petición a una ruta protegida,
// debo enviar el token de acceso en el header de la petición. Agregando en el postman un header con la key "Authorization
// y el value "Bearer <token de acceso>". Si el token de acceso expira, debo enviar el token de refresco en una petición


// Ruta para desloguear un usuario
router.post("/api/logout", (req, res) => {
    let message = "Logout inválido!";
    // Solicita un token de refresco
    const { token } = req.body;
    if (refreshTokens.includes(token)) {
        message = "Usuario deslogueado correctamente!";
        refreshTokens = refreshTokens.filter((t) => t !== token);
    }


    res.json({ message });
}); // ejemplo de uso: POST http://localhost:4444/api/logout
// con el siguiente JSON en el body: { "token": "<token de refresco>" }


// Ruta para obtener un nuevo token de acceso
router.post("/api/token", (req, res) => {
    const { refreshToken } = req.body;


    if (!refreshToken) {
        return res.sendStatus(401); // 401 significa que no se ha autenticado
    }


    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403); // 403 significa que no se tiene permiso para acceder al recurso
    }


    jwt.verify(refreshToken, auth.refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403); // 403 significa que no se tiene permiso para acceder al recurso
        }


        const accessToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            auth.accessTokenSecret,
            { expiresIn: "20m" }
        );


        res.json({
            accessToken,
        });
    });
});


module.exports = router;
