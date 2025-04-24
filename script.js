document.addEventListener("DOMContentLoaded", () => {
  // ————————— ARTWORK ANIMATION (rimane uguale) —————————
  const artwork = document.querySelectorAll(".artwork");
  artwork.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100 * i + 300);
  });

  // ————————— VIDEO AURORA (rimane uguale) —————————
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

  // ————————— MENU ON-DEMAND CORRETTO —————————
  const onDemandButton = document.getElementById("onDemandButton");
  const onDemandMenu   = document.getElementById("onDemandMenu");
  if (!onDemandButton || !onDemandMenu) return;

  // aria setup
  onDemandButton.setAttribute("aria-haspopup", "true");
  onDemandButton.setAttribute("aria-expanded", "false");

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    void onDemandMenu.offsetHeight;               // trigger reflow
    const isHidden = onDemandMenu.classList.toggle("hidden");
    onDemandButton.setAttribute("aria-expanded", isHidden ? "false" : "true");
    if (!isHidden) {
      onDemandMenu.querySelector("a").focus();    // focus first link
    } else {
      onDemandButton.focus();                     // focus back to button
    }
  };

  // click e touch su button
  onDemandButton.addEventListener("click", handleToggle);
  onDemandButton.addEventListener("touchstart", handleToggle);

  // click esterno chiude menu
  document.addEventListener("click", (e) => {
    if (!onDemandMenu.contains(e.target) && !onDemandButton.contains(e.target)) {
      if (!onDemandMenu.classList.contains("hidden")) {
        onDemandMenu.classList.add("hidden");
        onDemandButton.setAttribute("aria-expanded", "false");
      }
    }
  });

  // esc chiude menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !onDemandMenu.classList.contains("hidden")) {
      onDemandMenu.classList.add("hidden");
      onDemandButton.setAttribute("aria-expanded", "false");
      onDemandButton.focus();
    }
  });
// ————————— VIDEO SOPRA LO SLIDER —————————
  window.addEventListener("load", () => {
    const bottomVideo = document.querySelector(".bottom-video");
    if (!bottomVideo) return;

    bottomVideo.currentTime = 0;
    bottomVideo.play().catch(() => {
      console.log("Autoplay bloccato: interagisci per avviare il video.");
    });
    bottomVideo.style.opacity = 1;

    setInterval(() => {
      bottomVideo.currentTime = 0;
      bottomVideo.play();
    }, 10000);
  });
});
