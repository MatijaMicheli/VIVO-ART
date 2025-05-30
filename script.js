document.addEventListener("DOMContentLoaded", () => {

  // ————————— ARTWORK ANIMATION —————————
  const artwork = document.querySelectorAll(".artwork");

  if (artwork.length) {
    artwork.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 100 * i + 300);
    });
  }

  // ----------- SCRITTA PARTICELLE --------
  function createParticles() {
    const container = document.querySelector('.header-title');
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'gold-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.width = particle.style.height = Math.random() * 4 + 2 + 'px';
      particle.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(particle);
    }
  }
  createParticles();

  // ————————— FILTRI —————————
  const buttons = document.querySelectorAll("[data-filter]");
  const artworks = document.querySelectorAll(".artwork");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      artworks.forEach(art => {
        if (filter === "all" || art.classList.contains(filter)) {
          art.style.display = "block";
        } else {
          art.style.display = "none";
        }
      });
    });
  });

  // ————————— VIDEO AURORA —————————
  const container = document.querySelector(".aurora-container");
  const video = document.querySelector(".aurora-video");
  let played = false;
  if (container && video) {
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
  }

  // ————————— LIGHTBOX PER IMMAGINI —————————
  const images = document.querySelectorAll(".artwork img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.querySelector("#lightbox img");

  if (lightbox && lightboxImage) {
    images.forEach(img => {
      img.addEventListener("click", () => {
        lightboxImage.src = img.src;
        lightbox.classList.remove("hidden");
      });
    });

    lightbox.addEventListener("click", () => {
      lightbox.classList.add("hidden");
    });
  }

  // ————————— MENU ON-DEMAND —————————
  const onDemandButton = document.getElementById("onDemandButton");
  const onDemandMenu   = document.getElementById("onDemandMenu");

  if (onDemandButton && onDemandMenu) {
    onDemandButton.setAttribute("aria-haspopup", "true");
    onDemandButton.setAttribute("aria-expanded", "false");

    const handleToggle = (e) => {
  e.preventDefault();
  e.stopPropagation();
  void onDemandMenu.offsetHeight;
  const isHidden = onDemandMenu.classList.toggle("hidden");
  onDemandButton.setAttribute("aria-expanded", isHidden ? "false" : "true");
  
  // Aggiungi/rimuovi classe per la freccia
  if (isHidden) {
    onDemandButton.classList.remove("menu-open");
  } else {
    onDemandButton.classList.add("menu-open");
  }
  
  if (!isHidden) {
    onDemandMenu.querySelector("a").focus();
  } else {
    onDemandButton.focus();
  }
};

    onDemandButton.addEventListener("click", handleToggle);
    onDemandButton.addEventListener("touchstart", handleToggle);

    document.addEventListener("click", (e) => {
      if (!onDemandMenu.contains(e.target) && !onDemandButton.contains(e.target)) {
        if (!onDemandMenu.classList.contains("hidden")) {
          onDemandMenu.classList.add("hidden");
          onDemandButton.setAttribute("aria-expanded", "false");
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !onDemandMenu.classList.contains("hidden")) {
        onDemandMenu.classList.add("hidden");
        onDemandButton.setAttribute("aria-expanded", "false");
        onDemandButton.focus();
      }
    });
  }

  // ————————— VIDEO SOPRA LO SLIDER —————————
  const bottomVideo = document.querySelector(".bottom-video");
  if (bottomVideo) {
    bottomVideo.currentTime = 0;
    bottomVideo.play().catch(() => {
      console.log("Autoplay bloccato: interagisci per avviare il video.");
    });
    bottomVideo.style.opacity = 1;

    setInterval(() => {
      bottomVideo.currentTime = 0;
      bottomVideo.play();
    }, 10000);
  }
});