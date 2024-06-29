/*
En este archivo se definen las URL de los servicios REST que se van a consumir. Para
estandarizar un poco más el proceso y no tener que modificar cada archivo que consuma una URL
*/

// opcion 1 cuando se hacen pruebas locales.

const urlServidor = "http://localhost:4444"
const urlResourceLibros = urlServidor + "/api/libros";
const urlResourceEditoriales = urlServidor + "/api/editoriales";
const urlResourceAutores = urlServidor + "/api/autores";
const urlResourceResenas = urlServidor + "/api/resenas";

// opcion 2 cuando se despliega en un servidor.





export const config = {
    urlServidor,
    urlResourceLibros,
    urlResourceEditoriales,
    urlResourceAutores,
    urlResourceResenas
}
