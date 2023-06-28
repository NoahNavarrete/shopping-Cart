// variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners () {
    // Cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

}


// Funciones


function agregarCurso(e) {
    e.preventDefault()
    if(e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado)
    }
    console.log();
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCursos(curso) {
  //  console.log(curso);

    // Crear un objeto con el contenido del curos actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    // Agrega elemento al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
    carritoHTML();
    
}    

// Muestra el Carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el html
    limpiarHTML();

    // Recorre el carrito y genera el html
    articulosCarrito.forEach( curso=>{
        const row = document.createElement("tr");
        row.innerHTML = `
         <td>
         ${curso.titulo }
         </td>
        `;
        // Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })

}

// Elimina los cursos del tbody
function limpiarHTML() {
    // forma lenta
    //contenedorCarrito.innerHTML = "";

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
