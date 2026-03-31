document.addEventListener("DOMContentLoaded", () => {
  const menuButtons = document.querySelectorAll(".menu-btn");

  async function showScreen(screenId) {
    if (!window.appSections) return;

    await window.appSections.loadSection(screenId);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showScreen(button.dataset.screen);
    });
  });

  window.appNavigation = {
    showScreen,
  };

  showScreen("home");
});