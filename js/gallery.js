const gallery = document.getElementById("photo-gallery");
const searchInput = document.getElementById("photo-search");
const resultsCount = document.getElementById("results-count");
const emptyMessage = document.getElementById("empty-message");
const categoryFilters = document.querySelectorAll('input[name="category"]');
const photographerFilters = document.querySelectorAll('input[name="photographer"]');

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
            <img
                src="${photo.image}"
                alt="${photo.title}"
                loading="lazy"
            >

            <div class="photo-info">
                <h2>${photo.title}</h2>
                <p>${photo.photographer}</p>

                <button type="button" data-photo-id="${photo.id}"> View Photo</button></div></article>`).join("");
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

renderGallery();

