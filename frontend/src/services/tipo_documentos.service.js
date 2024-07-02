import axios from "axios";
const URL = "http://localhost:4444/api/tipodoc";

// Obtener todos los tipos de documentos
async function getAllTipoDocumentos() {
    try {
        const docs = await axios.get(`${URL}`);
        console.log(docs.data);
        return docs.data;
    } catch (error) {
        console.log(error);
    }
}

const tipo_documentosService = { getAllTipoDocumentos };

export default tipo_documentosService;
