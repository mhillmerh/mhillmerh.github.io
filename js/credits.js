function initCreditsSection() {
  const creditsRoll = document.getElementById("creditsRoll");
  const toggleBtn = document.getElementById("creditsToggleBtn");
  const restartBtn = document.getElementById("creditsRestartBtn");

  const bgMusic = document.getElementById("bgMusic");
  const creditsMusic = document.getElementById("creditsMusic");
  const musicToggleBtn = document.getElementById("musicToggleBtn");

  if (!creditsRoll || !toggleBtn || !restartBtn) {
    return;
  }

  let animationFrame = null;
  let isPaused = false;
  let isCreditsActive = true;
  let y = 0;
  const speed = 0.45;
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
    if (!isCreditsActive) {
      return;
    }

    if (!isPaused) {
      const rollHeight = creditsRoll.scrollHeight;
      const stage = creditsRoll.parentElement;
      const stageHeight = stage ? stage.clientHeight : 520;

      y -= speed;
      creditsRoll.style.transform = `translateY(${y}px)`;

      if (y < -rollHeight) {
        y = stageHeight;
      }
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

  function handleToggleClick() {
    isPaused = !isPaused;
    toggleBtn.textContent = isPaused ? "RESUME" : "PAUSE";
  }

  function handleRestartClick() {
    resetCreditsPosition();
    isPaused = false;
    toggleBtn.textContent = "PAUSE";
  }

  function cleanupCreditsSection() {
    isCreditsActive = false;

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }

    stopCreditsMusic();

    toggleBtn.onclick = null;
    restartBtn.onclick = null;

    if (window.__creditsResizeHandler) {
      window.removeEventListener("resize", window.__creditsResizeHandler);
      window.__creditsResizeHandler = null;
    }

    if (window.__creditsSectionCleanup === cleanupCreditsSection) {
      window.__creditsSectionCleanup = null;
    }
  }

  function handleResize() {
    resetCreditsPosition();
  }

  if (window.__creditsSectionCleanup) {
    window.__creditsSectionCleanup();
  }

  window.__creditsSectionCleanup = cleanupCreditsSection;

  toggleBtn.onclick = handleToggleClick;
  restartBtn.onclick = handleRestartClick;

  if (window.__creditsResizeHandler) {
    window.removeEventListener("resize", window.__creditsResizeHandler);
  }

  window.__creditsResizeHandler = handleResize;
  window.addEventListener("resize", window.__creditsResizeHandler);

  resetCreditsPosition();
  playCreditsMusic();
  animationFrame = requestAnimationFrame(step);
}