import axios from "axios";
const URL = "http://localhost:4444/api/user";

async function getAllUserNames() {
    try {
        const users = await axios.get(`${URL}`);
        console.log(users.data);
        return users.data;
    } catch (error) {
        console.log(error);
    }
}

const user_namesServices = { getAllUserNames };

export default user_namesServices;