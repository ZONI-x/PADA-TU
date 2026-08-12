// ===============================
// PERSONALIZA ESTAS DOS COSAS
// ===============================
const fechaInicio = "2026-04-08T13:15:00"; // Cambia por la fecha que quieras

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

// Música: los navegadores suelen exigir una interacción del usuario.
musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try { await music.play(); musicBtn.textContent = "🔊"; }
    catch { musicBtn.textContent = "🎵"; }
  } else {
    music.pause();
    musicBtn.textContent = "🎵";
  }
});

menuBtn.addEventListener("click", () => {
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
});

document.querySelectorAll("nav a").forEach(a => {
  a.addEventListener("click", () => {
    if (window.innerWidth <= 800) nav.style.display = "none";
  });
});

document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.scroll)?.scrollIntoView({behavior:"smooth"});
  });
});

// Aparición al hacer scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: .12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Pétalos
const petals = document.getElementById("petals");
const petalIcons = ["🌸","🌹","🌷","💮"];
function createPetal() {
  const el = document.createElement("span");
  el.className = "petal";
  el.textContent = petalIcons[Math.floor(Math.random()*petalIcons.length)];
  el.style.left = Math.random()*100 + "vw";
  el.style.animationDuration = (5 + Math.random()*6) + "s";
  el.style.fontSize = (12 + Math.random()*15) + "px";
  petals.appendChild(el);
  setTimeout(() => el.remove(), 12000);
}
setInterval(createPetal, 650);

// Corazones flotantes
const hearts = document.getElementById("hearts");
function createHeart() {
  const el = document.createElement("span");
  el.className = "heart-particle";
  el.textContent = Math.random() > .5 ? "❤️" : "♡";
  el.style.left = Math.random()*100 + "vw";
  el.style.animationDuration = (3 + Math.random()*3) + "s";
  hearts.appendChild(el);
  setTimeout(() => el.remove(), 6500);
}

// Flores y recuerdos
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
document.querySelectorAll(".flower").forEach(flower => {
  flower.addEventListener("click", () => {
    modalMessage.textContent = flower.dataset.message;
    modal.classList.add("show");
  });
});

document.querySelectorAll("[data-memory]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("memoryText").textContent = btn.dataset.memory;
    for(let i=0;i<5;i++) setTimeout(createHeart, i*100);
  });
});

document.getElementById("closeModal").addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => {
  if(e.target === modal) modal.classList.remove("show");
});

// Pregunta final
document.getElementById("loveBtn").addEventListener("click", () => {
  modalMessage.innerHTML = "No sé si alguna vez voy a encontrar las palabras suficientes para explicarte cuánto te amo, porque siento que cualquier palabra se queda pequeña comparada con todo lo que siento por ti. ❤️ Te amo muchísimo, más de lo que a veces sé cómo expresar, y cada día encuentro una nueva razón para quererte aún más.Si pudiera mostrarte todo lo que siento en mi corazón, entenderías que mi amor por ti es mucho más grande de lo que cualquier palabra podría decir. 🥹💕<br><br>❤️ TE AMO 3 MILLONES ❤️";
  modal.classList.add("show");
  for(let i=0;i<20;i++) setTimeout(createHeart, i*80);
});

// Contador
function updateCounter() {
  const start = new Date(fechaInicio);
  const now = new Date();
  let diff = now - start;
  if (diff < 0) diff = 0;

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");
}
updateCounter();
setInterval(updateCounter,1000);

// Efecto suave de inclinación en fotos
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    card.style.transform = `perspective(700px) rotateY(${x*7}deg) rotateX(${-y*7}deg)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});
