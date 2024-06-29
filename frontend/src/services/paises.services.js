import axios from "axios";
const URL = "http://localhost:4444/api/paises";


async function getAllPaises() {
    try {
        const paises = await axios.get(`${URL}`);
        console.log(paises.data);
        return paises.data;
    } catch (error) {
        console.log(error);
    }
}

const paisesService = { getAllPaises };

export default paisesService;