//VARIABLES
const carrito = document.querySelector("#carrito")
const conetenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos")
let articulosCarrito = []

cargarEventListeners()
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar Carrito"
    listaCursos.addEventListener("click", agregarCurso)

    //Eliminar curso del carrito
    carrito.addEventListener("click", eliminarCurso)

    //Vaciar el carrito
    vaciarCarrito.addEventListener("click", () =>{
       articulosCarrito = [] // reseteamos el arreglo

       limpiarHTML() // Eliminamos todo el HTML
    })
}

//FUNCIONES

function agregarCurso(e){
    e.preventDefault() //para los elementos por default
    if(e.target.classList.contains("agregar-carrito")){
       const cursoSeleccionado = e.target.parentElement.parentElement
       leerDatosCurso(cursoSeleccionado)
    }
   
}


//ELIMINA UN CURSO DEL CARRITO
function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id")

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)

        carritoHTML()
    }
}



//LE EL CONTENIDO DEL HTML AL QUE LE DAMOS CLICK Y EXTRAE LA INFORMACION DEL CURSO
function leerDatosCurso(curso){
    console.log(curso)

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    //Revisa si unelemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){  //vamos a ir eiterando con el .map y una vez que se encuentre el duplicado se va a incrementar el valor en 1 y lo retorna 
                curso.cantidad++;
                return curso // retorna el objeto actualizado
            }else{
                return curso // retorna los objetos que no son los duplicados
            }
        })
        articulosCarrito = [...cursos]

    }else{
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    //Agrega elementos al arreglo de carrito
    console.log(articulosCarrito)

    carritoHTML()
}

//MUESTRA EL CARRITO DE COMPRAS EN EL HTML
 function carritoHTML(){
    //limpiar el carrito
    limpiarHTML()

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso =>{

        const {imagen, titulo, precio, cantidad, id} = curso
        
        console.log(curso)
        const row = document.createElement("tr")
        row.innerHTML =`

        <td>
            <img src="${imagen}" width="100">
        </td> 
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `

        //Agrega el HTML del carrito en el body
        conetenedorCarrito.appendChild(row)
    })
 }

 //ELIMINA LOS CURSOS DEL TBODY
 function limpiarHTML(){

    //forma lenta
    //conetenedorCarrito.innerHTML = ""

    //forma rapida de limpiar
    while(conetenedorCarrito.firstChild){ // si contenedorCarrito tiene un elemento adentro el codigo se sigue ejecutando y una vez que es limpiado, ya no se ejecuta
        conetenedorCarrito.removeChild(conetenedorCarrito.firstChild)
    }//mientras haya un hijo va a eliminar el primero, revisa de nuevo hasta eliminar el ultimo y si no quedan mas ya no se ejecuta
 }