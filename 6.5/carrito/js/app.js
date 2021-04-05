//variables
const carritos = document.getElementById('carrito');
const ListaCursos = document.getElementById('lista-cursos');
const InsertCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.getElementById('vaciar-carrito');
//EventListeners
EventListener();
function EventListener(){
     //click en agregar carrito
     ListaCursos.addEventListener('click', agregarcurso);
     //cuando se elimina un curso del carrito
     carritos.addEventListener('click', eliminarCa);
     //para vaciar el carrito
     vaciarCarrito.addEventListener('click', ClearCar);
     //cargar localStorage
     document.addEventListener('DOMContentLoaded', CargarInfoDom);
}
//funciones
function agregarcurso(e){
     e.preventDefault();
     //Delegation para agregar carrito
     //usamos un containts porque es una lista de clases
     if(e.target.classList.contains('agregar-carrito')){
         const cursos = e.target.parentElement.parentElement;
         InformacionCursos(cursos);
     }
}
function InformacionCursos(cursos){
     const datosCurso = {
          imagen: cursos.querySelector('img').src,
          titulo: cursos.querySelector('h4').textContent,
          precio: cursos.querySelector('.precio span').textContent,
          id:     cursos.querySelector('a').getAttribute('data-id')
     };
     MostrarCursos(datosCurso);
}
//muestra el cursos seleccionado en el carrito
function MostrarCursos(cursos){
     const row = document.createElement('tr');
     row.innerHTML = `
     <td>
     <img src = "${cursos.imagen}" width = 150>     
     </td>
     <td>${cursos.titulo}</td>
     <td>${cursos.precio}</td>
     <td>
     <a href="#" class = "borrar-curso" data-id = "${cursos.id}">X</a>
     </td>
     `;
     InsertCursos.appendChild(row);
     guardarLocalStorage(cursos);
}
//eliminamos cursos del carrito en el DOM
function eliminarCa(e){
     e.preventDefault();
     let cursosCa,
     cursoId;
     if(e.target.classList.contains('borrar-curso')){
          e.target.parentElement.parentElement.remove();
         cursosCa = e.target.parentElement.parentElement;
         cursoId = cursosCa.querySelector('a').getAttribute('data-id');
     }
     eliminarCursoLocalStorage(cursoId);
}
//para vaciar el carrito hay dos formas La Primera
/*function ClearCar(){
     //una forma mas lenta
     InsertCursos.innerHTML = '';
     return false
}*/
//para vaciar el carrito hay dos formas La segunda
function ClearCar(){
     //una forma rapida y recomendada
     while(InsertCursos.firstChild){
          InsertCursos.removeChild(InsertCursos.firstChild);
     };
     //vaciarlocalstorage
     vaciarLocalStorage();
     return false;
}
//cumprueba que alla elementos en localStorage
//almacena informacion en LocalStorage
function guardarLocalStorage(cursos){
     let cursosGLS;
     //el valor de un arreglo con datos de localStorage
     cursosGLS = obtenerLocalStorage();
     //cursos seleccionado se agrega al arreglo
     cursosGLS.push(cursos);
     localStorage.setItem('cursos', JSON.stringify(cursosGLS))
}
function obtenerLocalStorage(){
     let cursosLS;
     if(localStorage.getItem('cursos') === null){
          cursosLS = [];
     }else{
          cursosLS = JSON.parse(localStorage.getItem('cursos'));
     }
     return cursosLS;
}
//cargar cursos a local storage
function CargarInfoDom(){
     let cargarLs;
     cargarLs = obtenerLocalStorage();
     cargarLs.forEach(function(cursos){
          //cargar el template
     const row = document.createElement('tr');
     row.innerHTML = `
     <td>
     <img src = "${cursos.imagen}" width = 150>     
     </td>
     <td>${cursos.titulo}</td>
     <td>${cursos.precio}</td>
     <td><a href="#" class = "borrar-curso" data-id = "${cursos.id}">X</a></td>
     `;
     InsertCursos.appendChild(row);
     });
}
//eliminar cursos por el id local storage
function eliminarCursoLocalStorage(cursos){
     let eliminarLs;
     //lamamos al arreglo obtener curso
     eliminarLs = obtenerLocalStorage();
     eliminarLs.forEach(function(cursosLs, index){
          //comparamos local con los cursos a borrar
          if(cursosLs.id === cursos){
               eliminarLs.splice(index, 1);
          }
     })
     localStorage.setItem('cursos', JSON.stringify(eliminarLs));

}
//vacia el contenido de local storage
function vaciarLocalStorage(){
     localStorage.clear();
}