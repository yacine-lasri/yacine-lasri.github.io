document.addEventListener('DOMContentLoaded', function() {
  // ===== DOM Elements =====
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

  // ===== Core Functionality =====
  
  // Smooth scroll to content
  if (elements.enterButton && elements.content) {
    elements.enterButton.addEventListener("click", () => {
      elements.content.scrollIntoView({ behavior: "smooth" });
    });
  }

  // CRT effect toggle
  if (elements.crtToggle) {
    elements.crtToggle.addEventListener("click", () => {
      elements.body.classList.toggle("crt-on");
    });
  }

  // ===== YouTube Video Handling =====
  function handleVideoAutoplay() {
    if (!elements.bgVideo) return;
    
    // First attempt
    elements.bgVideo.src += '&autoplay=1';
    
    // Fallback on user interaction
    document.addEventListener('click', function videoClickHandler() {
      elements.bgVideo.src = elements.bgVideo.src.replace('&autoplay=0', '') + '&autoplay=1';
      document.removeEventListener('click', videoClickHandler);
    }, { once: true });
  }

  // ===== Hit Counter =====
  function updateHitCounter() {
    if (!elements.hitCounter) return;
    
    let count = localStorage.getItem("hitCount") || 9001;
    elements.hitCounter.textContent = `Hits: ${++count}`;
    localStorage.setItem("hitCount", count);
  }

  // ===== Easter Eggs =====
  
  // Konami Code
  const konamiCode = [38,38,40,40,37,39,37,39,66,65];
  let konamiIndex = 0;
  
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        alert("✨ 8-Bit Mode Unlocked ✨");
        elements.body.classList.add("eight-bit-mode");
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Create Fighter
  if (elements.fighterButton) {
    elements.fighterButton.addEventListener("click", () => {
      alert("💪 Choose Your Fighter! Now loading...\n[Coming Soon]");
    });
  }

  // Dial-up Sound
  if (elements.dialupBtn) {
    elements.dialupBtn.addEventListener("click", () => {
      const audio = new Audio("dialup.mp3");
      audio.play().catch(e => console.log("Audio playback failed:", e));
    });
  }

  // ===== AMV Video Handling =====
  if (elements.amvVideo) {
    elements.amvVideo.volume = 0.1;
    elements.amvVideo.loop = true;
    elements.amvVideo.play().catch(e => console.log("Autoplay blocked:", e));
  }

  // ===== VHS Hover Effects =====
  document.querySelectorAll(".vhs-link").forEach(link => {
    link.addEventListener("mouseover", () => link.classList.add("power-up"));
    link.addEventListener("mouseout", () => link.classList.remove("power-up"));
  });

  // ===== AMV Graveyard =====
  document.querySelectorAll(".amv-deadlink").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      alert("💀 File not found... but the gains are eternal.");
    });
  });

  // ===== Fighter Builder (Experimental) =====
  if (elements.fighterZone) {
    elements.fighterZone.innerHTML = `
      <p>[🧪 Experimental Fighter Builder Here]</p>
      <p>Drag anime heads onto bodybuilder torsos to create your champion.</p>
      <div class="fighter-preview">
        <img src="img/anime-head.png" class="drag-img" draggable="true" id="anime-head" alt="anime head">
        <img src="img/bodybuilder-torso.png" class="drop-img" id="bodybuilder-torso" alt="bodybuilder torso">
      </div>
    `;
    
    const head = document.getElementById("anime-head");
    const torso = document.getElementById("bodybuilder-torso");
    
    if (head && torso) {
      head.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", "anime-head");
      });
      
      torso.addEventListener("dragover", e => e.preventDefault());
      torso.addEventListener("drop", e => {
        e.preventDefault();
        alert("✅ Fighter Created!");
      });
    }
  }

  // ===== Initialize Functions =====
  handleVideoAutoplay();
  updateHitCounter();
  
  // Mobile viewport height fix
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setVH();
  window.addEventListener('resize', setVH);
});