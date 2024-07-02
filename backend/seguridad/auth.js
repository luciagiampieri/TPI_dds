const jwt = require("jsonwebtoken"); 
// Importamos la librería jsonwebtoken.
// esta librearía nos permite generar tokens de acceso y refresco.
// También nos permite verificar si un token es válido.
// un TOKEN es un string que se envía en cada petición HTTP para autenticar al usuario.
    // Un TOKEN de acceso tiene una duración de 20 minutos. Token de acceso: hace que el usuario sea autenticado.
    // Un TOKEN de refresco no tiene duración. Token de refresco: se usa para obtener un nuevo token de acceso.

// Definimos las claves de los tokens de acceso y refresco.
const accessTokenSecret = "youraccesstokensecret";
const refreshTokenSecret = "yourrefreshtokensecrethere";

// La función authenticateJWT verifica si el token de acceso es válido.
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // El token de acceso se envía en el header de la petición con la key "Authorization"
    if (authHeader) {
        const token = authHeader.split(" ")[1]; 

        // Verifica si el token es válido y si lo es, guarda el usuario en res.locals.user
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token no es válido" }); // 403 significa que no se tiene permiso para acceder al recurso
            }

            res.locals.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: "Acceso denegado" }); // 401 significa que no se ha autenticado
    }
};

// La función authorizeUser verifica si el usuario tiene permiso para realizar una acción.
const authorizeUser = (allowedUsers = [], allowedRoles = []) => {
    return (req, res, next) => {
        const { user } = res.locals;

        // Verifica si el usuario tiene permiso para realizar la acción
        if (allowedUsers.includes(user.usuario) || allowedRoles.includes(user.rol)) {
            return next();
        }

        return res.status(403).json({ message: "No tienes permiso para realizar esta acción" }); // 403 significa que no se tiene permiso para acceder al recurso
    };
};

module.exports = { authenticateJWT, authorizeUser, accessTokenSecret, refreshTokenSecret };