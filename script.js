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
  const filterButtons = document.querySelectorAll("[data-filter]");
  const artworksAll = document.querySelectorAll(".artwork");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      artworksAll.forEach(art => {
        art.style.display = (filter === "all" || art.classList.contains(filter)) ? "block" : "none";
      });
    });
  });

  // ————————— VIDEO AURORA —————————
  const auroraContainer = document.querySelector(".aurora-container");
  const auroraVideo = document.querySelector(".aurora-video");
  let played = false;
  if (auroraContainer && auroraVideo) {
    auroraContainer.addEventListener("mouseenter", () => {
      if (!played) {
        auroraVideo.currentTime = 0;
        auroraVideo.style.opacity = 1;
        auroraVideo.play();
        played = true;
        setInterval(() => {
          auroraVideo.currentTime = 0;
          auroraVideo.play();
        }, 10000);
      }
    });
  }

  // ————————— LIGHTBOX CON PREZZI DINAMICI —————————
  const images = document.querySelectorAll(".artwork img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = lightbox?.querySelector('img');
  if (lightbox && lightboxImage) {
    images.forEach(img => {
      img.addEventListener("click", () => {
        // info and price logic...
      });
    });
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) toggleLightbox(false);
    });
    document.addEventListener("keydown", e => {
      if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) toggleLightbox(false);
    });
  }

  // ————————— MENU ON-DEMAND —————————
  const onDemandButton = document.getElementById("onDemandButton");
  const onDemandMenu   = document.getElementById("onDemandMenu");
  if (onDemandButton && onDemandMenu) {
    const handleToggle = e => {
      e.preventDefault(); e.stopPropagation();
      const isHidden = onDemandMenu.classList.toggle("hidden");
      onDemandButton.setAttribute("aria-expanded", !isHidden);
      onDemandButton.classList.toggle("menu-open", !isHidden);
      if (!isHidden) onDemandMenu.querySelector("a").focus();
    };
    onDemandButton.addEventListener("click", handleToggle);
    onDemandButton.addEventListener("touchstart", handleToggle);
    document.addEventListener("click", e => {
      if (!onDemandMenu.contains(e.target) && !onDemandButton.contains(e.target)) {
        onDemandMenu.classList.add("hidden");
        onDemandButton.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        onDemandMenu.classList.add("hidden");
        onDemandButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ————————— VIDEO SOPRA E SOTTO LO SLIDER —————————
  document.querySelectorAll('.bottom-video, #art-video').forEach(videoEl => {
    if (videoEl.classList.contains('bottom-video')) {
      videoEl.play().catch(()=>{});
      setInterval(()=>{ videoEl.currentTime = 0; videoEl.play(); }, 10000);
    }
    videoEl.addEventListener('click', ()=> videoEl.play());
  });

  // —————— PLAY BUTTON PER #art-video ——————
  const playBtn   = document.getElementById('play-btn');
  const artVideoEl= document.getElementById('art-video');
  const videoCont = document.querySelector('.video-container');
  if (playBtn && artVideoEl && videoCont) {
    playBtn.addEventListener('click', () => { artVideoEl.play(); videoCont.classList.add('video-playing'); });
    artVideoEl.addEventListener('pause', () => videoCont.classList.remove('video-playing'));
  }

  // —————— TOUCH SCALE + DARKEN ——————
  document.querySelectorAll('.text-block p').forEach(p => {
    ['touchstart','touchend','touchcancel'].forEach(evt =>
      p.addEventListener(evt, () => p.classList.toggle('touch-active', evt==='touchstart'))
    );
  });

  // ——— Popola data-text per glitch title ———
  const galleryTitle = document.querySelector('.my-gallery-title');
  if (galleryTitle) {
    galleryTitle.setAttribute('data-text', galleryTitle.textContent.trim());
  }

  // ————— MODALE VIEW PRODUCT CON PREZZI —————
  const productButtons = document.querySelectorAll('.viewProductBtn');
  productButtons.forEach(btn => {
    const modal = btn.closest('section').querySelector('.productModal');
    const span  = modal.querySelector('.close');
    btn.addEventListener('click', () => {
      const content = modal.querySelector('.modal-content');
      if (!content.querySelector('.modal-price')) {
        const priceData = modal.getAttribute('data-price');
        let display = 'Price upon request';
        if (priceData && priceData.trim() && priceData.trim()!=='0') {
          const clean = priceData.trim();
          display = (/[€$£]/.test(clean)) ? clean : `NZ$ ${clean}`;
        }
        const priceDiv = document.createElement('div');
        priceDiv.className = 'modal-price';
        priceDiv.innerHTML = `<span class="price-label">Price</span><span class="price-amount">${display}</span>`;
        content.insertBefore(priceDiv, content.querySelector('p').nextSibling);
      }
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
    span.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target===modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key==='Escape') closeModal(); });
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

});
