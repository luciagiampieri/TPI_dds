import { useState, useEffect } from 'react';
import user_namesService from '../services/user_names.service';

// Componente para mostrar los usernames
function User_Names() {
    const tituloPagina = 'Usernames';
    const [users, setUsers] = useState("");

    useEffect(() => {
        BuscarUsers();
    }, []); // useEffect se ejecuta solo una vez. Busca los usernames.

    async function BuscarUsers() {
        let users = await user_namesService.getAllUserNames();
        setUsers(users);
    }; // Función para buscar los usernames

    return (
        <div>
            <div className="tituloPagina">{tituloPagina}</div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style={{ width: "40%" }}>user_name</th>
                        <th style={{ width: "60%" }}>edad</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map((user) => (
                            <tr key={user.user_name}>
                                <td>{user.user_name}</td>
                                <td>{user.edad}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default User_Names;
