// variables

const formulario = document.querySelector("#formulario");
const tweet = document.querySelector("#tweet");
const listaTweets = document.querySelector("#lista-tweets");

let tweets = [];

// eventos
eventListeners();
function eventListeners() {
  // cuando el usuario agrega un nuevpo tweet
  formulario.addEventListener("submit", agregarTweet);

  // cuando el documento esta listi
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    mostrarTweets();
  });
}

// funciones
function agregarTweet(e) {
  e.preventDefault();
  const contenidoTweet = tweet.value;
  // validar tweet
  if (contenidoTweet === "") {
    mostrarError("El tweet no puede ir vacio");
    return;
  }
  limpiarHTML();

  tweetsObj = {
    id: Date.now(),
    contenidoTweet,
  };
  tweets = [...tweets, tweetsObj];
  mostrarTweets(tweets);
  // reiniciarFormulario

  formulario.reset();
}

function mostrarError(error) {
  const parrafo = document.createElement("P");
  parrafo.textContent = error;
  parrafo.classList.add("error", "bg-red-500");

  // insertarlo en el contenido
  // const contenido = document.querySelector("#contenido");
  // contenido.appendChild(parrafo);
  formulario.appendChild(parrafo);

  // if (parrafo) {
  //   parrafo.remove();
  // }

  setTimeout(() => {
    parrafo.remove();
  }, 2000);
}

function mostrarTweets() {
  limpiarHTML();
  tweets.forEach((t) => {
    // agregar un boton

    const boton = document.createElement("a");
    boton.classList.add("borrar-tweet");
    boton.textContent = "X";

    // AÑADIR LA FUNCTION DE ELIMINAR
    boton.onclick = () => [borrarTweet(t.id)];

    const contenedor = document.createElement("ul");
    const parrafo = document.createElement("li");
    parrafo.textContent = t.contenidoTweet;
    parrafo.appendChild(boton);
    contenedor.appendChild(parrafo);
    listaTweets.appendChild(contenedor);
  });

  sincronizarStorage();
}

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

// agrega los tweets al localStorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  mostrarTweets();
}
