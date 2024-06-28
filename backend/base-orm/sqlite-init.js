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

      // Tabla Editorial
      exists = false;
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='Editoriales'",
            []
      );
      if (response.Cantidad > 0)
            exists = true;
      if (!exists) {
            await db.run(
                  "CREATE TABLE Editoriales (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50) NOT NULL, direccion VARCHAR(100) NOT NULL,  fecha_fundacion DATE NOT NULL, id_pais INTEGER NOT NULL );"
            );
            console.log("Tabla Editoriales creada!");
/*             await db.run(
                  "INSERT INTO Editoriales VALUES ('Penguin Random House'),('HarperCollins'),('Simon & Schuster'),('Hachette Livre'),('Macmillan'),('Wiley'),('Scholastic'),('Pearson'),('Penguin'),('Houghton Mifflin')"
            ); */
            console.log("tabla Editoriales creada!");
      }

      // insert editorial
      await db.run(`INSERT INTO Editoriales (id, nombre, direccion, fecha_fundacion, id_pais)
            VALUES
                  (1, 'Penguin Random House', '1745 Broadway, New York', '1927-01-01', 1), 
                  (2, 'HarperCollins', '1 London Bridge Street, London', '1817-01-01', 2),
                  (3, 'Hachette Livre', '43 Quai de Grenelle, 75015 Paris', '1826-01-01', 3), 
                  (4, 'Planeta', 'Av. Diagonal, 662-664, 08034 Barcelona', '1949-01-01', 4), 
                  (5, 'Companhia das Letras', 'Rua Bandeira Paulista, 702, São Paulo', '1986-01-01', 5), 
                  (6, 'Bertelsmann', 'Carl-Bertelsmann-Straße 270, 33311 Gütersloh', '1835-01-01', 6), 
                  (7, 'Mondadori', 'Via Bianca di Savoia, 12, 20122 Milan', '1907-01-01', 7), -- Italia
                  (8, 'Shueisha', '2-5-10 Hitotsubashi, Chiyoda-ku, Tokyo', '1925-01-01', 8), -- Japón
                  (9, 'Allen & Unwin', '83 Alexander Street, Crows Nest NSW 2065', '1914-01-01', 9), 
                  (10, 'Anaya', 'Juan Ignacio Luca de Tena, 15, 28027 Madrid', '1959-01-01', 4),
                  (11, 'Editora Sextante', 'Rua Voluntários da Pátria, 45 - Botafogo', '1998-01-01', 5),
                  (12, 'Editorial Universitaria', 'Alameda 1058, Santiago, '1947-01-01', 10),
                  (13, 'Editorial Norma', 'Calle 80 No. 8-29, Bogotá', '1960-01-01', 11),
                  (14, 'Farrar, Straus and Giroux', '18 West 18th Street, New York', '1946-01-01', 1), 
                  (15, 'Seix Barral', 'Av. Diagonal, 662-664, 08034 Barcelona', '1911-01-01', 4), 
                  (16, 'Auckland University Press', '1-11 Short Street', '1966-01-01', 12), 
                  (17, 'Aschehoug', 'Sehesteds gate 3, 0164 Oslo', '1872-01-01', 13), 
                  (18, 'Gallimard', '5 Rue Gaston Gallimard, 75007 Paris', '1911-01-01', 3), 
                  (19, 'Tusquets Editores', 'Carrer de Mallorca, 310, 08037 Barcelona', '1969-01-01', 4), 
                  (20, 'Salamandra', 'Carrer de Mallorca, 237, 08008 Barcelona', '1989-01-01', 4);
            `);
            
      // Tabla Pais
      exists = false;
      response = await db.get(
            "SELECT COUNT(*) as Cantidad FROM sqlite_schema WHERE type='table' AND name='Paises'",
            []
      );
      if (response.Cantidad > 0)
            exists = true;
      if (!exists) {
            await db.run(
                  "CREATE TABLE Paises (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50) NOT NULL);"
            );
            /* await db.run(
                  "INSERT INTO Paises VALUES ('Argentina'),('Australia'),('Brazil'),('Canada'),('China'),('France'),('Germany'),('India'),('Italy'),('Japan'),('Mexico'),('Russia'),('South Africa'),('South Korea'),('Spain'),('United Kingdom'),('United States')"
            ); */
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
      
};