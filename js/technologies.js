document.addEventListener("DOMContentLoaded", () => {
  const technologies = [
    {
      name: "HTML",
      category: "Frontend",
      level: "Estructuración semántica y bases de interfaces web.",
      medal: "assets/icons/html5icon.svg"
    },
    {
      name: "CSS",
      category: "Frontend",
      level: "Diseño responsive, layout y personalización visual.",
      medal: "assets/icons/cssicon.svg"
    },
    {
      name: "JavaScript",
      category: "Frontend / Logic",
      level: "Interactividad, manipulación del DOM y lógica cliente.",
      medal: "assets/icons/javascripticon.svg"
    },
    {
      name: "Bootstrap",
      category: "UI Framework",
      level: "Grid responsive y utilidades para interfaces adaptables.",
      medal: "assets/icons/bootstrapicon.svg"
    },
    {
      name: "Java",
      category: "Backend",
      level: "POO, aplicaciones web, consola y arquitectura MVC.",
      medal: "assets/icons/javaicon.svg"
    },
    {
      name: "Python",
      category: "Backend / Scripts",
      level: "APIs, automatización y scripts utilitarios.",
      medal: "assets/icons/pythonicon.svg"
    },
    {
      name: "MySQL",
      category: "Database",
      level: "Modelado relacional, consultas y operaciones CRUD.",
      medal: "assets/icons/mysqlicon.svg"
    },
    {
      name: "Git",
      category: "Version Control",
      level: "Control de versiones y flujo básico de trabajo.",
      medal: "assets/icons/giticon.svg"
    },
    {
      name: "GitHub",
      category: "Repository",
      level: "Publicación de proyectos y gestión de código.",
      medal: "assets/icons/githubicon.svg"
    },
    {
      name: "Docker",
      category: "DevOps",
      level: "Contenedores para entornos de desarrollo y pruebas.",
      medal: "assets/icons/dockericon.svg"
    },
    {
      name: "TypeScript",
      category: "Testing",
      level: "APIs, desarrollo web y aplicaciones moviles.",
      medal: "assets/icons/typescripticon.svg"
    },
    {
      name: "Ionic",
      category: "Movil Devps",
      level: "Desarrollo de aplicaciones moviles.",
      medal: "assets/icons/ionicicon.svg"
    }
  ];

  const grid = document.getElementById("technologiesGrid");
  const prevBtn = document.getElementById("techPrevBtn");
  const nextBtn = document.getElementById("techNextBtn");
  const indicator = document.getElementById("techPageIndicator");

  if (!grid || !prevBtn || !nextBtn || !indicator) return;

  let currentPage = 1;

  function getItemsPerPage() {
    const width = window.innerWidth;

    if (width < 768) return 3;
    if (width < 1200) return 6;
    return 9;
  }

  function getTotalPages(itemsPerPage) {
    return Math.max(1, Math.ceil(technologies.length / itemsPerPage));
  }

  function renderTechnologies() {
    const itemsPerPage = getItemsPerPage();
    const totalPages = getTotalPages(itemsPerPage);

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const visibleTechnologies = technologies.slice(start, start + itemsPerPage);

    grid.innerHTML = visibleTechnologies
      .map((tech) => {
        return `
          <article class="tech-doom-card">
            <div class="tech-doom-icon">
              <img src="${tech.medal}" alt="Ícono de ${tech.name}">
            </div>

            <div class="tech-doom-info">
              <h3 class="tech-doom-name">${tech.name}</h3>
              <span class="tech-doom-category">${tech.category}</span>
              <p class="tech-doom-level">${tech.level}</p>
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
      renderTechnologies();
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = getTotalPages(getItemsPerPage());
    if (currentPage < totalPages) {
      currentPage++;
      renderTechnologies();
    }
  });

  window.addEventListener("resize", renderTechnologies);

  renderTechnologies();
});