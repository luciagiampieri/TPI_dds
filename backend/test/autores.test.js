
// const request = require("supertest");
// const app = require("../index");

// const autorAlta = {
//     tipo_documento: "DNI",
//     nro_documento: Math.floor(Math.random() * 10000000).toString(),
//     nombre: "Nombre " + Math.random().toString(36).substring(7),
//     apellido: "Apellido " + Math.random().toString(36).substring(7),
//     fecha_nacimiento: new Date().toISOString().split("T")[0],
// };

// const autorModificacion = {
//     tipo_documento: "Pasaporte",
//     nro_documento: Math.floor(Math.random() * 10000000).toString(),
//     nombre: "NuevoNombre " + Math.random().toString(36).substring(7),
//     apellido: "NuevoApellido " + Math.random().toString(36).substring(7),
//     fecha_nacimiento: new Date().toISOString().split("T")[0],
// };

// describe("GET /api/autoresPublico", () => {
//     it("Debería devolver todos los autores", async () => {
//         const res = await request(app).get("/api/autoresPublico");
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty("Items");
//         expect(res.body).toHaveProperty("RegistrosTotal");
//     });
// });

// describe("GET /api/autoresPublico con filtros", () => {
//     it("Debería devolver los autores según filtro", async () => {
//         const res = await request(app).get("/api/autoresPublico?nombre=Nombre");
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty("Items");
//         expect(res.body).toHaveProperty("RegistrosTotal");
//     });
// });

// describe("GET /api/autoresPublico/:id", () => {
//     it("Debería devolver el autor con el id 1", async () => {
//         const res = await request(app).get("/api/autoresPublico/1");
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty("id");
//         expect(res.body).toHaveProperty("nombre");
//         expect(res.body).toHaveProperty("apellido");
//     });
// });

// describe("POST /api/autores", () => {
//     it("Debería crear un nuevo autor", async () => {
//         const res = await request(app)
//             .post("/api/autores")
//             .send(autorAlta)
//             .set('Authorization', `Bearer tuTokenDeAutenticacion`);
//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveProperty("id");
//         expect(res.body).toHaveProperty("nombre", autorAlta.nombre);
//     });
// });

// describe("PUT /api/autores/:id", () => {
//     it("Debería actualizar el autor con el id 1", async () => {
//         const res = await request(app)
//             .put("/api/autores/1")
//             .send(autorModificacion)
//             .set('Authorization', `Bearer tuTokenDeAutenticacion`);
//         expect(res.statusCode).toEqual(204);
//     });
// });

// describe("DELETE /api/autores/:id", () => {
//     it("Debería eliminar el autor con el id 1", async () => {
//         const res = await request(app)
//             .delete("/api/autores/1")
//             .set('Authorization', `Bearer tuTokenDeAutenticacion`);
//         expect(res.statusCode).toEqual(200);
//     });
// });
