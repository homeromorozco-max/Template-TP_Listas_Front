/*
    Cargar comidas en memoria desde el JSON
*/
let comidas = [
 
];
fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    //console.log(data);    
    comidas = data;     
     mostrarcomidas(comidas)              // Asignar el JSON a la variable comidas
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });


let ingredientesHt = '';
function mostrarIngredientes(ingredientes) {
  let ingredientesHt = '';
  ingredientes.forEach(ingrediente => {
    ingredientesHt += `<li>${ingrediente}</li>`;
  });
  return ingredientesHt;
}



function mostrarcomidas(listaComidas = comidas) {
  comidaContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar las comidas
  listaComidas.forEach(Comida => {
    const container = document.getElementById('comidaContainer').innerHTML += `
<article class = 'Cartadecomida'>
       <article class = 'comida'>
        ${Comida.nombre}
        </article>
        <article class = 'categoria'>
        ${Comida.categoria}
        </article>
        <article class = 'provincia'>
        ${Comida.provincia}
        </article>
        <ul class = 'ingredientes'>
        ${mostrarIngredientes(Comida.ingredientes)}
        </ul>
        </article>
     `  
}
)
}

mostrarcomidas()


const anadircomida = document.getElementById('addFoodForm');
anadircomida.addEventListener('submit', (event) => {
  event.preventDefault(); 
  
  let enviacomida = {
    nombre: event.target.foodName.value,
    categoria: event.target.foodDescription.value,
    provincia: event.target.foodProvince.value,
    ingredientes: event.target.foodIngredients.value.split(',').map(ingrediente => ingrediente.trim())
  }

  comidas.push(enviacomida); // Agregar la nueva comida al array de comidas

  mostrarcomidas()
})

const filtroCategoria = document.getElementById('filtroCategoria');
const filtroProvincia = document.getElementById('filtroProvincia');
const buscaca = document.getElementById('buscaca');
function filtrar(){
const comidasfiltradas = comidas.filter(comida => {
  return comida.categoria.includes(filtroCategoria.value) && 
  comida.provincia.includes(filtroProvincia.value)
})
mostrarcomidas(comidasfiltradas)
}

function buscar(){
   const texto = buscaca.value.toLowerCase();
  const comidasfiltradas = comidas.filter(comida => {
    return comida.nombre.toLowerCase().includes(texto) ||
           comida.provincia.toLowerCase().includes(texto) ||
           comida.categoria.toLowerCase().includes(texto);
           
  })
mostrarcomidas(comidasfiltradas)
}
filtroCategoria.addEventListener('change', filtrar)
filtroProvincia.addEventListener('change', filtrar)
buscaca.addEventListener('input', buscar)