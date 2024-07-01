const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../seguridad/auth");

const router = express.Router();

const users = [
    {
        usuario: "admin",
        clave: "123abc",
        rol: "admin",
    },
    {
        usuario: "lugiampieri",
        clave: "123",
        rol: "member",
    },
    {
        usuario: "candepaez",
        clave: "987",
        rol: "member",
    },
    {
        usuario: "fachialva",
        clave: "abc",
        rol: "member",
    },
    {
        usuario: "ticigatica",
        clave: "xyz",
        rol: "member",
    }
];
let refreshTokens = [];

router.post("/api/login", (req, res) => {
    const { usuario, clave } = req.body;

    const user = users.find((u) => {
        return u.usuario === usuario && u.clave === clave;
    });

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

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken,
            message: "Bienvenido " + user.usuario + "!",
        });
    } else {
        res.json({ message: "usuario o clave incorrecto" });
    }
}); // ejemplo de uso: POST http://localhost:4444/api/login 
// con el siguiente JSON en el body: { "usuario": "admin", "clave": "123abc" } 
// esto devolverá un token de acceso y un token de refresco. Cuando yo haga una petición a una ruta protegida, 
// debo enviar el token de acceso en el header de la petición. Agregando en el postman un header con la key "Authorization
// y el value "Bearer <token de acceso>". Si el token de acceso expira, debo enviar el token de refresco en una petición

router.post("/api/logout", (req, res) => {
    let message = "Logout inválido!";
    const { token } = req.body;
    if (refreshTokens.includes(token)) {
        message = "Usuario deslogueado correctamente!";
        refreshTokens = refreshTokens.filter((t) => t !== token);
    }

    res.json({ message });
}); // ejemplo de uso: POST http://localhost:4444/api/logout 
// con el siguiente JSON en el body: { "token": "<token de refresco>" } 

router.post("/api/token", (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, auth.refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
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