import httpService from "./http.service";
import { config } from "../config";

// import axios from "axios";
// import { config } from "../config";

// const { urlResourceLibros } = config;

// async function getAllLibros(titulo, Pagina) {
//       const resp = await axios.get(urlResourceLibros, {
//             params: { titulo, Pagina },
//       });
//       return resp.data.Items;
// }

// async function getByIdLibros(item) {
//       const resp = await axios.get(urlResourceLibros + "/" + item.idSerie);
//       return resp.data.Items;
// }

// async function ActivarDesactivar(item) {
//       await axios.delete(urlResourceLibros + "/" + item.idSerie);
// }

// async function saveLibros(item) {
//       if (item.id === 0) {
//             await axios.post(urlResourceLibros, item);
//       } else {
//             await axios.put(urlResourceLibros + "/" + item.id, item);
//       }
// }


// async function deleteLibro(item) {
//       await axios.delete(urlResourceLibros + "/" + item.id);
// }

// const librosService = {
//       getAllLibros,
//       getByIdLibros,
//       ActivarDesactivar,
//       saveLibros,
//       deleteLibro,
// };

// export default librosService;

// libros.service.js

// libros.service.js

const { urlResourceLibros } = config;

async function getAllLibros(titulo, Pagina) {
      try {
            const resp = await httpService.get(urlResourceLibros, {
                  params: { titulo, Pagina },
            });
            return resp.data.Items;
      } catch (error) {
            console.error("Error al obtener todos los libros:", error);
            throw error;
      }
}

async function getByIdLibros(item) {
      try {
            const resp = await httpService.get(`${urlResourceLibros}/${item.idSerie}`);
            return resp.data;
      } catch (error) {
            console.error(`Error al obtener el libro con ID ${item.idSerie}:`, error);
            throw error;
      }
}

async function ActivarDesactivar(item) {
      try {
            await httpService.delete(`${urlResourceLibros}/${item.idSerie}`);
      } catch (error) {
            console.error(`Error al activar/desactivar el libro con ID ${item.idSerie}:`, error);
            throw error;
      }
}

async function saveLibros(item) {
      try {
            if (item.id === 0) {
                  await httpService.post(urlResourceLibros, item);
            } else {
                  await httpService.put(`${urlResourceLibros}/${item.id}`, item);
            }
      } catch (error) {
            console.error("Error al guardar el libro:", error);
            throw error;
      }
}

async function deleteLibro(item) {
      try {
            await httpService.delete(`${urlResourceLibros}/${item.id}`);
      } catch (error) {
            console.error(`Error al eliminar el libro con ID ${item.id}:`, error);
            throw error;
      }
}

const librosService = {
      getAllLibros,
      getByIdLibros,
      ActivarDesactivar,
      saveLibros,
      deleteLibro,
};

export default librosService;
