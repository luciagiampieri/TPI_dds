const request = require("supertest");
const app = require("../index");

// Datos de prueba para creación
const resenaAlta = {
    id_libro: 1,
    fecha_resena: "2021-10-10",
    comentario: "Muy entretenido!",
    calificacion: 5,
    user_name: "user10"
};

// Datos de prueba para modificación
const resenaModificacion = {
    id_libro: 2,
    fecha_resena: "2021-11-11",
    comentario: "Interesante!",
    calificacion: 4,
    user_name: "user20"
};

// test route/resenas GET
describe("GET /api/resenas", () => {
    it("Debería devolver todas las reseñas", async () => {
        const res = await request(app).get("/api/resenas");
        expect(res.statusCode).toEqual(200);

        expect(res.body).toEqual(
            expect.objectContaining({
                Items: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        id_libro: expect.any(Number),
                        fecha_resena: expect.any(String),
                        comentario: expect.any(String),
                        calificacion: expect.any(Number),
                        user_name: expect.any(String),
                    }),
                ]),
                RegistrosTotal: expect.any(Number),
            })
        );
    });
});

// test route/resenas GET con filtros
describe("GET /api/resenas con filtros", () => {
    it("Debería devolver las reseñas según filtro", async () => {
        const res = await request(app).get("/api/resenas?comentario=entretenido");
        expect(res.statusCode).toEqual(200);

        expect(verificarPropiedades(res.body.Items)).toEqual(true);

        function verificarPropiedades(array) {
            for (let i = 0; i < array.length; i++) {
                if (!array[i].comentario.includes("entretenido")) {
                    return false;
                }
            }
            return true;
        }
    });
});

// test route/resenas/:id GET
describe("GET /api/resenas/:id", () => {
    it("Debería devolver la reseña con el id 1", async () => {
        const res = await request(app).get("/api/resenas/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                id_libro: expect.any(Number),
                fecha_resena: expect.any(String),
                comentario: expect.any(String),
                calificacion: expect.any(Number),
                user_name: expect.any(String),
            })
        );
    });

    it("Debería devolver 404 para una reseña no encontrada", async () => {
        const res = await request(app).get("/api/resenas/9999");
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(
            expect.objectContaining({
                message: "Reseña no encontrada",
            })
        );
    });
});

// test route/resenas POST
describe("POST /api/resenas", () => {
    it("Debería devolver la reseña que acabo de crear", async () => {
        const res = await request(app).post("/api/resenas").send(resenaAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                id_libro: expect.any(Number),
                fecha_resena: expect.any(String),
                comentario: expect.any(String),
                calificacion: expect.any(Number),
                user_name: expect.any(String),
            })
        );
    });
});

// test route/resenas/:id PUT
describe("PUT /api/resenas/:id", () => {
    it("Debería modificar la reseña con el id 1", async () => {
        const res = await request(app)
            .put("/api/resenas/1")
            .send(resenaModificacion);
        expect(res.statusCode).toEqual(204);
    });

    it("Debería devolver 404 para una reseña no encontrada", async () => {
        const res = await request(app)
            .put("/api/resenas/9999")
            .send(resenaModificacion);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(
            expect.objectContaining({
                message: "Reseña no encontrada",
            })
        );
    });
});

// test route/resenas/:id DELETE
describe("DELETE /api/resenas/:id", () => {
    it("Debería borrar la reseña con el id 1", async () => {
        const res = await request(app).delete("/api/resenas/1");
        expect(res.statusCode).toEqual(200);
    });

    it("Debería devolver 404 para una reseña no encontrada", async () => {
        const res = await request(app).delete("/api/resenas/9999");
        expect(res.statusCode).toEqual(404);
    });
});
