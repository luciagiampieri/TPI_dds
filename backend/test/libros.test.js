const request = require("supertest");
const app = require("../index");

// Datos de prueba para creación
const libroAlta = {
    titulo: "Libro " + (() => (Math.random() + 1).toString(36).substring(2))(),
    fecha_publicacion: new Date().toISOString(),
    id_autor: 1,
    id_editorial: 1,
    precio: 100,
    id_genero: 1,
};

// Datos de prueba para modificación
const libroModificacion = {
    id: 1,
    titulo: "Libro " + (() => (Math.random() + 1).toString(36).substring(2))(),
    fecha_publicacion: new Date().toISOString(),
    id_autor: 2,
    id_editorial: 2,
    precio: 200,
    id_genero: 2,
};

// test route/libros GET
describe("GET /api/libros", () => {
    it("Debería devolver todos los libros", async () => {
        const res = await request(app).get("/api/libros");
        expect(res.statusCode).toEqual(200);

        expect(res.body).toEqual(
            expect.objectContaining({
                Items: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        titulo: expect.any(String),
                        fecha_publicacion: expect.any(String),
                        id_autor: expect.any(Number),
                        id_editorial: expect.any(Number),
                        precio: expect.any(Number),
                        id_genero: expect.any(Number),
                    }),
                ]),
                RegistrosTotal: expect.any(Number),
            })
        );
    });
});

// test route/libros GET con filtros
describe("GET /api/libros con filtros", () => {
    it("Debería devolver los libros según filtro", async () => {
        const res = await request(app).get("/api/libros?titulo=libro");
        expect(res.statusCode).toEqual(200);

        expect(verificarPropiedades(res.body.Items)).toEqual(true);

        function verificarPropiedades(array) {
            for (let i = 0; i < array.length; i++) {
                if (!array[i].titulo.includes("libro")) {
                    return false;
                }
            }
            return true;
        }
    });
});

// test route/libros/:id GET
describe("GET /api/libros/:id", () => {
    it("Debería devolver el libro con el id 1", async () => {
        const res = await request(app).get("/api/libros/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                titulo: expect.any(String),
                fecha_publicacion: expect.any(String),
                id_autor: expect.any(Number),
                id_editorial: expect.any(Number),
                precio: expect.any(Number),
                id_genero: expect.any(Number),
            })
        );
    });
});

// test route/libros POST
describe("POST /api/libros", () => {
    it("Debería devolver el libro que acabo de crear", async () => {
        const res = await request(app).post("/api/libros").send(libroAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                titulo: expect.any(String),
                fecha_publicacion: expect.any(String),
                id_autor: expect.any(Number),
                id_editorial: expect.any(Number),
                precio: expect.any(Number),
                id_genero: expect.any(Number),
            })
        );
    });
});

// test route/libros/:id PUT
describe("PUT /api/libros/:id", () => {
    it("Debería modificar el libro con el id 1", async () => {
        const res = await request(app)
            .put("/api/libros/1")
            .send(libroModificacion);
        expect(res.statusCode).toEqual(204);
    });
});

// test route/libros/:id DELETE
describe("DELETE /api/libros/:id", () => {
    it("Debería borrar el libro con el id 1", async () => {
        const res = await request(app).delete("/api/libros/1");
        expect(res.statusCode).toEqual(200);
    });
});
