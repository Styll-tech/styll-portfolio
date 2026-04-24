function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
  } else {
    nav.classList.add("active");
  }
}

window.addEventListener("load", () => {
  const canvas = document.getElementById("loaderCanvas");
  const ctx = canvas.getContext("2d");
  const bar = document.getElementById("bar");
  const percentText = document.getElementById("percent");
  const loader = document.getElementById("loader");

  // 1. Matrix Background Logic
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const alphabet = "0101010101STYLLCODE{}[]<>/";
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    ctx.fillStyle = "rgba(2, 6, 23, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#64ffda";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
        drops[i] = 0;
      drops[i]++;
    }
  }

  const matrixInterval = setInterval(drawMatrix, 50);

  // 2. Progress Logic
  let load = 0;
  const progressInterval = setInterval(() => {
    load += Math.floor(Math.random() * 5) + 1; 

    if (load >= 100) {
      load = 100;
      clearInterval(progressInterval);
      clearInterval(matrixInterval);

      // Smoothly hide loader
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
        setTimeout(() => (loader.style.display = "none"), 800);
      }, 600);
    }

    bar.style.width = load + "%";
    percentText.innerHTML = load + "%";
  }, 80);
});
