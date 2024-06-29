import {useState, useEffect} from 'react';
import generosService from '../services/generos.service';


function Generos() {
      const tituloPagina = 'Generos';
      const [generos, setGeneros] = useState("");
      // cargar al montar el componente (solo una vez)


      useEffect(() => {
            BuscarGeneros();
      }, []);


      async function BuscarGeneros() {
            let genero = await generosService.getAllGeneros();
            setGeneros(genero);
      };

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
