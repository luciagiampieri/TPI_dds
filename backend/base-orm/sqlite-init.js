// Para acceder a la BD usando aa-sqlite
const db = require("aa-sqlite");

async function CrearDBSiNoExiste() {
      // abrir BD, si no existe la crea
      await db.open("RUTA_A_LA_BD");

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
};