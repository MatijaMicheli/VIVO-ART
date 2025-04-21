document.addEventListener("DOMContentLoaded", () => {
  // ANIMAZIONE ARTWORK
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

  // VIDEO AURORA
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
      }, 10000);
    }
  });

// MENU ON-DEMAND CORRETTO
  const onDemandButton = document.getElementById("onDemandButton");
  const onDemandMenu = document.getElementById("onDemandMenu");

  if (onDemandButton && onDemandMenu) {
    const toggleMenu = (e) => {
  e.preventDefault();
  e.stopPropagation();
  
  // Forza il reflow per l'animazione
  void onDemandMenu.offsetHeight;
  
  onDemandMenu.classList.toggle("hidden");
};

    const closeMenu = (e) => {
      if (!onDemandMenu.contains(e.target) && !onDemandButton.contains(e.target)) {
        onDemandMenu.classList.add("hidden");
      }
    };

    // Aggiungi event listeners
    onDemandButton.addEventListener("click", toggleMenu);
    document.addEventListener("click", closeMenu);

    // Fix per dispositivi touch
    onDemandButton.addEventListener("touchstart", (e) => {
      e.preventDefault();
      toggleMenu(e);
    });
  }
});

    