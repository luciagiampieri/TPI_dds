import {useState, useEffect} from 'react';
import generosService from '../services/generos.service';


function Generos() {
      const tituloPagina = 'Generos';
      const [generos, setGeneros] = useState("");
      


      useEffect(() => {
            BuscarGeneros();
      }, []); // useEffect se ejecuta solo una vez buscando generos


      async function BuscarGeneros() {
            let genero = await generosService.getAllGeneros();
            setGeneros(genero);
      }; // Busca los generos y actualiza el estado con los generos encontrados.

      return (
            <div>
                  <div className="tituloPagina">{tituloPagina}</div>
                        <table className="table table-bordered table-striped">
                              <thead>
                                    <tr>
                                          <th style={{ width: "40%" }}>Id Genero</th>
                                          <th style={{ width: "60%" }}>Nombre</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {generos &&
                                          generos.map((genero) => (
                                                <tr key={genero.id}>
                                                      <td>{genero.id}</td>
                                                      <td>{genero.nombre}</td>
                                                </tr>
                                          ))}
                              </tbody>
                        </table>
            </div>
      );
}


export default Generos;
