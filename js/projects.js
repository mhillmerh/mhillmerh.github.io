document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      title: "AppInventario",
      type: "Web App",
      description:
        "Sistema de inventario desarrollado en Java web con enfoque en gestión de usuarios, CRUD de ítems y arquitectura MVC.",
      technologies: ["Java", "JSP", "Servlets", "MySQL", "MVC"],
      image: "assets/images/projects/appinventory.png",
      github: "#"
    },
    {
      title: "Quest Generator",
      type: "Mobile / Web",
      description:
        "Generador de quests con temática retro y enfoque visual, construido como proyecto creativo para practicar interfaces y lógica.",
      technologies: ["Ionic", "Angular", "TypeScript", "JSON"],
      image: "assets/images/projects/questgenator.png",
      github: "#"
    },
    {
      title: "Bot Pentester",
      type: "Automation",
      description:
        "Proyecto orientado a automatizar pruebas con herramientas como Docker, JMeter y OWASP ZAP para análisis de seguridad.",
      technologies: ["Python", "Docker", "JMeter", "OWASP ZAP"],
      image: "assets/images/projects/rpts.png",
      github: "#"
    },
    {
      title: "API de Vuelos",
      type: "Backend",
      description:
        "API REST construida con Flask y MySQL para consultar vuelos y pasajeros mediante joins y endpoints estructurados.",
      technologies: ["Python", "Flask", "MySQL", "REST API"],
      image: "assets/images/projects/API.png",
      github: "#"
    },
    
  ];

  const grid = document.getElementById("projectsGrid");
  const prevBtn = document.getElementById("projectsPrevBtn");
  const nextBtn = document.getElementById("projectsNextBtn");
  const indicator = document.getElementById("projectsPageIndicator");

  if (!grid || !prevBtn || !nextBtn || !indicator) return;

  let currentPage = 1;

  function getItemsPerPage() {
  const width = window.innerWidth;

  if (width < 768) return 1;
  if (width < 1200) return 2;
  return 3;
}

  function getTotalPages(itemsPerPage) {
    return Math.max(1, Math.ceil(projects.length / itemsPerPage));
  }

  function renderProjects() {
    const itemsPerPage = getItemsPerPage();
    const totalPages = getTotalPages(itemsPerPage);

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const visibleProjects = projects.slice(start, start + itemsPerPage);

    grid.innerHTML = visibleProjects
      .map((project) => {
        const techHtml = project.technologies
          .map((tech) => `<span class="project-tech-pill">${tech}</span>`)
          .join("");

        const githubBtn =
          project.github && project.github !== "#"
            ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link-btn alt">GitHub</a>`
            : "";

        const demoBtn =
          project.demo && project.demo !== "#"
            ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link-btn">Demo</a>`
            : "";

        return `
          <article class="project-doom-card">
            <div class="project-doom-image">
              <img src="${project.image}" alt="Imagen del proyecto ${project.title}">
            </div>

            <div class="project-doom-content">
              <div class="project-doom-header">
                <h3 class="project-doom-title">${project.title}</h3>
                <span class="project-doom-type">${project.type}</span>
              </div>

              <p class="project-doom-desc">${project.description}</p>

              <div class="project-tech-list">
                ${techHtml}
              </div>

              <div class="project-doom-footer">
                ${githubBtn}
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    indicator.textContent = `${currentPage} / ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProjects();
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = getTotalPages(getItemsPerPage());
    if (currentPage < totalPages) {
      currentPage++;
      renderProjects();
    }
  });

  window.addEventListener("resize", renderProjects);

  renderProjects();
});