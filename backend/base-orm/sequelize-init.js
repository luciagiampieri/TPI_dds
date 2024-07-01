const { Sequelize, DataTypes } = require('sequelize');
// cambiar la ruta!!!! a nuestra ruta
const sequelize = new Sequelize('sqlite:' + "./.data/BD_dds.db", {timezone: '+00:00'});

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
                  },
            },
            fecha_publicacion: {
                  type: DataTypes.DATEONLY,
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
                        min: {
                              args: [0],
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
            id: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true,
            },
            tipo_documento: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'El tipo de documento es requerido'
                        },
                  },
            },
            nro_documento: {
                  type: DataTypes.STRING(20),
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
                  type: DataTypes.DATEONLY,
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
                  type: DataTypes.DATEONLY,
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
                  type: DataTypes.DATEONLY,
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
            user_name: {
                  type: DataTypes.STRING(50),
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'El nombre de usuario es requerido'
                        },
                        len: {
                              args: [3, 50],
                              msg: 'El campo nombre de usuario debe tener entre 3 y 50 caracteres'
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
            timestamps: false,
      },
);

const User_Name= sequelize.define(
      "User_Name",
      {
            user_name: {
                  type: DataTypes.STRING(50),
                  primaryKey: true,
                  allowNull: false,
                  validate: {
                        notEmpty: {
                              args: true,
                              msg: 'El nombre de usuario es requerido'
                        },
                        len: {
                              args: [3, 50],
                              msg: 'El campo nombre de usuario debe tener entre 3 y 50 caracteres'
                        },
                  },
            },
            edad: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  validate: {
                        notNull: {
                              args: true,
                              msg: 'La edad es requerida'
                        },
                  },
            },
      },

      {
            hooks: {
                  beforeValidate: function (User_Name, options) {
                        if (typeof User_Name.user_name === 'string') {
                              User_Name.user_name = User_Name.user_name.toUpperCase().trim();
                        }
                  }
            },
            timestamps: false,
            freezeTableName: true
      },
);


// Asociación entre Resenas y Libros
Resenas.belongsTo(Libros, { foreignKey: 'id_libro', as: 'libro' });
Libros.hasMany(Resenas, { foreignKey: 'id_libro', as: 'resenas' });

// Asociación entre Editoriales y Paises
Editoriales.belongsTo(Paises, { foreignKey: 'id_pais', as: 'Paises' });
Paises.hasMany(Editoriales, { foreignKey: 'id_pais', as: 'Editoriales' });

// Asociación entre Autores y Tipo_Documentos
Autores.belongsTo(Tipo_Documentos, { foreignKey: 'tipo_documento', as: 'Tipo_Documentos' });
Tipo_Documentos.hasMany(Autores, { foreignKey: 'tipo_documento', as: 'Autores' });

// Asociación entre Libros y Autores
Libros.belongsTo(Autores, { foreignKey: 'id_autor', as: 'Autores' });
Autores.hasMany(Libros, { foreignKey: 'id_autor', as: 'Libros' });

// Asociación entre Libros y Editoriales
Libros.belongsTo(Editoriales, { foreignKey: 'id_editorial', as: 'Editoriales' });
Editoriales.hasMany(Libros, { foreignKey: 'id_editorial', as: 'Libros' });

// Asociación entre Libros y Generos
Libros.belongsTo(Generos, { foreignKey: 'id_genero', as: 'Generos' });
Generos.hasMany(Libros, { foreignKey: 'id_genero', as: 'Libros' });

// Asociación entre Resenas y User_Name
Resenas.belongsTo(User_Name, { foreignKey: 'user_name', as: 'User_Name' });
User_Name.hasMany(Resenas, { foreignKey: 'user_name', as: 'Resenas' });

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
      User_Name
};