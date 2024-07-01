const jwt = require("jsonwebtoken"); 
// Importamos la librería jsonwebtoken.
// esta librearía nos permite generar tokens de acceso y refresco.
// También nos permite verificar si un token es válido.
// un TOKEN es un string que se envía en cada petición HTTP para autenticar al usuario.
    // Un TOKEN de acceso tiene una duración de 20 minutos. Token de acceso: hace que el usuario sea autenticado.
    // Un TOKEN de refresco no tiene duración. Token de refresco: se usa para obtener un nuevo token de acceso.

const accessTokenSecret = "youraccesstokensecret";
const refreshTokenSecret = "yourrefreshtokensecrethere";

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token no es válido" });
            }

            res.locals.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "Acceso denegado" });
    }
};

const authorizeUser = (allowedUsers = [], allowedRoles = []) => {
    return (req, res, next) => {
        const { user } = res.locals;

        if (allowedUsers.includes(user.usuario) || allowedRoles.includes(user.rol)) {
            return next();
        }

        return res.status(403).json({ message: "No tienes permiso para realizar esta acción" });
    };
};

module.exports = { authenticateJWT, authorizeUser, accessTokenSecret, refreshTokenSecret };