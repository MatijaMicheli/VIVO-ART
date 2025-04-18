document.addEventListener("DOMContentLoaded", () => {
  // Animazione delle opere d'arte
  const artwork = document.querySelectorAll(".artwork");

  const animateArtworks = () => {
    artwork.forEach((artwork, index) => {
      setTimeout(() => {
        artwork.style.opacity = "1";
        artwork.style.transform = "translateY(0)";
      }, 100 * index);
    });
  };

  artwork.forEach((artwork) => {
    artwork.style.opacity = "0";
    artwork.style.transform = "translateY(20px)";
    artwork.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  setTimeout(animateArtworks, 300);

  // Gestione video aurora
  const container = document.querySelector(".aurora-container");
  const video = document.querySelector(".aurora-video");

  let played = false;

  container.addEventListener("mouseenter", () => {
    if (!played) {
      video.currentTime = 0;
      video.style.opacity = 1;
      video.play();
      played = true;

      setInterval(() => {
        video.currentTime = 0;
        video.play();
      }, 10000); // Ogni 10 secondi
    }
  });

  video.addEventListener("ended", () => {
    // Il video si ripeterà automaticamente ogni 10 secondi
  });

  // Logica del menu dropdown
  const menuToggle = document.getElementById("menu-toggle");
  const dropdownMenu = document.getElementById("dropdown-menu");

  menuToggle.addEventListener("click", () => {
    dropdownMenu.classList.toggle("dropdown-window");
    menuToggle.classList.toggle("active");
  });
});
