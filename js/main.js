document.addEventListener("DOMContentLoaded", () => {
  console.log("Doom Portafolio iniciado.");

  const bgMusic = document.getElementById("bgMusic");
  const musicToggleBtn = document.getElementById("musicToggleBtn");
  const menuButtons = document.querySelectorAll(".menu-btn");
  const pickupSound = new Audio("assets/sounds/doom_pickup.wav");

  function updateMusicButtonState() {
    if (!musicToggleBtn || !bgMusic) return;

    const musicEnabled = !bgMusic.paused;

    musicToggleBtn.textContent = musicEnabled
      ? "AUDIO: ON"
      : "AUDIO: OFF";

    musicToggleBtn.classList.toggle("off", !musicEnabled);
  }

  if (musicToggleBtn && bgMusic) {
    musicToggleBtn.onclick = () => {
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
      } else {
        bgMusic.pause();
      }

      updateMusicButtonState();
    };

    updateMusicButtonState();
  }

  menuButtons.forEach((btn) => {
    btn.onclick = (() => {
      const originalHandler = btn.onclick;

      return (event) => {
        if (typeof originalHandler === "function") {
          originalHandler.call(btn, event);
        }

        if (btn.dataset.screen === "arcade") {
          pickupSound.currentTime = 0;
          pickupSound.play().catch(() => {});
        }
      };
    })();
  });

  window.onSectionChanged = (sectionName) => {
    if (sectionName !== "credits") {
      const creditsMusic = document.getElementById("creditsMusic");

      if (creditsMusic && !creditsMusic.paused) {
        creditsMusic.pause();
        creditsMusic.currentTime = 0;
      }
    }
  };
});