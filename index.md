---
layout: default
title: Intro
---

<div style="text-align:center; margin-top:50px;">
  <!-- Imagen estilo Doom con "Portafolio" -->
  <img src="/assets/images/PORTAFOLIO.png" alt="Portafolio" style="max-width: 50%; height:70%;">

  <!-- Texto tipo "Presiona continuar" parpadeante -->
  <h2 class="blink" style="margin-top:40px;">Continuar</h2>
</div>

<script>
  // Redirige automáticamente al menú después de 3 segundos de "continuar"
  document.querySelector('.blink').addEventListener('click', function() {
    window.location.href = "/intro.html"; // cambia si tu menú está en otro archivo
  });
</script>