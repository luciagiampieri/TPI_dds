// Para acceder a la BD usando aa-sqlite
const db = require("aa-sqlite");

async function CrearDBSiNoExiste() {
      // abrir BD, si no existe la crea
      await db.open("./.data/BD_dds.db");

      let exists = false;
      let response = null;

      // Tabla Libros
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='Libros'",
            []
      );
      // Verificar si la tabla existe
      if (response.Cantidad > 0)
            exists = true;
      // Si no existe
      if (!exists) {
            // Crear tabla Libros
            await db.run(
                  "CREATE TABLE Libros (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT NOT NULL, fecha_publicacion DATE NOT NULL, id_autor INT NOT NULL, id_editorial INT NOT NULL, precio DECIMAL(10,2) NOT NULL, id_genero INT NOT NULL, FOREIGN KEY (id_autor) REFERENCES Autores(id), FOREIGN KEY (id_editorial) REFERENCES Editoriales(id), FOREIGN KEY (id_genero) REFERENCES Generos(id))" 
            );
            console.log("Tabla Libros creada!");
            // Agregamos valores
            await db.run(
                  "INSERT INTO Libros VALUES ('Orgullo y Prejuicio', '1813-01-28', 1, 3, 20000, 7);\n"
                  + "INSERT INTO Libros VALUES ('Kulti', '2015-03-20', 2, 2, 15000, 7);\n"
                  + "INSERT INTO Libros VALUES ('Harry Potter y el Prisionero de Azkaban','1997-06-26',4,12000,1);\n"
                  + "INSERT INTO Libros VALUES ('El Señor de los Anillos','2000-04-27',3,17000,1);\n"
                  + "INSERT INTO Libros VALUES ('Dune','1995-08-03',5,13000,2);\n"
                  + "INSERT INTO Libros VALUES ('Sinsaje','2010-08-24',6,18000,1);\n"
                  + "INSERT INTO Libros VALUES ('La Ventana Siniestra','1932-04-10',7,10000,3);\n"
                  + "INSERT INTO Libros VALUES ('El Silencio de la Ciudad Blanca','2016-08-23',8,19000,3);\n"
                  + "INSERT INTO Libros VALUES ('Frankenstein','1818-01-01',9,14000,4);\n"
                  + "INSERT INTO Libros VALUES ('Un Legado de Sangre','2023-09-09',10,16000,4);\n"
                  + "INSERT INTO Libros VALUES ('Maria Antonieta','1932-07-15',11,11500,5);\n"
                  + "INSERT INTO Libros VALUES ('Virginia Woolf y Victoria Ocampo','1931-02-19',12,11000,5);\n"
                  + "INSERT INTO Libros VALUES ('Su Peor Pesadilla','2022-11-17',13,20000,6);\n"
                  + "INSERT INTO Libros VALUES ('La Jugada Final','2023-02-23',14,21000,6);\n"
                  + "INSERT INTO Libros VALUES ('Mujercitas','1868-12-13',15,22000,10);\n"
                  + "INSERT INTO Libros VALUES ('Anna Karenina','1873-05-29',16,23000,10);\n"
                  + "INSERT INTO Libros VALUES ('El Maravilloso Mago de Oz','1900-06-16',17,24000,9);\n"
                  + "INSERT INTO Libros VALUES ('Alicia en el Pais de las Maravillas','1865-03-06',18,25000,9);\n"
                  + "INSERT INTO Libros VALUES ('Martin Fierro','1872-04-01',19,10000,8);\n"
                  + "INSERT INTO Libros VALUES ('Poesía de Paso','2019-08-07',20,11000,8);\n"
            );
      }
      // Tabla Genero
      exists = false;
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='Generos'",
            []
      );
      if (response.Cantidad > 0)
            exists = true;
      if (!exists) {
            await db.run(
                  "CREATE TABLE Generos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL);"
            );
            console.log("Tabla Generos creada!");
            await db.run(
                  "INSERT INTO Generos VALUES ('Fantasia'),('Ciencia Ficción'),('Misterio'),('Terror'),('Biografia'),('Crimen'),('Romance'),('Poesia'),('Infantil'),('Novela')"
            );
      }

      // Tabla Resenas
      exists = false;
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='Resenas'",
            []
      );
      if (response.Cantidad > 0)
            exists = true;
      if (!exists) {
            await db.run(
                  `CREATE TABLE Resenas (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        id_libro INTEGER NOT NULL,
                        fecha_resena DATE NOT NULL,
                        comentario TEXT NOT NULL,
                        calificacion INTEGER NOT NULL,
                        user_name TEXT NOT NULL,
                        FOREIGN KEY (id_libro) REFERENCES Libros(id),
                        FOREIGN KEY (user_name) REFERENCES User_Name(user_name)
                  )`
            );
            console.log("Tabla Resenas creada!");
            await db.run(
                  `INSERT INTO Resenas (id_libro, fecha_resena, comentario, calificacion, user_name) VALUES 
                  (1, '2021-06-01', 'Me fascina este libro. Muy cautivante. Lo recomendaría sin dudas!', 5, 'user1'),
                  (2, '2021-06-01', 'La calidad del autor es excelente, aunque no mi estilo.', 3, 'user2'),
                  (3, '2021-06-01', 'No me gustó para nada. No lo recomendaría.', 1, 'user3'),
                  (4, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user4'),
                  (5, '2021-06-01', 'Muy buen libro. Me gustó mucho.', 4, 'user5'),
                  (6, '2021-06-01', 'Este libro tiene mucho potencial. Ojalá llegara al New York Times1', 5, 'user6'),
                  (7, '2021-06-01', 'Me encantó.', 4, 'user7'),
                  (8, '2021-06-01', 'Lo leí en un par de horas. Es fascinante.', 4, 'user8'),
                  (9, '2021-06-01', 'Como amante de los libros que soy, esta edición me ha decepcionado un poco pero respeto al autor.', 3, 'user9'),
                  (10, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user10')
                  (1, '2021-06-01', 'Es muy divertido. Lo recomendaría sin dudas!', 5, 'user10'),
                  (2, '2021-06-01', 'No es mi estilo de libros.', 2, 'user9'),
                  (3, '2021-06-01', 'No me gustó para nada. No lo recomendaría.', 1, 'user8'),
                  (4, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user7'),
                  (5, '2021-06-01', 'Muy buen libro. Me gustó mucho.', 4, 'user6'),
                  (6, '2021-06-01', 'No me gustó para nada. No lo recomendaría.', 1, 'user5'),
                  (7, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user4'),
                  (8, '2021-06-01', 'Muy buen libro. Me gustó mucho.', 4, 'user3'),
                  (9, '2021-06-01', 'No me gustó para nada. No lo recomendaría.', 1, 'user2'),
                  (10, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user1'),
                  (11, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user5'),
                  (12, '2021-06-01', 'Muy buen libro. Me gustó mucho.', 4, 'user4'),
                  (13, '2021-06-01', 'No me gustó para nada. No lo recomendaría.', 1, 'user3'),
                  (14, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user2'),
                  (15, '2021-06-01', 'Muy buen libro. Me gustó mucho.', 4, 'user1'),
                  (16, '2021-06-01', 'No me gustó para nada. No lo recomendaría.', 1, 'user10'),
                  (17, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user9'),
                  (18, '2021-06-01', 'Muy buen libro. Me gustó mucho.', 4, 'user8'),
                  (19, '2021-06-01', 'No me gustó para nada. No lo recomendaría.', 1, 'user7'),
                  (20, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user6')
                  (20, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user6'),
                  (19, '2021-06-01', 'Muy buen libro. Me gustó mucho.', 4, 'user5'),
                  (18, '2021-06-01', 'No me gustó para nada. No lo recomendaría.', 1, 'user4'),
                  (17, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user3'),
                  (16, '2021-06-01', 'Muy buen libro. Me gustó mucho.', 4, 'user2'),
                  (15, '2021-06-01', 'No me gustó para nada. No lo recomendaría.', 1, 'user1'),
                  (14, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user10'),
                  (13, '2021-06-01', 'Muy buen libro. Me gustó mucho.', 4, 'user9'),
                  (12, '2021-06-01', 'No me gustó para nada. No lo recomendaría.', 1, 'user8'),
                  (11, '2021-06-01', 'Me encantó. Muy buen libro.', 4, 'user7')`
            );
      }

      // Tabla User_Name
      exists = false;
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='User_Name'",
            []
      );
      if (response.Cantidad > 0)
            exists = true;
      if (!exists) {
            await db.run(
                  "CREATE TABLE User_Name (user_name TEXT PRIMARY KEY, edad INTEGER NOT NULL)"
            );
            console.log("Tabla User_Name creada!");
            await db.run(
                  `INSERT INTO User_Name (user_name, edad) VALUES
                  ('user1', 25), 
                  ('user2', 30), 
                  ('user3', 14), 
                  ('user4', 28), 
                  ('user5', 35), 
                  ('user6', 44), 
                  ('user7', 32), 
                  ('user8', 29), 
                  ('user9', 20), 
                  ('user10', 60)`
            );
      }




};