(() => {
  const sectionMap = {
    home: {
      path: "sections/home.html",
      init: null,
    },
    about: {
      path: "sections/about.html",
      init: null,
    },
    projects: {
      path: "sections/projects.html",
      init: initProjectsSection,
    },
    technologies: {
      path: "sections/technologies.html",
      init: initTechnologiesSection,
    },
    certifications: {
      path: "sections/certifications.html",
      init: initCertificationsSection,
    },
    social: {
      path: "sections/social.html",
      init: initSocialSection,
    },
    credits: {
      path: "sections/credits.html",
      init: initCreditsSection,
    },
    arcade: {
      path: "sections/arcade.html",
      init: null,
    },
  };

  let currentSection = null;
  let currentRequestId = 0;

  function cleanupCurrentSection() {
    if (window.__creditsSectionCleanup) {
      window.__creditsSectionCleanup();
    }

    if (window.__socialSectionCleanup) {
      window.__socialSectionCleanup();
    }
  }

  function updateActiveMenu(sectionName) {
    document.querySelectorAll(".menu-btn").forEach((button) => {
      button.classList.toggle("active", button.dataset.screen === sectionName);
    });
  }

  async function loadSection(sectionName) {
    const config = sectionMap[sectionName];
    const container = document.getElementById("screenContainer");

    if (!config || !container) {
      return;
    }

    const requestId = ++currentRequestId;

    try {
      cleanupCurrentSection();

      container.innerHTML = `
        <div class="loading-screen">
          <p>Cargando módulo...</p>
        </div>
      `;

      const response = await fetch(config.path, { cache: "no-cache" });

      if (!response.ok) {
        throw new Error(`No se pudo cargar ${config.path}`);
      }

      const html = await response.text();

      if (requestId !== currentRequestId) {
        return;
      }

      container.innerHTML = html;
      currentSection = sectionName;

      updateActiveMenu(sectionName);

      if (typeof config.init === "function") {
        config.init();
      }

      if (typeof window.onSectionChanged === "function") {
        window.onSectionChanged(sectionName);
      }
    } catch (error) {
      if (requestId !== currentRequestId) {
        return;
      }

      container.innerHTML = `
        <section class="screen active-screen">
          <div class="screen-header">
            <h2>ERROR</h2>
          </div>
          <div class="screen-body">
            <div class="retro-card">
              <p>No se pudo cargar la sección <strong>${sectionName}</strong>.</p>
              <p>${error.message}</p>
            </div>
          </div>
        </section>
      `;
    }
  }

  window.appSections = {
    loadSection,
    getCurrentSection: () => currentSection,
  };
})();