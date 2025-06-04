document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("products-container");
  const filterButtons = document.querySelectorAll(".filter-buttons button");

  let allProducts = []; // Array di tutti i prodotti caricati da JSON

  // 1) Funzione che crea in DOM la card .artwork per un prodotto
  function createProductCard(product) {
    const div = document.createElement("div");
    div.classList.add("artwork");
    div.classList.add(product.category);          // "acrylic" o "ai"
    div.setAttribute("data-price", product.price);

    // IMMAGINE
    const img = document.createElement("img");
    img.src = product.image;                     // es: "/images/paesaggio.jpg"
    img.alt = product.title;
    div.appendChild(img);

    // INFO (titolo + descrizione)
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info");

    const h3 = document.createElement("h3");
    h3.textContent = product.title;
    infoDiv.appendChild(h3);

    const pDesc = document.createElement("p");
    pDesc.textContent = product.description;
    infoDiv.appendChild(pDesc);

    div.appendChild(infoDiv);
    return div;
  }

  // 2) Funzione per disegnare TUTTE le card filtrate
  function renderProducts(filterCategory = "all") {
    container.innerHTML = ""; // svuota
    const daMostrare = allProducts.filter(p => {
      return filterCategory === "all" || p.category === filterCategory;
    });

    if (daMostrare.length === 0) {
      container.innerHTML = "<p>Nessun prodotto da mostrare.</p>";
      return;
    }

    daMostrare.forEach(prod => {
      const card = createProductCard(prod);
      container.appendChild(card);
    });

    // Dopo averle create, (ri)inizializzo la lightbox e modal-price su TUTTE le immagini create
    initLightboxAndModal();
  }

  // 3) Event listener sui bottoni filtro
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter"); // "all" / "acrylic" / "ai"
      renderProducts(filter);
      // Facoltativo: aggiungi qui .active al bottone selezionato
    });
  });

  // 4) Fetch di products.json
  fetch("/data/products.json")
    .then(response => {
      if (!response.ok) throw new Error("Impossibile caricare products.json");
      return response.json();
    })
    .then(data => {
      // data.products è un array di oggetti { title, description, price, category, image }
      allProducts = data.products.map(item => ({
        title: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image
      }));
      renderProducts("all"); // iniziale: mostra tutti
    })
    .catch(err => {
      console.error("Errore:", err);
      container.innerHTML = "<p>Errore nel caricamento dei prodotti.</p>";
    });

  // 5) FUNZIONI LIGHTBOX + MODAL PREZZI
  //    Copiamo e adattiamo il tuo codice, ma lo facciamo girare su ogni .artwork generata.

  function initLightboxAndModal() {
    // Seleziono TUTTE le .artwork img appena create
    const images = document.querySelectorAll(".artwork img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = lightbox?.querySelector("#lightbox-img");
    let lightboxInfo = lightbox?.querySelector(".lightbox-info");

    // Creo la struttura .lightbox-info se non c’è
    if (lightbox && !lightboxInfo) {
      lightboxInfo = document.createElement("div");
      lightboxInfo.className = "lightbox-info";
      lightbox.appendChild(lightboxInfo);
    }

    // Popola titolo, descrizione e prezzo dentro alla lightbox
    function populateLightboxInfo(title, description, price) {
      if (!lightboxInfo) return;
      lightboxInfo.innerHTML = "";

      const titleEl = document.createElement("h2");
      titleEl.textContent = title;
      lightboxInfo.appendChild(titleEl);

      const descEl = document.createElement("p");
      descEl.textContent = description;
      lightboxInfo.appendChild(descEl);

      const priceDiv = document.createElement("div");
      priceDiv.className = "price-tag";

      const priceLabel = document.createElement("span");
      priceLabel.className = "price-label";
      priceLabel.textContent = "Price";
      priceDiv.appendChild(priceLabel);

      const priceValue = document.createElement("span");
      priceValue.className = "price-value";
      if (price && price.toString().trim() !== "" && price.toString() !== "0") {
        const cleanPrice = price.toString().trim();
        priceValue.textContent = (/[€$£]/.test(cleanPrice)) ? cleanPrice : `NZ$ ${cleanPrice}`;
      } else {
        priceValue.textContent = "Price upon request";
      }
      priceDiv.appendChild(priceValue);
      lightboxInfo.appendChild(priceDiv);

      // Bottone contatto
      const contactBtn = document.createElement("button");
      contactBtn.className = "btn-contact";
      contactBtn.textContent = "Contact for Details";
      contactBtn.addEventListener("click", () => {
        alert("Qui si aprirebbe il form di contatto");
      });
      lightboxInfo.appendChild(contactBtn);
    }

    // Apro o chiudo la lightbox
    function toggleLightbox(show, imgSrc = "", title = "", description = "", price = "") {
      if (!lightbox) return;

      if (show) {
        lightbox.classList.remove("hidden");
        if (lightboxImage) {
          lightboxImage.src = imgSrc;
          lightboxImage.alt = title;
        }
        populateLightboxInfo(title, description, price);
        document.body.style.overflow = "hidden";
      } else {
        lightbox.classList.add("hidden");
        document.body.style.overflow = "auto";
      }
    }

    // Evento click su ogni immagine .artwork
    images.forEach(img => {
      img.addEventListener("click", () => {
        const artwork = img.closest(".artwork");
        const title = artwork?.querySelector("h3")?.textContent || "Untitled";
        const description = artwork?.querySelector(".info p")?.textContent || "No description available";
        const price = artwork?.dataset.price || "";

        toggleLightbox(true, img.src, title, description, price);
      });
    });

    // Chiudo lightbox cliccando sullo sfondo
    lightbox?.addEventListener("click", e => {
      if (e.target === lightbox) toggleLightbox(false);
    });
    // Chiudo lightbox con ESC
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
        toggleLightbox(false);
      }
    });
    // Chiudo lightbox con il bottone “×”
    const closeBtn = lightbox?.querySelector(".close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => toggleLightbox(false));
    }
  }
});