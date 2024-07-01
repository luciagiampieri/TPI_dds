const request = require("supertest");
const app = require("../index");

const userCredentials = {
    usuario: "admin",
    clave: "123"
};

const invalidCredentials = {
    usuario: "wrong",
    clave: "wrong"
};

const refreshTokenObj = {
    refreshToken: ""
};

// Test route /api/login POST
describe("POST /api/login", () => {
    it("Debería devolver un token de acceso y un token de refresco para credenciales válidas", async () => {
        const res = await request(app).post("/api/login").send(userCredentials);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("accessToken");
        expect(res.body).toHaveProperty("refreshToken");
        expect(res.body).toHaveProperty("message", "Bienvenido admin!");
        refreshTokenObj.refreshToken = res.body.refreshToken;
    });

    it("Debería devolver un mensaje de error para credenciales inválidas", async () => {
        const res = await request(app).post("/api/login").send(invalidCredentials);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "usuario o clave incorrecto");
    });
});

// Test route /api/logout POST
describe("POST /api/logout", () => {
    it("Debería desloguear correctamente al usuario con un token de refresco válido", async () => {
        const res = await request(app).post("/api/logout").send({ token: refreshTokenObj.refreshToken });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Usuario deslogueado correctamente!");
    });

    it("Debería devolver un mensaje de error para un token de refresco inválido", async () => {
        const res = await request(app).post("/api/logout").send({ token: "invalidtoken" });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Logout inválido!");
    });
});

// Test route /api/token POST
describe("POST /api/token", () => {
    it("Debería devolver un nuevo token de acceso para un token de refresco válido", async () => {
        // Login first to get a valid refresh token
        const loginRes = await request(app).post("/api/login").send(userCredentials);
        const refreshToken = loginRes.body.refreshToken;

        const res = await request(app).post("/api/token").send({ refreshToken });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("accessToken");
    });

    it("Debería devolver un error 401 si no se envía el token de refresco", async () => {
        const res = await request(app).post("/api/token").send({});
        expect(res.statusCode).toEqual(401);
    });

    it("Debería devolver un error 403 para un token de refresco inválido", async () => {
        const res = await request(app).post("/api/token").send({ refreshToken: "invalidtoken" });
        expect(res.statusCode).toEqual(403);
    });
});
