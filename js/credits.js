document.addEventListener("DOMContentLoaded", () => {
  const creditsScreen = document.getElementById("credits");
  const creditsRoll = document.getElementById("creditsRoll");
  const toggleBtn = document.getElementById("creditsToggleBtn");
  const restartBtn = document.getElementById("creditsRestartBtn");

  const bgMusic = document.getElementById("bgMusic");
  const creditsMusic = document.getElementById("creditsMusic");
  const musicToggleBtn = document.getElementById("musicToggleBtn");

  if (!creditsScreen || !creditsRoll || !toggleBtn || !restartBtn) return;

  let animationFrame = null;
  let isPaused = false;
  let isCreditsActive = false;
  let y = 0;
  let speed = 0.45;
  let bgWasPlayingBeforeCredits = false;

  function isMainMusicEnabled() {
    return musicToggleBtn ? !musicToggleBtn.classList.contains("off") : true;
  }

  function resetCreditsPosition() {
    const stage = creditsRoll.parentElement;
    y = stage ? stage.clientHeight : 520;
    creditsRoll.style.transform = `translateY(${y}px)`;
  }

  function step() {
    if (!isCreditsActive || isPaused) {
      animationFrame = requestAnimationFrame(step);
      return;
    }

    const rollHeight = creditsRoll.scrollHeight;
    const stage = creditsRoll.parentElement;
    const stageHeight = stage ? stage.clientHeight : 520;

    y -= speed;
    creditsRoll.style.transform = `translateY(${y}px)`;

    if (y < -rollHeight) {
      y = stageHeight;
    }

    animationFrame = requestAnimationFrame(step);
  }

  function playCreditsMusic() {
    if (!creditsMusic || !isMainMusicEnabled()) return;

    bgWasPlayingBeforeCredits = !!bgMusic && !bgMusic.paused;

    if (bgMusic && !bgMusic.paused) {
      bgMusic.pause();
    }

    creditsMusic.volume = 0.45;
    creditsMusic.play().catch(() => {});
  }

  function stopCreditsMusic() {
    if (!creditsMusic) return;

    const creditsWasPlaying = !creditsMusic.paused;
    creditsMusic.pause();
    creditsMusic.currentTime = 0;

    if (
      creditsWasPlaying &&
      bgMusic &&
      isMainMusicEnabled() &&
      bgWasPlayingBeforeCredits
    ) {
      bgMusic.play().catch(() => {});
    }
  }

  function updateCreditsState() {
    const visible = !creditsScreen.classList.contains("d-none");

    if (visible && !isCreditsActive) {
      isCreditsActive = true;
      isPaused = false;
      toggleBtn.textContent = "PAUSE";
      resetCreditsPosition();
      playCreditsMusic();
    } else if (!visible && isCreditsActive) {
      isCreditsActive = false;
      stopCreditsMusic();
    }
  }

  toggleBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    toggleBtn.textContent = isPaused ? "RESUME" : "PAUSE";
  });

  restartBtn.addEventListener("click", () => {
    resetCreditsPosition();
    isPaused = false;
    toggleBtn.textContent = "PAUSE";
  });

  const observer = new MutationObserver(() => {
    updateCreditsState();
  });

  observer.observe(creditsScreen, {
    attributes: true,
    attributeFilter: ["class"],
  });

  resetCreditsPosition();
  updateCreditsState();
  animationFrame = requestAnimationFrame(step);
});