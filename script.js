// Cargar datos guardados previamente en el navegador (si existen)
let puntos = localStorage.getItem('dangemi_puntos') ? parseInt(localStorage.getItem('dangemi_puntos')) : 0;
let nivel = localStorage.getItem('dangemi_nivel') ? parseInt(localStorage.getItem('dangemi_nivel')) : 1;

const spanPuntos = document.getElementById('puntos');
const spanNivel = document.getElementById('nivel');
const avatar = document.getElementById('avatar');
const estadoAvatar = document.getElementById('estado-avatar');

const inputHabito = document.getElementById('nuevo-habito-input');
const btnAgregar = document.getElementById('btn-agregar');
const contenedorHabitos = document.getElementById('contenedor-habitos');

// Mostrar en pantalla los puntos y nivel guardados
spanPuntos.textContent = puntos;
spanNivel.textContent = nivel;

// Función para cambiar el avatar según el nivel actual
function actualizarAvatarSegunNivel() {
  if (nivel === 1) avatar.textContent = "🤖";
  else if (nivel === 2) avatar.textContent = "👾";
  else if (nivel === 3) avatar.textContent = "🦊";
  else if (nivel >= 4) avatar.textContent = "🐉";
}

// Ejecutar al iniciar para mostrar el avatar correcto
actualizarAvatarSegunNivel();

// Función para guardar los datos en la memoria del navegador
function guardarDatos() {
  localStorage.setItem('dangemi_puntos', puntos);
  localStorage.setItem('dangemi_nivel', nivel);
}

// Función para registrar los clics en el botón de completar
function conectarBotonCompletar(boton) {
  boton.addEventListener('click', () => {
    puntos += 10;
    spanPuntos.textContent = puntos;
    guardarDatos(); // Guardamos al instante

    // Animación de salto del avatar
    avatar.classList.add('animacion-celebracion');
    setTimeout(() => {
      avatar.classList.remove('animacion-celebracion');
    }, 600);

    // Frases motivacionales
    const frases = [
      "¡Buen trabajo! 💪",
      "¡Sigue así, crack! 🔥",
      "¡Imparable! ⚡",
      "¡Cada vez más cerca del nivel alto! 🚀"
    ];
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    estadoAvatar.textContent = fraseAleatoria;

    // Lógica para subir de nivel cada 50 puntos
    if (puntos >= nivel * 50) {
      nivel++;
      spanNivel.textContent = nivel;
      guardarDatos(); // Guardamos el nuevo nivel
      estadoAvatar.textContent = `¡NIVEL ${nivel} ALCANZADO! 🎉`;
      actualizarAvatarSegunNivel();
    }
  });
}

// Conectar los botones iniciales
document.querySelectorAll('.btn-completar').forEach(conectarBotonCompletar);

// Función para agregar un nuevo hábito a la lista
btnAgregar.addEventListener('click', () => {
  const textoHabito = inputHabito.value.trim();

  if (textoHabito !== "") {
    const nuevoLi = document.createElement('li');
    nuevoLi.innerHTML = `
      <span>🎯 ${textoHabito}</span>
      <button class="btn-completar">Completar (+10 pts)</button>
    `;

    contenedorHabitos.appendChild(nuevoLi);

    // Conectar la lógica de puntos al botón del nuevo hábito
    const nuevoBoton = nuevoLi.querySelector('.btn-completar');
    conectarBotonCompletar(nuevoBoton);

    // Limpiar el campo de texto
    inputHabito.value = "";
  }
});