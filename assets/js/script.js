
// seleccione todas las cards del documento que tengan la clase ".card"
const cards = document.querySelectorAll(".card");

// seleccione todos los botones  (que estan dentro de una card)con clase ".btn-primary"

const buttons = document.querySelectorAll(".btn-primary");

// creo un Arreglo con los endpoints de la API en orden de la card asignada

const endpoints = [
  "neko",   // Card 1:
  "smile",  // Card 2: 
  "hug",    // Card 3: 
  "wink",   // Card 4: 
  "dance",  // Card 5: 
  "pat"     // Card 6
];


async function getNekoImage(endpoint, cardImg) {
  try {
    // hago la solicitud HTTP a la API
    const res = await fetch(`https://nekos.best/api/v2/${endpoint}`);

    // ssi la respuesta no es correcta, lanzo un error
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // convierto la respuesta en formato JSON para poder acceder a los datos
    const data = await res.json();

    // extraigo el link de la primera imagen del resultado
    const imageUrl = data.results[0].url;

    // asigno la URL de la imagen al src de la card, actualizando la imagen
    cardImg.src = imageUrl;

  } catch (error) {
    // si ocurre algún error, lo muestro en la consola
    console.error("Error al cargar la imagen:", error);
  }
}

//aca creo el evento para los botones usando un forEach
buttons.forEach((btn, index) => {
  // añade un listener al clickear en un boton 
  btn.addEventListener("click", () => {
    // selecciona la imagen dentro de la card correspondiente al botón
    const cardImg = cards[index].querySelector("img");

    // obtiene el endpoint correspondiente a esta card
    const endpoint = endpoints[index];

    // llama a la función que ya creamos antes  para cargar la imagen desde la API
    getNekoImage(endpoint, cardImg);
  });
});

//Aca configuro para que carguen las imagenes desde un inicio usando forEach
cards.forEach((card, index) => {
  // Selecciono la imagen dentro de cada card
  const cardImg = card.querySelector("img");

  // Obtengo el endpoint correspondiente
  const endpoint = endpoints[index];

  // Llamo a la función para cargar la imagen automáticamente
  getNekoImage(endpoint, cardImg);
});


// aca creamos un filtro dinamico en el DOM


// Creamos un input de búsqueda dinámicamente
const searchInput = document.createElement("input");

// Asigna el placeholder que verá el usuario
searchInput.placeholder = "Filtrar tarjetas por gato/sonrisa/abrazo/guiño/baile/palmada";

// Agrega clases de Bootstrap para estilo
searchInput.classList.add("form-control", "my-3");

// Inserta el input justo antes del contenedor de las cards
document.querySelector("main .row").insertAdjacentElement("beforebegin", searchInput);

// Escucha el evento "keyup" para filtrar las cards en tiempo real
searchInput.addEventListener("keyup", () => {
  // Convierte el texto ingresado a minúsculas para comparación
  const text = searchInput.value.toLowerCase();

  // Recorre todas las cards
  cards.forEach((card) => {
    // Obtiene todo el contenido de texto de la card
    const content = card.textContent.toLowerCase();

    // Si el texto buscado está en la card, se muestra; si no, se oculta
    card.parentElement.style.display = content.includes(text) ? "" : "none";
  });
});
