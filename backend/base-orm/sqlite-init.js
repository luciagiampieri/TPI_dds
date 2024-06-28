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
                  "INSERT INTO Libros VALUES ('Pride and Prejudice', '1813-01-28', 1, 28, 9.99, 13),('Emma', '1815-12-23', 1, 28, 9.99, 13),('Sense and Sensibility', '1811-10-30', 1, 28, 9.99, 13),('Kulti','2015-04-11',5,12.1,13),('Harry Potter and the Sorcerers Stone','1997-06-26',2,12.1,3),('Harry Potter and the Chamber of Secrets','1998-07-02',2,12.1,3),('Harry Potter and the Prisoner of Azkaban','1999-07-08',2,12.1,3),('Harry Potter and the Goblet of Fire','2000-07-08',2,12.1,3),('Harry Potter and the Order of the Phoenix','2003-06-21',2,12.1,3),('Harry Potter and the Half-Blood Prince','2005-07-16',2,12.1,3),('Harry Potter and the Deathly Hallows','2007-07-21',2,12.1,3),('The Hunger Games','2008-09-14',3,12.1,13)"
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
                  "INSERT INTO Generos VALUES ('Romance'),('Fantasy'),('Science Fiction'),('Mystery'),('Horror'),('Biography'),('Cookbook'),('Art'),('Crime'),('Poetry'),('Childrens'),('Religion')"
            );
      }

      // Tabla tipo documento
      exists = false;
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='TipoDocumentos'",
            []
      );

      if (response.Cantidad > 0)
            exists = true;

      if (!exists) {
            await db.run(
                  `CREATE TABLE TiposDocumento (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      nombre TEXT NOT NULL
                  )`
            );
            console.log("Tabla TiposDocumento creada!");
            await db.run(
                  "INSERT INTO TiposDocumento VALUES ('DNI'),('Cédula'),('Pasaporte'),('Numero de Identificacion de Extranjero')"
            );
      }

      // Tabla Autores

      exists = false;
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='Autores'",
            []
      );

      if (response.Cantidad > 0)
            exists = true;

      if (!exists) {
            await db.run(
                  `CREATE TABLE Autores (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      nombre TEXT NOT NULL,
                      apellido TEXT NOT NULL,
                      fecha_nacimiento DATE NOT NULL,
                      id_tipo_documento INT NOT NULL,
                      numero_documento TEXT NOT NULL,
                      UNIQUE (nro_documento),
                      FOREIGN KEY (id_tipo_documento) REFERENCES TiposDocumento(id)
                  )`
            );
            console.log("Tabla Autores creada!");
            await db.run(
                  `INSERT INTO Autores (tipo_documento, nro_documento, nombre, apellido, fecha_nacimiento) VALUES
            (1, '12345678', 'Jane', 'Austen', '1775-12-16'),
            (2, '87654321', 'Mariana', 'Zapata', '1986-09-27'),
            (3, '11223344', 'John', 'Ronald ', '1892-01-03'),
            (4, '44332211', 'J.K.', 'Rowling', '1965-07-31'),
            (1, '12345678', 'Frank', 'Herbert', '1920-10-08'),
            (2, '87654321', 'Suzanne', 'Collins', '1962-08-10'),
            (3, '11223344', 'Raymond', 'Chandler', '1888-07-23'),
            (4, '44332211', 'Stephen', 'King', '1947-09-21'),
            (1, '12345678', 'Mary', 'Shelley', '1797-08-30'),
            (2, '87654321', 'S.T.', 'Gibson', '1990-02-02'),
            (3, '11223344', ' Évelyne', 'Lever', '1944-03-03'),
            (4, '44332211', 'Irene', 'Chikiar Bauer', '1978-04-04'),
            (1, '12345678', 'Andrea', 'Mara', '1974-01-01'),
            (2, '87654321', 'Jennifer', 'Lynn Barnes', '1984-10-19'),
            (3, '11223344', 'Louisa', 'May Alcott', '1832-11-29'),
            (4, '44332211', 'León', 'Tolstói', '1828-09-09'),
            (1, '12345678', 'Frank', 'Baum', '1856-05-15'),
            (2, '87654321', 'Lewis', 'Carroll', '1832-01-27'),
            (3, '11223344', 'José', 'Hernández', '1834-10-21'),
            (4, '44332211', 'Alvaro', 'Garat', '2000-04-04')`
            );
      }







};