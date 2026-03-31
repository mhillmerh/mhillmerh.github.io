document.addEventListener("DOMContentLoaded", () => {
  const certifications = [
    {
      title: "Microsoft Azure Fundamentals AZ-900",
      issuer: "Microsoft",
      medal:"assets/images/badges/AZ-900.png",
      date: "2023",
      type: "Certificate",
      description:
      "Validate Foundational Knoledge of cloud concepts, Azure services, pricing and security",
      link: "https://www.credly.com/badges/5b40ffcc-708a-44ab-82d9-9087735bc3b6/public_url"
    },
    {
      title: "Especialización en automatización de pruebas",
      issuer: "Sence",
      medal: "assets/images/badges/automatizacion.png",
      date: "2025",
      type: "Certificate",
      description:
        "Test automation uses programming to verify web application functionality and detect errors. Professionals in this field design automated tests that are integrated into the continuous software development process ",
      link: "https://eligemejor.sence.cl/PerfilNatural/DescargarCertificado?idCurso=BOTIC-SOFOF-24-28-13-0030&idFederacion=5&rutAsistido="
    },
    {
      title: "Desarrollo de aplicaiones Full-Stack Java Trainee",
      issuer: "Sence",
      medal: "assets/images/badges/doom_disk.png",
      date: "2026",
      type: "Course",
      description:
        "Curso enfocado en pruebas funcionales, validación de APIs y herramientas de testing.",
      link: "#"
    },
    {
      title: "Microsoft Azure Developer Associate AZ-204",
      issuer: "Microsoft",
      medal: "assets/images/badges/AZ-204.png",
      date: "2026",
      type: "Course",
      description:
        "Currently in progress. Focused on building cloud solutions using Azure services",
      link: "#"
    }
  ];

  const grid = document.getElementById("certificationsGrid");
  const prevBtn = document.getElementById("certPrevBtn");
  const nextBtn = document.getElementById("certNextBtn");
  const indicator = document.getElementById("certPageIndicator");

  if (!grid || !prevBtn || !nextBtn || !indicator) return;

  let currentPage = 1;

  function getItemsPerPage() {
    const width = window.innerWidth;

    if (width < 768) return 1;
    return 2;
  }

  function getTotalPages(itemsPerPage) {
    return Math.max(1, Math.ceil(certifications.length / itemsPerPage));
  }

  function renderCertifications() {
    const itemsPerPage = getItemsPerPage();
    const totalPages = getTotalPages(itemsPerPage);

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const visibleCerts = certifications.slice(start, start + itemsPerPage);

    grid.innerHTML = visibleCerts
      .map((cert) => {
        const linkBtn =
          cert.link && cert.link !== "#"
            ? `<a href="${cert.link}" target="_blank" rel="noopener noreferrer" class="cert-link-btn">VIEW CERTIFICATE</a>`
            : "";

        return `
  <article class="cert-doom-card">
    <div class="cert-doom-top">
      <div class="cert-medal-wrap">
        <img src="${cert.medal}" alt="Medalla de ${cert.title}" class="cert-medal-icon">
      </div>

      <div class="cert-doom-header">
        <h3 class="cert-doom-title">${cert.title}</h3>
        <span class="cert-doom-badge">${cert.type}</span>
      </div>
    </div>

    <p class="cert-doom-org">${cert.issuer}</p>
    <p class="cert-doom-date">${cert.date}</p>

    <p class="cert-doom-desc">${cert.description}</p>

    <div class="cert-doom-footer">
      ${linkBtn}
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
      renderCertifications();
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = getTotalPages(getItemsPerPage());
    if (currentPage < totalPages) {
      currentPage++;
      renderCertifications();
    }
  });

  window.addEventListener("resize", renderCertifications);

  renderCertifications();
});