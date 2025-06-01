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

  // ————————— LIGHTBOX CON PREZZI DINAMICI - FIX COMPLETO —————————
const images = document.querySelectorAll(".artwork img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector("#lightbox img");

if (lightbox && lightboxImage) {
  images.forEach(img => {
    img.addEventListener("click", () => {
      const artwork = img.closest('.artwork');
      const title = artwork.querySelector('h3').textContent;
      const description = artwork.querySelector('p').textContent;
      
      // ✅ FIX PER PREZZI CON VIRGOLA - Gestione migliorata
      const priceData = artwork.getAttribute('data-price');
      let priceDisplay;
      
      // Controlla se il prezzo esiste e non è vuoto/null
      if (priceData && 
          priceData !== 'null' && 
          priceData !== 'undefined' && 
          priceData.trim() !== '' && 
          priceData.trim() !== '0') {
        
        // Pulisci il prezzo da eventuali caratteri non desiderati
        const cleanPrice = priceData.trim();
        
        // Se il prezzo contiene già il simbolo della valuta, usalo così com'è
        if (cleanPrice.includes('$') || cleanPrice.includes('€') || cleanPrice.includes('£')) {
          priceDisplay = cleanPrice;
        } else {
          // Altrimenti aggiungi il simbolo NZ$
          priceDisplay = `NZ$ ${cleanPrice}`;
        }
      } else {
        // Se non c'è prezzo valido, mostra "Price upon request"
        priceDisplay = 'Price upon request';
      }
      
      console.log('Price data:', priceData, '-> Display:', priceDisplay); // Debug
      
      // Rimuovi eventuali info precedenti
      const existingInfo = lightbox.querySelector('.lightbox-info');
      if (existingInfo) {
        existingInfo.remove();
      }
      
      // Crea il container principale
      const containerDiv = document.createElement('div');
      containerDiv.className = 'lightbox-container';
      
      // Crea il pannello informazioni
      const infoPanel = document.createElement('div');
      infoPanel.className = 'lightbox-info';
      infoPanel.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="price-tag">
          <span class="price-label">Price:</span>
          <span class="price-value">${priceDisplay}</span>
        </div>
        <button class="btn-contact" onclick="window.location.href='mailto:your-email@example.com?subject=Inquiry about ${encodeURIComponent(title)}'">Contact me for purchase</button>
      `;
      
      // Aggiungi bottone chiudi
      const closeBtn = document.createElement('span');
      closeBtn.className = 'close';
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', () => {
        lightbox.classList.add("hidden");
        document.body.classList.remove('lightbox-open');
      });
      
      // Assembla tutto
      containerDiv.appendChild(lightboxImage);
      containerDiv.appendChild(infoPanel);
      
      // Pulisci il lightbox e aggiungi nuovo contenuto  
      lightbox.innerHTML = '';
      lightbox.appendChild(closeBtn);
      lightbox.appendChild(containerDiv);
      
      // Imposta immagine e mostra lightbox
      lightboxImage.src = img.src;
      lightbox.classList.remove("hidden");
      
      // Previeni scroll del body su mobile
      document.body.classList.add('lightbox-open');
      
      // Scrolla in cima al lightbox
      lightbox.scrollTop = 0;
    });
  });

  // Chiudi cliccando sullo sfondo
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add("hidden");
      document.body.classList.remove('lightbox-open');
    }
  });

  // Chiudi con tasto ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      lightbox.classList.add("hidden");
      document.body.classList.remove('lightbox-open');
    }
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

  // —————— TOUCH SCALE + DARKEN ——————
  document.querySelectorAll('.text-block p').forEach(p => {
    p.addEventListener('touchstart', () => p.classList.add('touch-active'));
    p.addEventListener('touchend',   () => p.classList.remove('touch-active'));
    p.addEventListener('touchcancel',() => p.classList.remove('touch-active'));
  });

  // ——— Popola data-text per il glitch title ———
  const galleryTitle = document.querySelector('.my-gallery-title');
  if (galleryTitle) {
    galleryTitle.setAttribute('data-text', galleryTitle.textContent.trim());
  }

});

// ————— MODALE VIEW PRODUCT CON PREZZI —————
const buttons = document.querySelectorAll('.viewProductBtn');

buttons.forEach(btn => {
  const modal = btn.closest('section').querySelector('.productModal');
  const span = modal.querySelector('.close');

  btn.addEventListener('click', () => {
    modal.style.display = 'block';
    // Previeni scroll del body
    document.body.style.overflow = 'hidden';
    
    // Aggiungi il prezzo se non è già presente
    const modalContent = modal.querySelector('.modal-content');
    if (!modalContent.querySelector('.modal-price')) {
      // ✅ PRENDI IL PREZZO DAL DATA-PRICE DEL MODALE
      const priceData = modal.getAttribute('data-price');
      let priceDisplay;
      
      // Gestisci il prezzo come nel lightbox
      if (priceData && 
          priceData !== 'null' && 
          priceData !== 'undefined' && 
          priceData.trim() !== '' && 
          priceData.trim() !== '0') {
        
        const cleanPrice = priceData.trim();
        
        if (cleanPrice.includes('$') || cleanPrice.includes('€') || cleanPrice.includes('£')) {
          priceDisplay = cleanPrice;
        } else {
          priceDisplay = `NZ$ ${cleanPrice}`;
        }
      } else {
        priceDisplay = 'Price upon request';
      }
      
      const priceDiv = document.createElement('div');
      priceDiv.className = 'modal-price';
      priceDiv.innerHTML = `
        <span class="price-label">Price</span>
        <span class="price-amount">${priceDisplay}</span>
      `;
      
      // Inserisci il prezzo dopo la descrizione
      const description = modalContent.querySelector('p');
      description.parentNode.insertBefore(priceDiv, description.nextSibling);
    }
  });

  span.addEventListener('click', () => {
    modal.style.display = 'none';
    // Riabilita scroll del body
    document.body.style.overflow = 'auto';
  });

  // Chiudi cliccando fuori dal modal
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Chiudi con tasto ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});