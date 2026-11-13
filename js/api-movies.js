const apiMoviesContainer = document.querySelector("#api-movies");
const apiStatus = document.querySelector("#api-status");
const retryMoviesButton = document.querySelector("#retry-movies");

function renderApiMovies(movieList) {
    movieList.forEach(function (movie) {
        const card = document.createElement("article");

        card.className = "col-12 col-sm-6 col-lg-3 movie-card";

        card.innerHTML = `
            <img class="movie-poster api-poster" loading="lazy" alt="">
            <h3 class="movie-title"></h3>
            <p class="movie-meta"></p>
            <p class="api-director"></p>
            <p class="api-description"></p>
        `;

        const poster = card.querySelector("img");
        poster.src = movie.image;
        poster.alt = movie.title + " poster";

        card.querySelector(".movie-title").textContent = movie.title;

        card.querySelector(".movie-meta").textContent = movie.release_date + " · " + movie.running_time + " min";

        card.querySelector(".api-director").textContent = "Director: " + movie.director;

        card.querySelector(".api-description").textContent = movie.description;

        apiMoviesContainer.appendChild(card);
    });
}

function loadApiMovies() {
    apiMoviesContainer.innerHTML = "";
    apiStatus.textContent = "Loading movies...";
    retryMoviesButton.hidden = true;

    fetch("https://ghibliapi.vercel.app/films")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Failed to load movies");
            }

            return response.json();
        })
        .then(function (data) {
            if (!Array.isArray(data)) {
                throw new Error("Unexpected response format");
            }

            const selectedMovies = data.slice(0, 4);

            if (selectedMovies.length === 0) {
                apiStatus.textContent = "No movies available.";
                retryMoviesButton.hidden = false;
                return;
            }

            renderApiMovies(selectedMovies);
            apiStatus.textContent = "";
        })
        .catch(function () {
            apiMoviesContainer.innerHTML = "";
            apiStatus.textContent =
                "Could not load movies. Please try again.";

            retryMoviesButton.hidden = false;
        });
}

retryMoviesButton.addEventListener("click", loadApiMovies);

loadApiMovies();