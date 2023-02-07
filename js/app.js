//Variables
const listaAnime = document.querySelector(".lista") //TODO EL CUADRO DONDE SE ALMACENAN TODOS LOS ANIMES
const contenedorAnime = document.querySelector('.watchlistHover tbody');
let listaWatchlist = [];

//Event Listener
cargarEventListeners();
function cargarEventListeners(){
    listaAnime.addEventListener('click', agregarAnime); //se ejecuta esta funcion cuando se hace click sobre los animes
}

//Funciones

function agregarAnime(e){
    e.preventDefault();//para que al darle click no se vaya hacia arriba el navegador
    if (e.target.classList.contains("watchlistButton")){ //si el target tiene la clase .watchlistButton ejecuta esta funcion
        const animeSeleccionado = e.target.parentElement.parentElement; //nos vamos al parent del parent para seleccionar hasta la imagen
        leerDatosAnime(animeSeleccionado); //ejecuta la funcion con la constante creada para usarla como parametro
    }
}

function leerDatosAnime(anime){
    console.log(anime);
    const infoAnime = {
        imagen: anime.querySelector("img").src,
        titulo: anime.querySelector("h3").textContent,
        genero: anime.querySelector(".genero").textContent
    }
    console.log(infoAnime);

    //Revisando si ya existe el anime en la Lista de Watchlist
    listaWatchlist = [...listaWatchlist, infoAnime];
    console.log(listaWatchlist);
    animeHTML();
}


//Muestra el anime agregado en el Watchlist
function animeHTML(){
    limpiarAnime();
    listaWatchlist.forEach(anime => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${anime.imagen}" width="100"></td>
        <td>${anime.titulo}</td>
        <td>${anime.genero}</td>
        `
        contenedorAnime.appendChild(row);
    });
}

function limpiarAnime(){
    while (contenedorAnime.firstChild){
        contenedorAnime.removeChild(contenedorAnime.firstChild)
    }
}

