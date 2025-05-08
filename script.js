// ===== IRON & BEATS MAIN JS =====

document.addEventListener("DOMContentLoaded", function () {
  const elements = {
    enterButton: document.getElementById("enter-button"),
    content: document.getElementById("content"),
    crtToggle: document.getElementById("crt-toggle"),
    body: document.body,
    hitCounter: document.getElementById("hit-counter"),
    amvVideo: document.getElementById("amv-video"),
    fighterButton: document.getElementById("create-fighter"),
    dialupBtn: document.getElementById("dialup-mode"),
    fighterZone: document.getElementById("fighter-zone"),
    bgVideo: document.getElementById("bg-video")
  };

  // ===== Smooth Scroll on Enter Button =====
  elements.enterButton?.addEventListener("click", () => {
    elements.content?.scrollIntoView({ behavior: "smooth" });
  });

  // ===== CRT Toggle =====
  elements.crtToggle?.addEventListener("click", () => {
    elements.body.classList.toggle("crt-on");
  });

  // ===== AMV Background Video Playback =====
  if (elements.bgVideo) {
    elements.bgVideo.src += "&autoplay=1";

    document.addEventListener(
      "click",
      function videoClickHandler() {
        elements.bgVideo.src = elements.bgVideo.src.replace("&autoplay=0", "") + "&autoplay=1";
        document.removeEventListener("click", videoClickHandler);
      },
      { once: true }
    );
  }

  // ===== Hit Counter =====
  if (elements.hitCounter) {
    let count = localStorage.getItem("hitCount") || 9001;
    elements.hitCounter.textContent = `Hits: ${++count}`;
    localStorage.setItem("hitCount", count);
  }

  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;
  
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        alert("✨ 8-Bit Konami Mode Unlocked ✨");
        document.body.classList.toggle("eight-bit-mode"); // Toggle the class
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ===== Create Fighter Button Action =====
  elements.fighterButton?.addEventListener("click", () => {
    elements.fighterZone?.scrollIntoView({ behavior: "smooth" });
  });

  // ===== Dial-up Button =====
  elements.dialupBtn?.addEventListener("click", () => {
    const audio = new Audio("dialup.mp3");
    audio.play().catch((e) => console.log("Audio playback failed:", e));
  });

  // ===== Populate Fighter Zone if Available =====
  if (elements.fighterZone) {
    elements.fighterZone.innerHTML = `
      <h2>💪 Create Your Fighter</h2>
      <p>Drag the anime head onto the bodybuilder torso to forge your ultimate warrior.</p>
      <div class="fighter-preview" style="display:flex; align-items:center; gap:1rem;">
        <img src="img/anime-head.png" class="drag-img" draggable="true" id="anime-head" alt="Anime Head" style="width:100px;height:auto;">
        <img src="img/bodybuilder-torso.png" class="drop-img" id="bodybuilder-torso" alt="Bodybuilder Torso" style="width:120px;height:auto;border:2px dashed var(--neon-cyan);">
      </div>
    `;

    const head = document.getElementById("anime-head");
    const torso = document.getElementById("bodybuilder-torso");

    if (head && torso) {
      head.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", "anime-head");
      });

      torso.addEventListener("dragover", (e) => e.preventDefault());
      torso.addEventListener("drop", (e) => {
        e.preventDefault();
        alert("✅ Fighter Created!");
      });
    }
  }

  // ===== VHS Hover Effects =====
  document.querySelectorAll(".vhs-link").forEach((link) => {
    link.addEventListener("mouseover", () => link.classList.add("power-up"));
    link.addEventListener("mouseout", () => link.classList.remove("power-up"));
  });

  // ===== Dead AMV Links =====
  document.querySelectorAll(".amv-deadlink").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      alert("💀 File not found... but the gains are eternal.");
    });
  });

  // ===== Viewport Height Fix =====
  function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  setVH();
  window.addEventListener("resize", setVH);
});
