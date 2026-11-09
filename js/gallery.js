const gallery = document.getElementById("photo-gallery");
const searchInput = document.getElementById("photo-search");
const resultsCount = document.getElementById("results-count");
const emptyMessage = document.getElementById("empty-message");
const marketplace = document.getElementById("marketplace");
const filterToggle = document.getElementById("filter-toggle");
const cartToggle = document.getElementById("cart-toggle");
const filterSidebar = document.getElementById("filter-sidebar");
const lightbox = document.getElementById("photo-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const categoryFilters = document.querySelectorAll('input[name="category"]');
const photographerFilters = document.querySelectorAll('input[name="photographer"]');
let cart = [];

function getSelectedValue(filters) {
    return document.querySelector(`input[name="${filters[0].name}"]:checked`).value;
}

function renderGallery() {
    const category = getSelectedValue(categoryFilters);
    const photographer = getSelectedValue(photographerFilters);
    const search = searchInput.value.trim().toLowerCase();

    const filteredPhotos = photos.filter(photo => {
        const matchesCategory = category === "all" || photo.category === category;

        const matchesPhotographer = photographer === "all" || photo.photographer === photographer;

        const matchesSearch =photo.title.toLowerCase().includes(search) || photo.photographer.toLowerCase().includes(search);

        return (
            matchesCategory &&
            matchesPhotographer &&
            matchesSearch
        );
    });

    gallery.innerHTML = filteredPhotos.map(photo => `
		<article class="photo-card">

			<div class="photo-preview" data-photo-id="${photo.id}" tabindex="0" role="button">
				<img src="${photo.image}" alt="${photo.title}">
			</div>

			<div class="photo-info">
				<h2>${photo.title}</h2>
				<p>${photo.photographer}</p>

				<button type="button" class="add-to-cart" data-photo-id="${photo.id}" ${cart.some(item => item.id === photo.id) ? "disabled" : ""}>
					${cart.some(item => item.id === photo.id) ? "In Cart" : "Add to Cart"}
				</button>
			</div>

		</article>
	`).join("");
    resultsCount.textContent = `${filteredPhotos.length} photographs`;
    emptyMessage.hidden = filteredPhotos.length > 0;
}

categoryFilters.forEach(filter => {
    filter.addEventListener("change", renderGallery);
});

photographerFilters.forEach(filter => {
    filter.addEventListener("change", renderGallery);
});

searchInput.addEventListener("input", renderGallery);

document.getElementById("clear-filters")
    .addEventListener("click", () => {
        document.querySelector('input[name="category"][value="all"]').checked = true;
        document.querySelector('input[name="photographer"][value="all"]').checked = true;
        searchInput.value = "";

        renderGallery();
    });

filterToggle.addEventListener("click", () => {
    const isCollapsed =
        marketplace.classList.toggle("sidebar-collapsed");

    filterToggle.setAttribute(
        "aria-expanded",
        String(!isCollapsed)
    );

    filterToggle.setAttribute(
        "aria-label",
        isCollapsed ? "Show filters" : "Hide filters"
    );
});


cartItems.addEventListener("click", event => {

    const button = event.target.closest(".remove-from-cart");

    const photoId = button.dataset.photoId;
    cart = cart.filter(photo => photo.id !== photoId);
    renderCart();
    renderGallery();
});

cartToggle.addEventListener("click", () => {
    const isCollapsed =
        marketplace.classList.toggle("cart-collapsed");

    cartToggle.setAttribute(
        "aria-expanded",
        String(!isCollapsed)
    );

    cartToggle.setAttribute(
        "aria-label",
        isCollapsed ? "Show cart" : "Hide cart"
    );
});

gallery.addEventListener("click", event => {

    // Add to Cart
    const button = event.target.closest(".add-to-cart");

    if (button) {
        const photoId = button.dataset.photoId;
        const photo = photos.find(photo => photo.id === photoId);

        if (!photo || cart.some(item => item.id === photoId)) {
            return;
        }

        cart.push(photo);

        renderCart();
        renderGallery();

        return;
    }

    // Open Lightbox
    const preview = event.target.closest(".photo-preview");

    if (preview) {
        const photoId = preview.dataset.photoId;
        const photo = photos.find(photo => photo.id === photoId);

        if (!photo) return;
        lightboxImage.src = photo.image;
        lightboxImage.alt = photo.title;
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }
});

function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

renderGallery();
renderCart();
