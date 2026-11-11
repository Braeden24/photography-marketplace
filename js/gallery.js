const gallery = document.getElementById("photo-gallery");
const searchInput = document.getElementById("photo-search");
const resultsCount = document.getElementById("results-count");
const emptyMessage = document.getElementById("empty-message");

const marketplace = document.getElementById("marketplace");

const filterToggle = document.getElementById("filter-toggle");
const cartToggle = document.getElementById("cart-toggle");

const lightbox = document.getElementById("photo-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const categoryFilters = document.querySelectorAll('input[name="category"]');
const photographerFilters = document.querySelectorAll('input[name="photographer"]');

let cart = [];


function getSelectedValue(filters) {
    const selected = Array.from(filters).find(filter => filter.checked);
    return selected ? selected.value : "all";
}


function renderGallery() {

    const selectedCategory = getSelectedValue(categoryFilters);
    const selectedPhotographer = getSelectedValue(photographerFilters);

    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredPhotos = photos.filter(photo => {

        const matchesCategory =
            selectedCategory === "all" ||
            photo.category === selectedCategory;

        const matchesPhotographer =
            selectedPhotographer === "all" ||
            photo.photographer === selectedPhotographer;

        const matchesSearch =
            photo.title.toLowerCase().includes(searchTerm) ||
            photo.photographer.toLowerCase().includes(searchTerm) ||
            photo.category.toLowerCase().includes(searchTerm);

        return (
            matchesCategory &&
            matchesPhotographer &&
            matchesSearch
        );
    });


    gallery.innerHTML = filteredPhotos.map(photo => {

        const alreadyInCart = cart.some(
            item => item.id === photo.id
        );

        return `
            <article class="photo-card">

                <div
                    class="photo-preview"
                    data-photo-id="${photo.id}"
                    tabindex="0"
                    role="button"
                    aria-label="View ${photo.title}"
                >
                    <img
                        src="${photo.image}"
                        alt="${photo.title}"
                    >
                </div>

                <div class="photo-info">

                    <h2>${photo.title}</h2>

                    <p>${photo.photographer}</p>

                    <button
                        type="button"
                        class="add-to-cart"
                        data-photo-id="${photo.id}"
                        ${alreadyInCart ? "disabled" : ""}
                    >
                        ${alreadyInCart ? "In Cart" : "Add to Cart"}
                    </button>

                </div>

            </article>
        `;
    }).join("");


    resultsCount.textContent =
        `${filteredPhotos.length} photographs`;

    emptyMessage.hidden =
        filteredPhotos.length > 0;
}

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="cart-empty">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "$0.00";

        return;
    }


    cartItems.innerHTML = cart.map(photo => {

        return `
            <div class="cart-item">

                <img
                    src="${photo.image}"
                    alt="${photo.title}"
                >

                <div class="cart-item-info">

                    <h3>${photo.title}</h3>

                    <p>${photo.photographer}</p>

                    <button
                        type="button"
                        class="remove-from-cart"
                        data-photo-id="${photo.id}"
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;
    }).join("");


    cartTotal.textContent = "$0.00";
}

gallery.addEventListener("click", event => {

    const button = event.target.closest(".add-to-cart");

    if (button) {

        const photoId = button.dataset.photoId;

        const photo = photos.find(
            photo => photo.id === photoId
        );

        if (!photo) return;

        // Prevent duplicate items
        if (cart.some(item => item.id === photoId)) {
            return;
        }

        cart.push(photo);

        renderCart();
        renderGallery();

        return;
    }

    const preview = event.target.closest(".photo-preview");

    if (preview) {

        const photoId = preview.dataset.photoId;

        const photo = photos.find(
            photo => photo.id === photoId
        );

        if (!photo) return;

        lightboxImage.src = photo.image;
        lightboxImage.alt = photo.title;

        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        // Prevent the page from scrolling
        document.body.style.overflow = "hidden";
    }
});

cartItems.addEventListener("click", event => {

    const button = event.target.closest(
        ".remove-from-cart"
    );

    if (!button) return;

    const photoId = button.dataset.photoId;

    cart = cart.filter(
        item => item.id !== photoId
    );

    renderCart();
    renderGallery();
});

function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    lightboxImage.src = "";

    document.body.style.overflow = "";
}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }
});


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        lightbox.classList.contains("active")
    ) {
        closeLightbox();
    }
});

categoryFilters.forEach(filter => {

    filter.addEventListener(
        "change",
        renderGallery
    );
});


photographerFilters.forEach(filter => {

    filter.addEventListener(
        "change",
        renderGallery
    );
});


searchInput.addEventListener(
    "input",
    renderGallery
);

const clearFiltersButton =
    document.getElementById("clear-filters");

if (clearFiltersButton) {

    clearFiltersButton.addEventListener(
        "click",
        () => {

            categoryFilters.forEach(filter => {

                filter.checked =
                    filter.value === "all";
            });


            photographerFilters.forEach(filter => {

                filter.checked =
                    filter.value === "all";
            });


            searchInput.value = "";

            renderGallery();
        }
    );
}

filterToggle.addEventListener("click", () => {

    marketplace.classList.toggle(
        "sidebar-collapsed"
    );
});

cartToggle.addEventListener("click", () => {

    marketplace.classList.toggle(
        "cart-collapsed"
    );
});

renderGallery();
renderCart();
