const request = require("supertest");
const app = require("../index");

// Datos de prueba para creación
const autorAlta = {
  tipo_documento: 1,
  nro_documento: Math.floor(Math.random() * 100000000),
  nombre: "Autor " + (() => (Math.random() + 1).toString(36).substring(2))(),
  apellido: "Apellido",
  fecha_nacimiento: new Date().toISOString().split('T')[0],
};

// Datos de prueba para modificación
const autorModificacion = {
  tipo_documento: 2,
  nro_documento: Math.floor(Math.random() * 100000000),
  nombre: "Autor Modificado " + (() => (Math.random() + 1).toString(36).substring(2))(),
  apellido: "Apellido Modificado",
  fecha_nacimiento: new Date().toISOString().split('T')[0],
};

// test route/autores GET
describe("GET /api/autoresPublico", () => {
  it("Debería devolver todos los autores", async () => {
    const res = await request(app).get("/api/autoresPublico");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            tipo_documento: expect.any(Number),
            nro_documento: expect.any(String),
            nombre: expect.any(String),
            apellido: expect.any(String),
            fecha_nacimiento: expect.any(String),
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/autores GET con filtros
describe("GET /api/autoresPublico con filtros", () => {
  it("Debería devolver los autores según filtro", async () => {
    const res = await request(app).get("/api/autoresPublico?nombre=Autor");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items)).toEqual(true);

    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if (!array[i].nombre.includes("Autor")) {
          return false;
        }
      }
      return true;
    }
  });
});

// test route/autores/:id GET
describe("GET /api/autoresPublico/:id", () => {
  it("Debería devolver el autor con el id 1", async () => {
    const res = await request(app).get("/api/autoresPublico/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        tipo_documento: expect.any(Number),
        nro_documento: expect.any(String),
        nombre: expect.any(String),
        apellido: expect.any(String),
        fecha_nacimiento: expect.any(String),
        Tipo_Documentos: expect.objectContaining({
          descripcion: expect.any(String),
        }),
      })
    );
  });
});

// test route/autores POST
describe("POST /api/autores", () => {
  it("Debería devolver el autor que acabo de crear", async () => {
    const res = await request(app).post("/api/autores").send(autorAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        tipo_documento: expect.any(Number),
        nro_documento: expect.any(String),
        nombre: expect.any(String),
        apellido: expect.any(String),
        fecha_nacimiento: expect.any(String),
      })
    );
  });
});

// test route/autores/:id PUT
describe("PUT /api/autores/:id", () => {
  it("Debería devolver el autor con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/autores/1")
      .send(autorModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/autores/:id DELETE
describe("DELETE /api/autores/:id", () => {
  it("Debería devolver el autor con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/autores/1");
    expect(res.statusCode).toEqual(200);
  });
});

