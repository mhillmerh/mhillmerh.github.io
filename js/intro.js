document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("introScreen");
  const appShell = document.getElementById("appShell");
  const pressStartBtn = document.getElementById("pressStartBtn");
  const doorTransition = document.getElementById("doorTransition");

  const bgMusic = document.getElementById("bgMusic");
  const doorSound = document.getElementById("doorSound");
  const switchSound = document.getElementById("switchSound");
  const musicToggleBtn = document.getElementById("musicToggleBtn");

  if (!introScreen || !appShell || !pressStartBtn || !doorTransition) {
    return;
  }

  let started = false;
  let introFinished = false;
  let introTimeouts = [];

  function registerTimeout(callback, delay) {
    const id = setTimeout(callback, delay);
    introTimeouts.push(id);
    return id;
  }

  function clearIntroTimeouts() {
    introTimeouts.forEach((id) => clearTimeout(id));
    introTimeouts = [];
  }

  function updateMusicButtonState() {
    if (!musicToggleBtn || !bgMusic) return;

    const musicEnabled = !bgMusic.paused;
    musicToggleBtn.textContent = musicEnabled ? "AUDIO: ON" : "AUDIO: OFF";
    musicToggleBtn.classList.toggle("off", !musicEnabled);
  }

  function playSafe(audio, volume = null) {
    if (!audio) return;

    if (typeof volume === "number") {
      audio.volume = volume;
    }

    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  function beginExperience() {
    if (started || introFinished) return;
    started = true;

    playSafe(switchSound);

    doorTransition.classList.remove("hidden", "closing", "closed", "opening");

    void doorTransition.offsetWidth;

    registerTimeout(() => {
      doorTransition.classList.add("closing");
      playSafe(doorSound);

      registerTimeout(() => {
        doorTransition.classList.remove("closing");
        doorTransition.classList.add("closed");

        introScreen.classList.add("hidden");
        appShell.classList.remove("hidden");

        registerTimeout(() => {
          doorTransition.classList.remove("closed");
          doorTransition.classList.add("opening");
          playSafe(doorSound);

          if (bgMusic) {
            playSafe(bgMusic, 0.45);
            updateMusicButtonState();
          }

          registerTimeout(() => {
            doorTransition.classList.add("hidden");
            doorTransition.classList.remove("opening");
            introFinished = true;
            clearIntroTimeouts();
          }, 1100);
        }, 400);
      }, 1100);
    }, 120);
  }

  function handleIntroKeydown(event) {
    if (introFinished || started) return;

    const key = event.key;

    if (key === "Enter" || key === " ") {
      event.preventDefault();
      beginExperience();
    }
  }

  pressStartBtn.addEventListener("click", beginExperience);
  window.addEventListener("keydown", handleIntroKeydown);

  window.__introCleanup = () => {
    clearIntroTimeouts();
    window.removeEventListener("keydown", handleIntroKeydown);
  };
});