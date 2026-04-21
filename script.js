const projects = [
  {
    title: "Hamster AI Chat – Emotion-Driven Conversational Interface",
    category: "AI",
    difficulty: "Advanced",
    started: "15/04/2026",
    github: "https://github.com/gaia11tonnoni/Hamster-Chatbot",
    description: "Hamster AI Chat is a Streamlit-based conversational AI system using a local LLM via Ollama. It generates structured JSON responses combining text and emotional states mapped to animated GIF stickers for expressive interaction.",
    stack: ["Python", "Streamlit", "Ollama", "LLaMA 3", "JSON", "CSS"],
    details: `Real-time AI chat with persistent session memory.
Emotion-based response system using structured JSON outputs.
Visual feedback via animated GIF stickers.
User-selectable emotional context influencing responses.
Custom UI with gradient themes and chat bubbles.
Error handling for model response failures.`
  },
  {
    title: "PixelForge – Web-Based Pixel Art Editor",
    category: "Apps",
    difficulty: "Intermediate",
    started: "16/04/2026",
    github: "https://github.com/gaia11tonnoni/Pixel-Art-Maker",
    description: "A browser-based pixel art tool built with vanilla JavaScript and HTML5 Canvas, allowing users to create, edit, and export pixel art with multiple tools and grid controls.",
    stack: ["HTML5", "CSS3", "JavaScript", "Canvas API"],
    details: `Pixel canvas with pen, eraser, and flood fill tools.
Grid resizing (16x16, 32x32, 64x64).
Zoom functionality for precision editing.
Preset and custom color picker.
PNG export system.
Mobile and touch support.`
  },
  {
    title: "Neon Archive – Custom AO3 Dark Theme Skin",
    category: "Apps",
    difficulty: "Easy",
    started: "14/04/2026",
    github: "https://github.com/gaia11tonnoni/AO3siteSkinPurple",
    description: "A neon-inspired CSS theme that redesigns Archive of Our Own (AO3) with a dark mode interface, improved readability, and consistent purple-magenta styling.",
    stack: ["CSS3", "AO3 Skin System", "UI Design"],
    details: `Full UI redesign with neon purple aesthetic.
Improved contrast and readability.
Custom styling for navigation, forms, and metadata.
Glow and shadow effects across interface.
Layout refinements for better structure.`
  },
  {
    title: "Notes – Terminal-Based Notes Manager",
    category: "Apps",
    difficulty: "Upper-intermediate",
    started: "20/04/2026",
    github: "https://github.com/gaia11tonnoni/Notes-Terminal-App.git",
    description: "A terminal-based note-taking application built in Go, designed for fast, distraction-free writing directly in the command line with persistent local storage and a keyboard-driven interface.",
  stack: ["Go", "Bubble Tea", "Lip Gloss", "SQLite", "Bubbles", "CGO"],
  details: `Create, edit, and delete notes in the terminal.
Fully keyboard-driven navigation and interaction.
Persistent storage using SQLite.
Multi-view workflow (list, title edit, body edit).
State management using Bubble Tea (Elm architecture).
Responsive terminal UI with adaptive layout.
Minimal styling via Lip Gloss for structured CLI design.`
  }
];

let currentFilter = "All";
let viewMode = "grid";
let isSortingDifficulty = false;

const difficultyWeight = {
  "Advanced": 4,
  "Upper-intermediate": 3,
  "Intermediate": 2,
  "Easy": 1
};

function toggleDifficultySort(btn) {
  isSortingDifficulty = !isSortingDifficulty;
  
  if (isSortingDifficulty) {
    btn.classList.add('active');
    btn.innerText = "Sorted: Difficulty";
  } else {
    btn.classList.remove('active');
    btn.innerText = "Sort: Hardest First";
  }
  renderProjects();
}

function setView(mode, btn) {
  viewMode = mode;
  
  document.querySelectorAll('.view-toggle button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const diffBtn = document.getElementById('sort-diff');
  if (mode === 'timeline') {
    diffBtn.style.display = 'none';
    isSortingDifficulty = false;
    diffBtn.classList.remove('active');
    diffBtn.innerText = "Sort: Hardest First";
  } else {
    diffBtn.style.display = 'block';
  }
  
  renderProjects();
}

function filterProjects(category, btn) {
  currentFilter = category;
  
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  renderProjects();
}

function sortByDate(arr) {
  return arr.sort((a, b) => 
    new Date(b.started.split("/").reverse().join("-")) -
    new Date(a.started.split("/").reverse().join("-"))
  );
}

function renderProjects() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  let data = currentFilter === "All"
    ? [...projects]
    : projects.filter(p => p.category === currentFilter);

  if (isSortingDifficulty && viewMode === "grid") {
    data.sort((a, b) => difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty]);
  } else {
    data = sortByDate(data);
  }

  if (viewMode === "timeline") {
    grid.className = "timeline";

    data.forEach(p => {
      const el = document.createElement("div");
      el.className = "timeline-card";

      el.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <h3>${p.title}</h3>
          <span style="font-size:9px; border:1px solid rgba(255,255,255,0.2); padding:2px 6px; border-radius:4px; color:#fff;">${p.difficulty}</span>
        </div>
        <p>${p.description}</p>
        <p style="color:#a855f7; font-size:11px; text-transform:uppercase;">Started: ${p.started}</p>
        <p style="color:#c4b5fd; font-size:11px;"><a href="${p.github}" target="_blank">GitHub</a></p>
        <p style="color:#9ca3af; font-size:12px;">${p.stack.join(" • ")}</p>
        <div class="extra">${p.details}</div>
      `;

      el.addEventListener("click", () => {
        el.classList.toggle("expanded");
      });

      grid.appendChild(el);
    });

    return;
  }

  grid.className = "grid";

  data.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <h3>${p.title}</h3>
        <span style="font-size:9px; border:1px solid rgba(255,255,255,0.2); padding:2px 6px; border-radius:4px; color:#fff;">${p.difficulty}</span>
      </div>
      <p>${p.description}</p>
      <p style="color:#a855f7; font-size:12px;">${p.stack.join(" • ")}</p>
      <p style="color:#6b7280; font-size:11px;">Started: ${p.started}</p>
      <p style="color:#c4b5fd; font-size:11px;"><a href="${p.github}" target="_blank">GitHub</a></p>
      <span>${p.category}</span>
      <div class="extra">${p.details}</div>
    `;

    card.addEventListener("click", () => {
      card.classList.toggle("expanded");
    });

    grid.appendChild(card);
  });
}

// STARFIELD ENGINE
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let shootingStars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    d: Math.random() * 0.5
  }));
}

function createShootingStar() {
  shootingStars.push({
    x: Math.random() * (canvas.width * 0.8),
    y: Math.random() * (canvas.height * 0.4), 
    len: Math.random() * 150 + 80,          
    speed: Math.random() * 10 + 8,    
    size: Math.random() * 3 + 1.5,         
    opacity: 1
  });
}

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

  shootingStars.forEach((ss, index) => {
    ctx.strokeStyle = `rgba(255, 255, 255, ${ss.opacity})`;
    ctx.lineWidth = ss.size;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(ss.x, ss.y);
    ctx.lineTo(ss.x - ss.len, ss.y - ss.len); 
    ctx.stroke();

    ss.x += ss.speed;
    ss.y += ss.speed; 
    ss.opacity -= 0.02; 

    if (ss.opacity <= 0 || ss.y > canvas.height || ss.x > canvas.width) {
      shootingStars.splice(index, 1);
    }
  });

  if (Math.random() > 0.97) {
    createShootingStar();
  }

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resize);
resize();
drawStars();
renderProjects();