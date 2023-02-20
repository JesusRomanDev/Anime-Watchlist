//Variables
const listaAnime = document.querySelector(".lista") //TODO EL CUADRO DONDE SE ALMACENAN TODOS LOS ANIMES
const contenedorAnime = document.querySelector('.watchlistHover tbody'); //donde se va a inyectar el HTML
const eliminarAnime = document.querySelector('.menu'); //Eliminando anime de la lista uno por uno
const eliminarAnimeLista = document.querySelector('.menu');//Vaciando Anime de Lista
const navegacionHover = document.querySelector('.hover__vacio'); //pendiente de hacer funcion para mostrar el texto
let listaWatchlist = [];

//Event Listener
cargarEventListeners();
function cargarEventListeners(){
    listaAnime.addEventListener('click', agregarAnime); //se ejecuta esta funcion cuando se hace click sobre los animes

    eliminarAnime.addEventListener('click', eliminandoAnime); //se ejecuta para eliminar un anime de la lista

    eliminarAnimeLista.addEventListener('click', vaciandoLista); //se ejecuta para vaciar TODA la lista de Anime

    navegacionHover.addEventListener('mouseover', textoAnime); //se ejecuta cuando haces hover sobre la lista

    navegacionHover.addEventListener('mouseenter', vaciarAnime); //se ejecuta cuando haces hover sobre la lista
}

//Funciones

function vaciandoLista(e){
    if (e.target.classList.contains('vaciar__anime')){
        limpiarAnime();
        listaWatchlist.length = 0; //seteando el array a 0 para que funcione las condiciones del IF de textoAnime();
        textoAnime();
    }
 }

 function vaciarAnime(){
    if(listaWatchlist.length > 0 && !contenedorAnime.innerHTML.includes("Vaciar Lista")){ //si el array tiene mas de 1 elemento
        //yyyy QUE NO se tenga en el contenedorAnime dentro del HTML la palabra Vaciar Lista
    const row2 = document.createElement('a');
    row2.href = '#'; //agregamos eñ href para que aparezca como si le fueramos a dar click
    row2.classList.add('vaciar__anime'); //agregamos una clase a el nuevo elemento creado
    row2.textContent = 'Vaciar Lista';
    contenedorAnime.appendChild(row2);
    }
 }

function textoAnime(){
    if (listaWatchlist.length === 0 && contenedorAnime.innerHTML.trim() === ''){
        const nuevoTexto = document.createElement('td');
        nuevoTexto.textContent = "There's nothing yet on your Watchlist";
        contenedorAnime.appendChild(nuevoTexto);
    }
}

function eliminandoAnime(e){
    if (e.target.classList.contains('delete')){ //si al darle click tenemos algo con una clase de "delete" ejecuta lo siguiente
        const animeID = e.target.getAttribute('data-id') //sacamos el ID del target, para esto el ANCHOR debe tener un ID
        listaWatchlist = listaWatchlist.filter(anime => anime.id !== animeID); //filtrame todos menos el animeID que seleccionamos
        textoAnime();
        animeHTML();
    } 
    if(listaWatchlist.length === 0 && contenedorAnime.innerHTML.trim() === ''){
        const nuevoTexto = document.createElement('td');
        nuevoTexto.textContent = "There's nothing yet on your Watchlist";
        contenedorAnime.appendChild(nuevoTexto);
    }
    vaciarAnime(); //cada vez que eliminamos un anime llamamos a la funcion de vaciarAnime(); para que se muestre el texto de vaciar
}

function agregarAnime(e){
    e.preventDefault();//para que al darle click no se vaya hacia arriba el navegador
    if (e.target.classList.contains("watchlistButton")){ //si el target tiene la clase .watchlistButton ejecuta esta funcion
        const animeSeleccionado = e.target.parentElement.parentElement; //nos vamos al parent del parent para seleccionar hasta la imagen, asi obteniendo acceso a TODOS los datos de ese anime
        leerDatosAnime(animeSeleccionado); //ejecuta la funcion con la constante creada para usarla como parametro
    }
}

function leerDatosAnime(anime){ //el parametro "anime" toma toda la info de ese DIV del anime
    console.log(anime);
    //Creando un objeto con el contenido del anime seleccionado
    const infoAnime = {
        imagen: anime.querySelector("img").src, //el parametro anime tiene todo el HTML de ese anime seleccionado
        titulo: anime.querySelector("h3").textContent,
        genero: anime.querySelector(".genero").textContent,
        id: anime.querySelector('a').getAttribute('data-id') //generamos un ID para despues usarlo al generar el HTML y mas adelante,
        //USAR ESE ID, PARA ELIMINARLO SI QUEREMOS DE LA LISTA
    }
    console.log(infoAnime);

    //Revisando los Duplicados, Revisando si ya existe el anime en la Lista de Watchlist
    const existe = listaWatchlist.some( anime => anime.id === infoAnime.id); 
    if (existe){ //si es true
        const animes = listaWatchlist.map(anime => {
         //retorna el objeto que no es duplicado, osease regresame todo el arreglo normal tal cual esta, no hagas nada
         return anime;
        })
    }else{ //si no existe agregame el nuevo con los que ya teniamos
        listaWatchlist = [...listaWatchlist, infoAnime]; //infoAnime es el nuevo que se agregaria
        console.log(listaWatchlist);
    }
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
        <td><div class="container__delete"><a class="delete" data-id="${anime.id}" href="#">X</a></div></td>
        `
        contenedorAnime.appendChild(row); //contenedorAnime que tiene el tbody, vamos a inyectarle un TR con el row creado
    });
}

function limpiarAnime(){
    while (contenedorAnime.firstChild){
        contenedorAnime.removeChild(contenedorAnime.firstChild)
    }
}

