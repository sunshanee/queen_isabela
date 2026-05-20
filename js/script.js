// GLOBAL STATE
let currentFilter = "All";

// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", () => {
  // Search input listener
  const searchInput = document.getElementById("destSearch");
  if (searchInput) {
    searchInput.addEventListener("input", filterDestinations);
  }

  // Filter button listeners
  document.querySelectorAll("#filterBtns .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setFilter(btn.dataset.filter, btn);
    });
  });
});

// FILTER DESTINATIONS 
function filterDestinations() {
  const query = document.getElementById("destSearch").value.toLowerCase();
  const cards = document.querySelectorAll(".dest-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const title = card.querySelector("h5").innerText.toLowerCase();
    const loc = card.querySelector(".dest-loc").innerText.toLowerCase();
    const badge = card.querySelector(".dest-badge").innerText.toLowerCase();

    const matchesSearch = title.includes(query) || loc.includes(query) || badge.includes(query);
    const matchesFilter = currentFilter === "All" || badge === currentFilter.toLowerCase();

    if (matchesSearch && matchesFilter) {
      card.parentElement.style.display = "";
      visibleCount++;
    } else {
      card.parentElement.style.display = "none";
    }
  });

  // Show "no results" message if nothing matches
  document.getElementById("noResults").style.display = visibleCount === 0 ? "block" : "none";
}

// SET FILTER 
function setFilter(filter, btn) {
  currentFilter = filter;

  // Update active button styling
  document.querySelectorAll("#filterBtns .filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  // Re-run search with new filter
  filterDestinations();
}

// MODAL HANDLING 
function openModal(id) {
  const modal = new bootstrap.Modal(document.getElementById("destModal"));

  const card = document.querySelector(`.dest-card button[onclick="openModal(${id})"]`).closest(".dest-card");
  const title = card.querySelector("h5").innerText;
  const loc = card.querySelector(".dest-loc").innerText;
  const desc = card.querySelector("p:nth-of-type(2)").innerText;

  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalBody").innerHTML = `
    <p><strong>Location:</strong> ${loc}</p>
    <p>${desc}</p>
  `;

  modal.show();
}

function openModal(id) {
  const modalBody = document.getElementById('modalBody');
  const modalTitle = document.getElementById('modalTitle');

  // Clear previous content
  modalBody.innerHTML = '';

  switch(id) {
    case 1: // Magat Dam
      modalTitle.textContent = "Magat Dam & Reservoir";
      modalBody.innerHTML = `
        <img src="img/magat.jpg" class="img-fluid rounded mb-3">
        <p>One of the largest irrigation dams in Southeast Asia, the Magat Dam is an iconic landmark of Isabela. It spans the Magat River and provides irrigation, hydroelectric power, and scenic views.</p>
      `;
      break;

    case 2: // Disulap River
      modalTitle.textContent = "Disulap River System";
      modalBody.innerHTML = `
        <img src="img/disulap.jpg" class="img-fluid rounded mb-3">
        <p>A pristine river system in the heart of the Sierra Madre, the Disulap River in San Mariano is a haven for nature lovers. Known for its clear waters and lush surroundings.</p>
      `;
      break;

    case 3: // Santa Victoria Cave
      modalTitle.textContent = "Santa Victoria Cave";
      modalBody.innerHTML = `
        <img src="img/cave.png" class="img-fluid rounded mb-3">
        <p>One of Isabela's most fascinating geological wonders, Santa Victoria Cave features impressive stalactite and stalagmite formations, perfect for adventure seekers.</p>
      `;
      break;

    case 5: // Tumauini Church
      modalTitle.textContent = "Tumauini Church (Saint Dominic Church)";
      modalBody.innerHTML = `
        <img src="img/tomauinichurch.jpg" class="img-fluid rounded mb-3">
        <p>A UNESCO World Heritage Site tentative list candidate, the St. Dominic de Guzmán Parish Church in Tumauini is one of the finest examples of brick Baroque architecture in the Philippines.</p>
      `;
      break;

    case 6: // Ilagan Wildlife Sanctuary
      modalTitle.textContent = "Ilagan Wildlife Sanctuary";
      modalBody.innerHTML = `
        <img src="img/ilagansanct.jpg" class="img-fluid rounded mb-3">
        <p>Located in the heart of Ilagan City, this wildlife sanctuary protects endemic and endangered Philippine wildlife, offering visitors a chance to connect with nature.</p>
      `;
      break;

    case 7: // Sierra Madre
      modalTitle.textContent = "Sierra Madre Mountain Range";
      modalBody.innerHTML = `
        <img src="img/sierraa.jpg" class="img-fluid rounded mb-3">
        <p>The Sierra Madre Mountain Range, the longest mountain range in the Philippines, forms Isabela's eastern backbone. It offers challenging trails and breathtaking views.</p>
      `;
      break;

    case 8: // Cagayan River
      modalTitle.textContent = "Cagayan River (Isabela Section)";
      modalBody.innerHTML = `
        <img src="img/cagayan.jpg" class="img-fluid rounded mb-3">
        <p>The mighty Cagayan River — the longest river in the Philippines — flows through Isabela. Its section offers river cruises, fishing, and scenic landscapes.</p>
      `;
      break;

    case 9: // Jones Eco Park
      modalTitle.textContent = "Jones Eco Park";
      modalBody.innerHTML = `
        <img src="img/jones.jpg" class="img-fluid rounded mb-3">
        <p>A community-managed eco-park in Jones featuring zip lines, river swimming, forest trails, and picnic grounds for families and adventurers alike.</p>
      `;
      break;

    case 10: // Divilacan Coves
      modalTitle.textContent = "Divilacan Coves & Coastline";
      modalBody.innerHTML = `
        <img src="img/divheart.jpg" class="img-fluid rounded mb-3">
        <p>Tucked along Isabela's remote Pacific coastline, Divilacan is a hidden gem featuring secluded coves, pristine beaches, and dramatic rock formations.</p>
      `;
      break;
  }

  // Show the modal
  const modal = new bootstrap.Modal(document.getElementById('destModal'));
  modal.show();
}


// LIGHTBOX 
let currentIndex = 0;
let galleryItems = [];

function openLightbox(index) {
  galleryItems = Array.from(document.querySelectorAll(".gallery-item img"));
  currentIndex = index;
  document.getElementById("lightbox").classList.add("show");
  updateLightbox();
}

function updateLightbox() {
  const img = galleryItems[currentIndex];
  if (!img) return;
  document.getElementById("lightbox-img").innerHTML =
    `<img src="${img.src}" alt="${img.alt}" style="max-width:100%;max-height:80vh;">`;
  document.getElementById("lightbox-caption").innerText = img.alt;
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("show");
}

function lightboxNav(direction) {
  if (galleryItems.length === 0) return;
  currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
  updateLightbox();
}
