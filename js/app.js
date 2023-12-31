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

    // Elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso)

    // Vaciar el carrito

    vaciarCarritoBtn.addEventListener("click", ()=>{
        articulosCarrito = [];
        limpiarHTML(); // Eliminamos todo el html
    })
}




// Funciones


function agregarCurso(e) {
    e.preventDefault()
    if(e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado)
    }
}

// Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");
        
        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //Iterar sobre el carrito y mostrar su html
    }
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
    // Revisa si un elemento ya existe en un carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }else {
                return curso; // retorna los objetos que no son los duplicados
            }
        })
        articulosCarrito = [...cursos]
    }else{
        // Agregamos el curso al carrito
            // Agrega elemento al arreglo del carrito
            articulosCarrito = [...articulosCarrito, infoCurso];

        }
        carritoHTML();
    
}    

// Muestra el Carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el html
    limpiarHTML();

    // Recorre el carrito y genera el html
    articulosCarrito.forEach( curso=>{
        const {imagen,titulo, precio, cantidad, id} = curso;

        console.log(curso);
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        
        </td>
         <td>${titulo }</td>
         <td>${precio }</td>
         <td>${cantidad }</td>
         <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
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
