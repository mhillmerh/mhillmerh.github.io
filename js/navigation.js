document.addEventListener("DOMContentLoaded", () => {
  const menuButtons = document.querySelectorAll(".menu-btn");
  const screens = document.querySelectorAll(".screen");

  function showScreen(screenId) {
    screens.forEach((screen) => {
      const active = screen.id === screenId;
      screen.classList.toggle("d-none", !active);
    });

    menuButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.screen === screenId);
    });
  }

  menuButtons.forEach((button) => {
    button.addEventListener("click", () => showScreen(button.dataset.screen));
  });
});