document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("introScreen");
  const appShell = document.getElementById("appShell");
  const pressStartBtn = document.getElementById("pressStartBtn");
  const doorTransition = document.getElementById("doorTransition");

  const bgMusic = document.getElementById("bgMusic");
  const doorSound = document.getElementById("doorSound");
  const switchSound = document.getElementById("switchSound");

  let started = false;

  function beginExperience() {
    if (started) return;
    started = true;

    // sonido del switch
    if (switchSound) {
      switchSound.currentTime = 0;
      switchSound.play().catch(() => {});
    }

    // mostrar puertas abiertas primero
    doorTransition.classList.remove("hidden");
    doorTransition.classList.remove("closing", "closed", "opening");

    // Forzar reflow para que el navegador pinte el estado inicial ANTES de animar
    void doorTransition.offsetWidth;

    // pequeño delay para que se note que "aparecieron abiertas"
    setTimeout(() => {
      // 1) CERRAR puertas
      doorTransition.classList.add("closing");

      if (doorSound) {
        doorSound.currentTime = 0;
        doorSound.play().catch(() => {});
      }

      setTimeout(() => {
        // quedan cerradas
        doorTransition.classList.remove("closing");
        doorTransition.classList.add("closed");

        // ocultamos intro mientras están cerradas
        introScreen.classList.add("hidden");

        // mostramos la app detrás
        appShell.classList.remove("hidden");

        // pausa corta para que se sienta el cierre completo
        setTimeout(() => {
          // 2) ABRIR puertas
          doorTransition.classList.remove("closed");
          doorTransition.classList.add("opening");

          if (doorSound) {
            doorSound.currentTime = 0;
            doorSound.play().catch(() => {});
          }

          // música
          if (bgMusic) {
            bgMusic.volume = 0.45;
            bgMusic.play().catch(() => {});
          }

          setTimeout(() => {
            doorTransition.classList.add("hidden");
            doorTransition.classList.remove("opening");
          }, 1100);
        }, 400);
      }, 1100);
    }, 120);
  }

  pressStartBtn.addEventListener("click", beginExperience);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      beginExperience();
    }
  });
});