// script.js

// Scroll on enter
const enterButton = document.getElementById("enter-button");
const content = document.getElementById("content");

enterButton?.addEventListener("click", function () {
  content?.scrollIntoView({ behavior: "smooth" });
});

// CRT effect toggle (optional)
const crtToggle = document.getElementById("crt-toggle");
const body = document.body;
crtToggle?.addEventListener("click", function () {
  body.classList.toggle("crt-on");
});

// Fake hit counter (increments each time page is loaded)
let count = localStorage.getItem("hitCount") || 9001;
document.getElementById("hit-counter").innerText = `Hits: ${++count}`;
localStorage.setItem("hitCount", count);

// Konami code easter egg
const konami = [38,38,40,40,37,39,37,39,66,65];
let konamiIndex = 0;
document.addEventListener("keydown", function (e) {
  if (e.keyCode === konami[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konami.length) {
      alert("✨ 8-Bit Mode Unlocked ✨");
      document.body.classList.add("eight-bit-mode");
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

// VHS hover effects
const vhsLinks = document.querySelectorAll(".vhs-link");
vhsLinks.forEach(link => {
  link.addEventListener("mouseover", () => link.classList.add("power-up"));
  link.addEventListener("mouseout", () => link.classList.remove("power-up"));
});

// AMV Video Handling
const amv = document.getElementById("amv-video");
if (amv) {
  amv.volume = 0.1;
  amv.loop = true;
  amv.play();
}

// Easter Egg: Create Your Fighter popup
const fighterButton = document.getElementById("create-fighter");
fighterButton?.addEventListener("click", () => {
  alert("💪 Choose Your Fighter! Now loading...\n[Coming Soon]");
});

// Easter Egg: Dial-up sound simulator
const dialupBtn = document.getElementById("dialup-mode");
dialupBtn?.addEventListener("click", () => {
  const audio = new Audio("dialup.mp3");
  audio.play();
});

// Create Your Fighter - drag/drop UI preview (future implementation)
const fighterZone = document.getElementById("fighter-zone");
if (fighterZone) {
  fighterZone.innerHTML = `
    <p>[🧪 Experimental Fighter Builder Here]</p>
    <p>Drag anime heads onto bodybuilder torsos to create your champion.</p>
    <div class="fighter-preview">
      <img src="img/anime-head.png" class="drag-img" draggable="true" id="anime-head" alt="anime head">
      <img src="img/bodybuilder-torso.png" class="drop-img" id="bodybuilder-torso" alt="bodybuilder torso">
    </div>
  `;
  const head = document.getElementById("anime-head");
  const torso = document.getElementById("bodybuilder-torso");
  head?.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", "anime-head");
  });
  torso?.addEventListener("dragover", e => e.preventDefault());
  torso?.addEventListener("drop", e => {
    e.preventDefault();
    alert("✅ Fighter Created!");
  });
}

// AMV Graveyard click effect
const amvGraveyard = document.querySelectorAll(".amv-deadlink");
amvGraveyard.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    alert("💀 File not found... but the gains are eternal.");
  });
});
