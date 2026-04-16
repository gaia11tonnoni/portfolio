const projects = [
  {
    title: "Hamster Mood Bot",
    category: "AI",
    description: "An AI chatbot that replies with hamster reaction memes and speaks like a teenager. Uses Ollama + Python + JSON + Hamster sticker logic.",
    stack: ["Ollama", "Python", "JSON", "Hamster Sticker"]
  },
  {
    title: "Pixel Art Maker",
    category: "Web Apps",
    description: "A web-based pixel art editor where you can draw pixel art and export it as PNG.",
    stack: ["JavaScript", "HTML", "CSS"]
  },
  {
    title: "AO3 Skin Theme",
    category: "Web Apps",
    description: "A custom CSS skin for AO3 to change the site's appearance.",
    stack: ["CSS"]
  }
];

let currentFilter = "All";

function renderProjects() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  const filtered = currentFilter === "All"
    ? projects
    : projects.filter(p => p.category === currentFilter);

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p style="color:#a855f7; font-size:12px;">${p.stack.join(" • ")}</p>
      <span>${p.category}</span>
    `;
    grid.appendChild(card);
  });
}

function filterProjects(category) {
  currentFilter = category;
  renderProjects();
}

// STARFIELD
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.5,
  d: Math.random() * 0.5
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawStars);
}

drawStars();

renderProjects();