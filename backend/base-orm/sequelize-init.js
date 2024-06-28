const { timeStamp } = require('console');
const { Sequelize, DataTypes } = require('sequelize');
// cambiar la ruta!!!! a nuestra ruta
const sequelize = new Sequelize('sqlite::memory:');

//Definir el modelo
const Libros = sequelize.define(
      'Libros',
      {
            id: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
            },
            titulo:{
                  type: DataTypes.STRING(80),
                  allowNull: false,
                  validate:{
                        notEmpty: {
                              args: true,
                              msg: 'El titulo es requerido'
                        },
                        len: {
                              args: [2, 80],
                              msg: 'El campo titulo debe tener entre 2 y 80 caracteres'
                        },
                        unique: {
                              args: true,
                              msg: 'El titulo ya existe'
                        },
                  },
            },
            fecha_publicacion: {
                  type: DataTypes.DATE,
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'La fecha de publicación es requerida'
                        },
                  },
            },
            id_autor: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'El autor es requerido'
                        },
                  },
            },
            id_editorial: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'La editorial es requerida'
                        },
                  },
            },
            precio: {
                  type: DataTypes.DECIMAL(10, 2),
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'El precio es requerido'
                        },
                        isDecimal: {
                              args: true,
                              msg: 'El precio debe ser un número decimal'
                        },
                        min: {
                              args: 0,
                              msg: 'El precio debe ser mayor a 0'
                        },
                  },
            },
            id_genero: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'El género es requerido'
                        },
                  },
            },
      },

      { // hooks es para pasar de mayusculas y evitar espacios en blanco (trim)
            hooks: {
                  beforeValidate: function (Libros, options) {
                        if (typeof Libros.titulo === 'string') {
                              Libros.titulo = Libros.titulo.toUpperCase().trim();
                        }
                  }
            },
            timestamps: false
      },
);

const Generos= sequelize.define(
      "Generos",
      {
            id: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
            },
            nombre: {
                  type: DataTypes.STRING(40),
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'El nombre es requerido'
                        },
                        len: {
                              args: [3, 40],
                              msg: 'El campo nombre debe tener entre 3 y 40 caracteres'
                        },
                  },
            },
      },

      {
            hooks: {
                  beforeValidate: function (Generos, options) {
                        if (typeof Generos.nombre === 'string') {
                              Generos.nombre = Generos.nombre.toUpperCase().trim();
                        }
                  }
            },
            timestamps: false
      },
);

const Autores= sequelize.define(
      "Autores",
      {
            tipo_documento: {
                  type: DataTypes.STRING(10),
                  primaryKey: true,
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'El tipo de documento es requerido'
                        },
                        len: {
                              args: [2, 10],
                              msg: 'El campo tipo de documento debe tener entre 2 y 10 caracteres'
                        },
                  },
            },
            nro_documento: {
                  type: DataTypes.STRING(20),
                  primaryKey: true,
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'El número de documento es requerido'
                        },
                        len: {
                              args: [7, 20],
                              msg: 'El campo número de documento debe tener entre 7 y 20 caracteres'
                        },
                  },
            },
            nombre: {
                  type: DataTypes.STRING(50),
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'El nombre es requerido'
                        },
                        len: {
                              args: [3, 50],
                              msg: 'El campo nombre debe tener entre 3 y 50 caracteres'
                        },
                  },
            },
            apellido: {
                  type: DataTypes.STRING(50),
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'El apellido es requerido'
                        },
                        len: {
                              args: [3, 50],
                              msg: 'El campo apellido debe tener entre 3 y 50 caracteres'
                        },
                  },
            },
            fecha_nacimiento: {
                  type: DataTypes.DATE,
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'La fecha de nacimiento es requerida'
                        },
                  },
            },
      },
      
      {
            hooks: {
                  beforeValidate: function (Autores, options) {
                        if (typeof Autores.nombre === 'string') {
                              Autores.nombre = Autores.nombre.toUpperCase().trim();
                        }
                        if (typeof Autores.apellido === 'string') {
                              Autores.apellido = Autores.apellido.toUpperCase().trim();
                        }
                  }
            },
            timestamps: false
      },
);

//REVISAR************************
const Tipo_Documentos = sequelize.define(
      "Tipo_Documentos",
      {
            tipo: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  primaryKey: true
            },
            descripcion: {
                  type: DataTypes.STRING(50),
            },
      },
);

const Editoriales= sequelize.define(
      "Editoriales",
      {
            id: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
            },
            nombre: {
                  type: DataTypes.STRING(50),
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'El nombre es requerido'
                        },
                        len: {
                              args: [3, 50],
                              msg: 'El campo nombre debe tener entre 3 y 50 caracteres'
                        },
                  },
            },
            direccion: {
                  type: DataTypes.STRING(100),
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'La dirección es requerida'
                        },
                        len: {
                              args: [3, 100],
                              msg: 'El campo dirección debe tener entre 3 y 100 caracteres'
                        },
                  },
            },
            fecha_fundacion: {
                  type: DataTypes.DATE,
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'La fecha de fundación es requerida'
                        },
                  },
            },
            id_pais: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'El país es requerido'
                        },
                  },
            },
      },

      {
            hooks: {
                  beforeValidate: function (Editoriales, options) {
                        if (typeof Editoriales.nombre === 'string') {
                              Editoriales.nombre = Editoriales.nombre.toUpperCase().trim();
                        }
                        if (typeof Editoriales.direccion === 'string') {
                              Editoriales.direccion = Editoriales.direccion.toUpperCase().trim();
                        }
                  }
            },
            timestamps: false
      },
);


const Paises= sequelize.define(
      "Paises",
      {
            id: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
            },
            nombre: {
                  type: DataTypes.STRING(50),
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'El nombre es requerido'
                        },
                        len: {
                              args: [3, 50],
                              msg: 'El campo nombre debe tener entre 3 y 50 caracteres'
                        },
                  },
            },
      },

      {
            hooks: {
                  beforeValidate: function (Paises, options) {
                        if (typeof Paises.nombre === 'string') {
                              Paises.nombre = Paises.nombre.toUpperCase().trim();
                        }
                  }
            },
            timestamps: false
      },
);

const Resenas= sequelize.define(
      "Resenas",
      {
            id: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
            },
            id_libro: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'El libro es requerido'
                        },
                  },
            },
            fecha_resena: {
                  type: DataTypes.DATE,
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'La fecha de la reseña es requerida'
                        },
                  },
            },
            comentario: {
                  type: DataTypes.STRING(500),
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'El comentario es requerido'
                        },
                        len: {
                              args: [3, 500],
                              msg: 'El campo comentario debe tener entre 3 y 500 caracteres'
                        },
                  },
            },
            calificacion: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'La calificación es requerida'
                        },
                        isInt: {
                              args: true,
                              msg: 'La calificación debe ser un número entero'
                        },
                        min: {
                              args: 1,
                              msg: 'La calificación debe ser mayor a 0'
                        },
                        max: {
                              args: 5,
                              msg: 'La calificación debe ser menor a 6'
                        },
                  },
            },
            id_tipo_resena: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'El tipo de reseña es requerido'
                        },
                  },
            },
      },

      {
            hooks: {
                  beforeValidate: function (Resenas, options) {
                        if (typeof Resenas.comentario === 'string') {
                              Resenas.comentario = Resenas.comentario.toUpperCase().trim();
                        }
                  }
            },
            timestamps: false
      },
);

const Tipo_Resenas= sequelize.define(
      "Tipo_Resenas",
      {
            id: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
            },
            nombre: {
                  type: DataTypes.STRING(50),
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'El nombre es requerido'
                        },
                        len: {
                              args: [3, 50],
                              msg: 'El campo nombre debe tener entre 3 y 50 caracteres'
                        },
                  },
            },
      },

      {
            hooks: {
                  beforeValidate: function (Tipo_Resenas, options) {
                        if (typeof Tipo_Resenas.nombre === 'string') {
                              Tipo_Resenas.nombre = Tipo_Resenas.nombre.toUpperCase().trim();
                        }
                  }
            },
            timestamps: false
      },
);

// Exportar los modelos
module.exports = {
      sequelize,
      Libros,
      Generos,
      Autores,
      Tipo_Documentos,
      Editoriales,
      Paises,
      Resenas,
      Tipo_Resenas,
};