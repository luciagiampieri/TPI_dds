import axios from "axios";
const URL = "http://localhost:4444/api/generos";


// Obtener todos los géneros
async function getAllGeneros() {
      try {
            const generos = await axios.get(`${URL}`)
            console.log(generos.data);
            return generos.data;
      } catch (error) {
            console.log(error);
      }
};

const generosService = { getAllGeneros };

export default generosService;