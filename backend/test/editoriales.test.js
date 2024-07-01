const request = require("supertest");
const app = require("../index");

const editorialAlta = {
  nombre: "Editorial " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  direccion: "Dirección de prueba",
  fecha_fundacion: new Date().toISOString(),
  id_pais: 1,
};

const editorialModificacion = {
  nombre: "Editorial Modificada " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  direccion: "Dirección de prueba modificada",
  fecha_fundacion: new Date().toISOString(),
  id_pais: 2,
};

// test route/editoriales GET
describe("GET /api/editorialesPublico", () => {
  it("Debería devolver todas las editoriales", async () => {
    const res = await request(app).get("/api/editorialesPublico");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            nombre: expect.any(String),
            direccion: expect.any(String),
            fecha_fundacion: expect.any(String),
            id_pais: expect.any(Number),
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/editoriales GET con filtros
describe("GET /api/editorialesPublico con filtros", () => {
  it("Debería devolver las editoriales según filtro", async () => {
    const res = await request(app).get("/api/editorialesPublico?nombre=editorial");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items)).toEqual(true);

    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if (!array[i].nombre.includes("editorial")) {
          return false;
        }
      }
      return true;
    }
  });
});

// test route/editoriales/:id GET
describe("GET /api/editorialesPublico/:id", () => {
  it("Debería devolver la editorial con el id 1", async () => {
    const res = await request(app).get("/api/editorialesPublico/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nombre: expect.any(String),
        direccion: expect.any(String),
        fecha_fundacion: expect.any(String),
        id_pais: expect.any(Number),
      })
    );
  });
});

// test route/editoriales POST
describe("POST /api/editoriales", () => {
  it("Debería devolver la editorial que acabo de crear", async () => {
    const res = await request(app).post("/api/editoriales").send(editorialAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nombre: expect.any(String),
        direccion: expect.any(String),
        fecha_fundacion: expect.any(String),
        id_pais: expect.any(Number),
      })
    );
  });
});

// test route/editoriales/:id PUT
describe("PUT /api/editoriales/:id", () => {
  it("Debería modificar la editorial con el id 1", async () => {
    const res = await request(app)
      .put("/api/editoriales/1")
      .send(editorialModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/editoriales/:id DELETE
describe("DELETE /api/editoriales/:id", () => {
  it("Debería borrar la editorial con el id 1", async () => {
    const res = await request(app).delete("/api/editoriales/1");
    expect(res.statusCode).toEqual(200);
  });
});
