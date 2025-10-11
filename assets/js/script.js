// Función principal: obtiene juegos desde la API
async function cargarJuegos() {
  try {
    const respuesta = await fetch('https://api.codetabs.com/v1/proxy?quest=https://www.freetogame.com/api/games');


    const juegos = await respuesta.json();

    mostrarJuegos(juegos); // Llama a otra función para mostrarlos
    activarFiltro(juegos); // Activa el filtro de búsqueda
  } catch (error) {
    console.error('Error al cargar los juegos:', error);
  }
}

// Muestra los juegos en el DOM
function mostrarJuegos(lista) {
  const contenedor = document.getElementById('juegos-container');
  contenedor.innerHTML = '';

  lista.slice(0, 12).forEach(juego => {
    contenedor.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card h-100 bg-dark text-light border-0">
          <img src="${juego.thumbnail}" class="card-img-top" alt="${juego.title}">
          <div class="card-body">
            <h5 class="card-title">${juego.title}</h5>
            <p class="card-text">${juego.genre}</p>
            <a href="${juego.game_url}" target="_blank" class="btn btn-outline-info w-100">Ver más</a>
          </div>
        </div>
      </div>
    `;
  });
}

// Filtro dinámico (DOM)
function activarFiltro(juegos) {
  const input = document.getElementById('buscador');

  input.addEventListener('input', () => {
    const texto = input.value.toLowerCase();
    const filtrados = juegos.filter(juego =>
      juego.title.toLowerCase().includes(texto)
    );
    mostrarJuegos(filtrados);
  });
}

// Ejecuta todo al cargar la página
document.addEventListener("DOMContentLoaded", cargarJuegos);

