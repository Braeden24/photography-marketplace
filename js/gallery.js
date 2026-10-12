const gallery = document.getElementById("photo-gallery");
const categoryFilter = document.getElementById("category-filter");
const photographerFilter = document.getElementById("photographer-filter");
const searchInput = document.getElementById("photo-search");
const resultsCount = document.getElementById("results-count");
const emptyMessage = document.getElementById("empty-message");

function renderGallery() {
    const category = categoryFilter.value;
    const photographer = photographerFilter.value;
    const search = searchInput.value.trim().toLowerCase();

    const filteredPhotos = photos.filter(photo => {
        const matchesCategory =
            category === "all" || photo.category === category;

        const matchesPhotographer =
            photographer === "all" ||
            photo.photographer === photographer;

        const matchesSearch =
            photo.title.toLowerCase().includes(search) ||
            photo.photographer.toLowerCase().includes(search);

        return (
            matchesCategory &&
            matchesPhotographer &&
            matchesSearch
        );
    });

    gallery.innerHTML = filteredPhotos.map(photo => `
        <article class="photo-card">
            <img
                src="${photo.image}"
                alt="${photo.title}"
                loading="lazy"
            >

            <div class="photo-info">
                <h2>${photo.title}</h2>
                <p>${photo.photographer}</p>

                <button type="button"
                    data-photo-id="${photo.id}">
                    View Photo
                </button>
            </div>
        </article>
    `).join("");

    resultsCount.textContent =
        `${filteredPhotos.length} photographs`;

    emptyMessage.hidden = filteredPhotos.length > 0;
}

categoryFilter.addEventListener("change", renderGallery);
photographerFilter.addEventListener("change", renderGallery);
searchInput.addEventListener("input", renderGallery);

document.getElementById("clear-filters")
    .addEventListener("click", () => {
        categoryFilter.value = "all";
        photographerFilter.value = "all";
        searchInput.value = "";
        renderGallery();
    });

// Display all photographs on initial page load.
renderGallery();

