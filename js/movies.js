const catalogContainer = document.querySelector("#movies-list");
const moviesCount = document.querySelector("#movies-count");

function renderMovies(movieList) {
    catalogContainer.innerHTML = "";

    movieList.forEach(function (movie) {
        const card = document.createElement("article");
        card.className = "col-12 col-sm-6 col-lg-4 movie-card";

        card.innerHTML = `
            <img
                class="movie-poster" src="../assets/images/posters/${movie.poster}" alt="${movie.title} poster">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-meta">
                ${movie.genre} · ${movie.duration} · ${movie.age}
            </p>
            <a
                class="btn btn-cinema-outline mt-auto" href="movie-details.html?movie=${movie.id}">
                Book tickets
            </a>

            <button class="btn btn-cinema-outline mt-2 favorite-button" type="button">
                Add to favorites
            </button>
        `;

        const favoriteButton = card.querySelector(".favorite-button");

        updateFavoriteButton(favoriteButton, movie.id);

        favoriteButton.addEventListener("click", function () {
            if (toggleFavorite(movie.id)) {
                applyFilters();
            }
        });
        catalogContainer.appendChild(card);
    });
    if (movieList.length === 0) {
        moviesCount.textContent = "No movies match the selected filters.";
    } else {
        moviesCount.textContent = movieList.length + " movies";
    }
}

const searchInput = document.querySelector("#search");
const genreSelect = document.querySelector("#genre");
const filterForm = document.querySelector("#filter-form");
const resetButton = document.querySelector("#reset-filters");
const favoritesOnly = document.querySelector("#favorites-only");
const clearFavoritesButton = document.querySelector("#clear-favorites");

function applyFilters() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedGenre = genreSelect.value;
    const favorites = getFavorites();

    const filteredMovies = movies.filter(function (movie) {
        const matchesSearch = movie.title.toLowerCase().includes(searchText);

        const matchesGenre = selectedGenre === "all" || movie.genre.toLowerCase() === selectedGenre;

        const matchesFavorites = !favoritesOnly.checked || favorites.includes(movie.id);

        return matchesSearch && matchesGenre && matchesFavorites;
    });

    renderMovies(filteredMovies);
}

searchInput.addEventListener("input", applyFilters);
genreSelect.addEventListener("change", applyFilters);
favoritesOnly.addEventListener("change", applyFilters);

clearFavoritesButton.addEventListener("click", function () {
    if (saveFavorites([])) {
        applyFilters();
    }
});

filterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    applyFilters();
});

resetButton.addEventListener("click", function () {
    searchInput.value = "";
    genreSelect.value = "all";
    favoritesOnly.checked = false;
    applyFilters();
});

const urlParams = new URLSearchParams(window.location.search);
searchInput.value = urlParams.get("q") || "";

window.addEventListener("pageshow", applyFilters);
