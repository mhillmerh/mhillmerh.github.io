document.addEventListener("DOMContentLoaded", () => {
  console.log("Doom Portafolio iniciado.");
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("Doom Portafolio iniciado.");

  const bgMusic = document.getElementById("bgMusic");
  const musicToggleBtn = document.getElementById("musicToggleBtn");

  let musicEnabled = true;

  if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
        musicEnabled = true;
      } else {
        bgMusic.pause();
        musicEnabled = false;
      }

      musicToggleBtn.textContent = musicEnabled
        ? "🔊 MUSIC ON"
        : "🔇 MUSIC OFF";

      musicToggleBtn.classList.toggle("off", !musicEnabled);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuButtons = document.querySelectorAll(".menu-btn");
  const pickupSound = new Audio("assets/sounds/doom_pickup.wav");

  menuButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.screen === "arcade") {
        pickupSound.currentTime = 0;
        pickupSound.play().catch(() => {});
      }
    });
  });
});