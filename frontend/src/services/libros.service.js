import axios from "axios";
import { config } from "../config";

const { URL } = config;

async function getAllLibros(titulo, Pagina) {
      const resp = await axios.get(URL, {
            params: { titulo, Pagina },
      });
      return resp.data;
}

async function getByIdLibros(item) {
      const resp = await axios.get(URL + "/" + item.idSerie);
      return resp.data;
}

async function ActivarDesactivar(item) {
      await axios.delete(URL + "/" + item.idSerie);
}

async function saveLibros(item) {
      if (item.id === 0) {
            await axios.post(URL, item);
      } else {
            await axios.put(URL + "/" + item.id, item);
      }
}


async function deleteLibro(item) {
      await axios.delete(URL + "/" + item.id);
}

const librosService = {
      getAllLibros,
      getByIdLibros,
      ActivarDesactivar,
      saveLibros,
      deleteLibro,
};

export default librosService;
