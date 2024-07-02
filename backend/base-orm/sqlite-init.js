// Para acceder a la BD usando aa-sqlite
const db = require('aa-sqlite');

// Crear la BD en caso de que no exista
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
      if (response.Cantidad > 0) {
            exists = true;
      }
      // Si no existe
      if (!exists) {
            // Crear tabla Libros
            await db.run(
                  `CREATE TABLE Libros (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  titulo TEXT NOT NULL UNIQUE COLLATE NOCASE, 
                  fecha_publicacion DATE NOT NULL, 
                  id_autor INT NOT NULL, 
                  id_editorial INT NOT NULL, 
                  precio DECIMAL(10,2) NOT NULL, 
                  id_genero INT NOT NULL, 
                  FOREIGN KEY (id_autor) REFERENCES Autores(id) ON DELETE CASCADE, 
                  FOREIGN KEY (id_editorial) REFERENCES Editoriales(id) ON DELETE CASCADE, 
                  FOREIGN KEY (id_genero) REFERENCES Generos(id))`
            );
            console.log("Tabla Libros creada!");
            // Agregamos valores
            await db.run(
                  `INSERT INTO Libros (titulo, fecha_publicacion, id_autor, id_editorial, precio, id_genero) VALUES 
                  ('Orgullo y Prejuicio', '1813-01-28', 1, 1, 20000, 7),
                  ('Kulti', '2015-03-20', 2, 2, 15000, 7),
                  ('Harry Potter y el Prisionero de Azkaban','1997-06-26',4,3,12000,1),
                  ('El Señor de los Anillos','2000-04-27',3,4,17000,1),
                  ('Dune','1995-08-03',5,5,13000,2),
                  ('Sinsajo','2010-08-24',6,6,18000,1),
                  ('La Ventana Siniestra','1932-04-10',7,7,10000,3),
                  ('El Silencio de la Ciudad Blanca','2016-08-23',8,8,19000,3),
                  ('Frankenstein','1818-01-01',9,9,14000,4),
                  ('Un Legado de Sangre','2023-09-09',10,10,16000,4),
                  ('Maria Antonieta','1932-07-15',11,11,11500,5),
                  ('Virginia Woolf y Victoria Ocampo','1931-02-19',12,12,11000,5),
                  ('Su Peor Pesadilla','2022-11-17',13,13,20000,6),
                  ('La Jugada Final','2023-02-23',14,14,21000,6),
                  ('Mujercitas','1868-12-13',15,15,22000,10),
                  ('Anna Karenina','1873-05-29',16,13,23000,10),
                  ('El Maravilloso Mago de Oz','1900-06-16',17,4,24000,9),
                  ('Alicia en el Pais de las Maravillas','1865-03-06',18,9,25000,9),
                  ('Martin Fierro','1872-04-01',19,7,10000,8),
                  ('Poesía de Paso','2019-08-07',20,6,11000,8)`
            );
      }
      // Tabla Genero
      exists = false;
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='Generos'",
            []
      );
      // Verificar si la tabla existe
      if (response.Cantidad > 0) {
            exists = true;
      }
      // Si no existe
      if (!exists) {
            // Crear tabla Generos
            await db.run(
                  `CREATE TABLE Generos (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  nombre TEXT NOT NULL)`
            );
            // Agrega valores
            console.log("Tabla Generos creada!");
            await db.run(
                  `INSERT INTO Generos (nombre) VALUES 
                  ('Fantasia'),
                  ('Ciencia Ficción'),
                  ('Misterio'),
                  ('Terror'),
                  ('Biografia'),
                  ('Crimen'),
                  ('Romance'),
                  ('Poesia'),
                  ('Infantil'),
                  ('Novela')`
            );
      }

      // Tabla Resenas
      exists = false;
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='Resenas'",
            []
      );
      // Verificar si la tabla existe
      if (response.Cantidad > 0) {
            exists = true;
      }
      // Si no existe
      if (!exists) {
            // Crear tabla Resenas
            await db.run(
                  `CREATE TABLE Resenas (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  id_libro INTEGER NOT NULL,
                  fecha_resena DATE NOT NULL,
                  comentario TEXT NOT NULL,
                  calificacion INTEGER NOT NULL,
                  user_name TEXT NOT NULL,
                  FOREIGN KEY (id_libro) REFERENCES Libros(id) ON DELETE CASCADE,
                  FOREIGN KEY (user_name) REFERENCES User_Name(user_name)
                  )`
            );
            console.log("Tabla Resenas creada!");
            // Agrega valores
            await db.run(
                  `INSERT INTO Resenas (id_libro, fecha_resena, comentario, calificacion, user_name) VALUES 
                  (1, '2023-04-15', 'Me fascina este libro. Muy cautivante. Lo recomendaría sin dudas!', 5, 'user1'),
                  (2, '2015-08-20', 'La calidad del autor es excelente, aunque no mi estilo.', 3, 'user2'),
                  (3, '2010-11-10', 'No me gustó para nada. No lo recomendaría.', 1, 'user3'),
                  (4, '2018-03-25', 'Me encantó. Muy buen libro.', 4, 'user4'),
                  (5, '2011-09-05', 'Muy buen libro. Me gustó mucho.', 4, 'user5'),
                  (6, '2019-06-12', 'Este libro tiene mucho potencial. Ojalá llegara al New York Times1', 5, 'user6'),
                  (7, '2014-10-30', 'Me encantó.', 4, 'user7'),
                  (8, '2012-07-18', 'Lo leí en un par de horas. Es fascinante.', 4, 'user8'),
                  (9, '2017-02-22', 'Como amante de los libros que soy, esta edición me ha decepcionado un poco pero respeto al autor.', 3, 'user9'),
                  (10, '2016-12-07', 'Me encantó. Muy buen libro.', 4, 'user10'),
                  (11, '2010-05-02', 'Es muy divertido. Lo recomendaría sin dudas!', 5, 'user10'),
                  (12, '2011-11-14', 'No es mi estilo de libros.', 2, 'user9'),
                  (13, '2013-09-28', 'No me gustó para nada. No lo recomendaría.', 1, 'user8'),
                  (14, '2018-01-03', 'Me encantó. Muy buen libro.', 4, 'user7'),
                  (15, '2019-08-09', 'Muy buen libro. Me gustó mucho.', 4, 'user6'),
                  (16, '2015-04-17', 'No me gustó para nada. No lo recomendaría.', 1, 'user5'),
                  (17, '2016-10-21', 'Me encantó. Muy buen libro.', 4, 'user4'),
                  (18, '2013-12-05', 'Muy buen libro. Me gustó mucho.', 4, 'user3'),
                  (19, '2014-06-30', 'No me gustó para nada. No lo recomendaría.', 1, 'user2'),
                  (20, '2020-02-19', 'Me encantó. Muy buen libro.', 4, 'user1'),
                  (1, '2011-07-23', 'Me encantó. Muy buen libro.', 4, 'user5'),
                  (2, '2017-05-11', 'Muy buen libro. Me gustó mucho.', 4, 'user4'),
                  (3, '2018-09-27', 'No me gustó para nada. No lo recomendaría.', 1, 'user3'),
                  (4, '2019-11-08', 'Me encantó. Muy buen libro.', 4, 'user2'),
                  (5, '2010-06-16', 'Muy buen libro. Me gustó mucho.', 4, 'user1'),
                  (6, '2012-04-04', 'No me gustó para nada. No lo recomendaría.', 1, 'user10'),
                  (7, '2013-10-29', 'Me encantó. Muy buen libro.', 4, 'user9'),
                  (8, '2016-03-07', 'Muy buen libro. Me gustó mucho.', 4, 'user8'),
                  (9, '2014-08-13', 'No me gustó para nada. No lo recomendaría.', 1, 'user7'),
                  (10, '2015-12-01', 'Me encantó. Muy buen libro.', 4, 'user6'),
                  (11, '2020-07-22', 'HORRIBLE.', 1, 'user6'),
                  (12, '2013-02-25', 'Muy buen libro. Me gustó mucho.', 4, 'user5'),
                  (13, '2012-10-12', 'No me gustó para nada. No lo recomendaría.', 1, 'user4'),
                  (14, '2017-04-09', 'Me encantó. Muy buen libro.', 4, 'user3'),
                  (15, '2018-06-03', 'Muy buen libro. Me gustó mucho.', 4, 'user2'),
                  (16, '2011-03-18', 'No me gustó para nada. No lo recomendaría.', 1, 'user1'),
                  (17, '2019-05-26', 'Me encantó. Muy buen libro.', 4, 'user10'),
                  (18, '2016-09-14', 'Muy buen libro. Me gustó mucho.', 4, 'user9'),
                  (19, '2013-07-02', 'No me gustó para nada. No lo recomendaría.', 1, 'user8'),
                  (20, '2010-08-06', 'Me encantó. Muy buen libro.', 4, 'user7');`
            );
      }

      // Tabla User_Name
      exists = false;
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='User_Name'",
            []
      );
      // Verificar si la tabla existe
      if (response.Cantidad > 0) {
            exists = true;
      }
      // Si no existe
      if (!exists) {
            // Crear tabla User_Name
            await db.run(
                  `CREATE TABLE User_Name (
                  user_name TEXT PRIMARY KEY, 
                  edad INTEGER NOT NULL)`
            );
            console.log("Tabla User_Name creada!");
            // Agrega valores
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

      // Tabla tipo documento
      exists = false;
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='Tipo_Documentos'",
            []
      );
      // Verificar si la tabla existe
      if (response.Cantidad > 0) {
            exists = true;
      }
      // Si no existe
      if (!exists) {
            await db.run(
                  // Crear tabla Tipo_Documentos
                  `CREATE TABLE Tipo_Documentos (
                  tipo INT PRIMARY KEY,
                  descripcion VARCHAR(50)
                  )`
            );
            console.log("Tabla Tipos_Documento creada!");
            // Agrega valores
            await db.run(
                  "INSERT INTO Tipo_Documentos (tipo, descripcion) VALUES (1, 'DNI'), (2, 'Cédula'), (3, 'Pasaporte'), (4, 'Numero de Identificacion de Extranjero')"
            );
      }

      // Tabla Autores

      exists = false;
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='Autores'",
            []
      );
      // Verificar si la tabla existe
      if (response.Cantidad > 0) {
            exists = true;
      }
      // Si no existe
      if (!exists) {
            await db.run(
                  // Crear tabla Autores
                  `CREATE TABLE Autores (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  nombre TEXT NOT NULL,
                  apellido TEXT NOT NULL,
                  fecha_nacimiento DATE NOT NULL,
                  tipo_documento INT NOT NULL,
                  nro_documento VARCHAR(20) NOT NULL,
                  FOREIGN KEY (tipo_documento) REFERENCES Tipo_Documentos(tipo)
                  UNIQUE(tipo_documento, nro_documento)
                  )`
            );
            console.log("Tabla Autores creada!");
            // Agrega valores
            await db.run(
                  `INSERT INTO Autores (tipo_documento, nro_documento, nombre, apellido, fecha_nacimiento) VALUES
                  (1, '12345678', 'Jane', 'Austen', '1775-12-16'),
                  (2, '87654321', 'Mariana', 'Zapata', '1986-09-27'),
                  (3, 'ABC233445', 'John', 'Ronald ', '1892-01-03'),
                  (4, '44332211', 'J.K.', 'Rowling', '1965-07-31'),
                  (1, '4562278', 'Frank', 'Herbert', '1920-10-08'),
                  (2, '54321351', 'Suzanne', 'Collins', '1962-08-10'),
                  (3, 'JAP233404', 'Raymond', 'Chandler', '1888-07-23'),
                  (4, '3522119', 'Stephen', 'King', '1947-09-21'),
                  (1, '56783678', 'Mary', 'Shelley', '1797-08-30'),
                  (2, '46799861', 'S.T.', 'Gibson', '1990-02-02'),
                  (3, 'RFG233448', ' Évelyne', 'Lever', '1944-03-03'),
                  (4, '44567012', 'Irene', 'Chikiar Bauer', '1978-04-04'),
                  (1, '7457778', 'Andrea', 'Mara', '1974-01-01'),
                  (2, '21112404', 'Jennifer', 'Lynn Barnes', '1984-10-19'),
                  (3, 'NBH234068', 'Louisa', 'May Alcott', '1832-11-29'),
                  (4, '20124506', 'León', 'Tolstói', '1828-09-09'),
                  (1, '4693275', 'Frank', 'Baum', '1856-05-15'),
                  (2, '8156436', 'Lewis', 'Carroll', '1832-01-27'),
                  (3, 'SCL620861', 'José', 'Hernández', '1834-10-21'),
                  (4, '12356790', 'Alvaro', 'Garat', '2000-04-04')`
            );
      }

      // Tabla Editorial
      exists = false;
      sql = "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='Editoriales'",
      response = await db.get(sql, []);
      // Verificar si la tabla existe
      if (response.Cantidad > 0) 
            exists = true;
      // Si no existe
      if (!exists) {
            await db.run(
                  // Crear tabla Editoriales
                  `CREATE TABLE Editoriales (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  nombre VARCHAR(50) NOT NULL UNIQUE COLLATE NOCASE, 
                  direccion VARCHAR(100) NOT NULL,  
                  fecha_fundacion DATE NOT NULL, 
                  id_pais INTEGER NOT NULL, FOREIGN KEY (id_pais) REFERENCES Paises(id) )`
            );
            console.log("tabla Editoriales creada!");
      }

      // insert editorial
      await db.run(`INSERT INTO Editoriales (nombre, direccion, fecha_fundacion, id_pais)
            VALUES
                  ('Penguin Random House', '1745 Broadway, New York', '1927-01-01', 1), 
                  ('HarperCollins', '1 London Bridge Street, London', '1817-01-01', 2),
                  ('Hachette Livre', '43 Quai de Grenelle, 75015 Paris', '1826-01-01', 3), 
                  ('Planeta', 'Av. Diagonal, 662-664, 08034 Barcelona', '1949-01-01', 4), 
                  ('Companhia das Letras', 'Rua Bandeira Paulista, 702, São Paulo', '1986-01-01', 5), 
                  ('Bertelsmann', 'Carl-Bertelsmann-Straße 270, 33311 Gütersloh', '1835-01-01', 6), 
                  ('Mondadori', 'Via Bianca di Savoia, 12, 20122 Milan', '1907-01-01', 7), 
                  ('Shueisha', '2-5-10 Hitotsubashi, Chiyoda-ku, Tokyo', '1925-01-01', 8), 
                  ('Farrar, Straus and Giroux', '18 West 18th Street, New York', '1946-01-01', 1), 
                  ('Seix Barral', 'Av. Diagonal, 662-664, 08034 Barcelona', '1911-01-01', 4), 
                  ('Auckland University Press', '1-11 Short Street', '1966-01-01', 12), 
                  ('Aschehoug', 'Sehesteds gate 3, 0164 Oslo', '1872-01-01', 13), 
                  ('Gallimard', '5 Rue Gaston Gallimard, 75007 Paris', '1911-01-01', 3), 
                  ('Tusquets Editores', 'Carrer de Mallorca, 310, 08037 Barcelona', '1969-01-01', 4), 
                  ('Salamandra', 'Carrer de Mallorca, 237, 08008 Barcelona', '1989-01-01', 4);
            `);
            
      // Tabla Pais
      exists = false;
      sql = "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='Paises'",
      response = await db.get(sql, []);
      // Verificar si la tabla existe
      if (response.Cantidad > 0)
            exists = true;
      // Si no existe
      if (!exists) {
            await db.run(
                  // Crear tabla Paises
                  `CREATE TABLE Paises (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  nombre VARCHAR(50) NOT NULL)`
            );
            console.log("Tabla Paises creada!");
      }

      // insert Paises
      await db.run(`INSERT INTO Paises (id, nombre)
            VALUES
            (1, 'Estados Unidos'),
            (2, 'Reino Unido'),
            (3, 'Francia'),
            (4, 'España'),
            (5, 'Brasil'),
            (6, 'Alemania'),
            (7, 'Italia'),
            (8, 'Japón'),
            (9, 'Australia'),
            (10, 'Chile'),
            (11, 'Colombia'),
            (12, 'Nueva Zelanda'),
            (13, 'Noruega');`);
      
      db.close();
}

// Ejecutar la función
CrearDBSiNoExiste();

// Exportar la base de datos para poder usarla en otros archivos
module.exports = CrearDBSiNoExiste;