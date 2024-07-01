const request = require("supertest");
const app = require("../index");

const usuarioAdmin = { usuario: "admin", clave: "123" };
const usuarioMiembro = { usuario: "chicasdds", clave: "abc" };

describe("POST /api/login", function () {
  it("Devolvería error de autenticación, porque tiene clave errónea", async function () {
    const res = await request(app)
      .post("/api/login")
      .send({ usuario: "admin", clave: "errónea" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("usuario o clave incorrecto");
  });

  it("Devolvería el token para usuario admin", async function () {
    const res = await request(app).post("/api/login").send(usuarioAdmin);

    expect(res.statusCode).toEqual(200);
    expect(res.body.accessToken).toEqual(expect.any(String));
    expect(res.body.refreshToken).toEqual(expect.any(String));
  });

  it("Devolvería el token para usuario chicasdds", async function () {
    const res = await request(app).post("/api/login").send(usuarioMiembro);

    expect(res.statusCode).toEqual(200);
    expect(res.body.accessToken).toEqual(expect.any(String));
    expect(res.body.refreshToken).toEqual(expect.any(String));
  });
});

describe("POST /api/logout", function () {
  it("Devolvería error porque el token no es válido", async function () {
    const res = await request(app)
      .post("/api/logout")
      .send({ token: "invalido" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Logout inválido!");
  });

  it("Devolvería mensaje de deslogueo correcto", async function () {
    const loginRes = await request(app).post("/api/login").send(usuarioAdmin);
    const refreshToken = loginRes.body.refreshToken;

    const res = await request(app)
      .post("/api/logout")
      .send({ token: refreshToken });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Usuario deslogueado correctamente!");
  });
});

describe("POST /api/token", function () {
  it("Devolvería error porque no se envió el token de refresco", async function () {
    const res = await request(app).post("/api/token").send({});

    expect(res.statusCode).toEqual(401);
  });

  it("Devolvería error porque el token de refresco no es válido", async function () {
    const res = await request(app)
      .post("/api/token")
      .send({ refreshToken: "invalido" });

    expect(res.statusCode).toEqual(403);
  });

  it("Devolvería un nuevo token de acceso", async function () {
    const loginRes = await request(app).post("/api/login").send(usuarioAdmin);
    const refreshToken = loginRes.body.refreshToken;

    const res = await request(app)
      .post("/api/token")
      .send({ refreshToken });

    expect(res.statusCode).toEqual(200);
    expect(res.body.accessToken).toEqual(expect.any(String));
  });
});