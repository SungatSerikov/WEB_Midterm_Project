const moviesContainer = document.querySelector("#home-movies");

function renderHomeMovies(movieList) {
    moviesContainer.innerHTML = "";

    movieList.forEach(function (movie) {
        const card = document.createElement("article");

        card.className = "col-12 col-sm-6 col-lg-3 movie-card";

        card.innerHTML = `
            <img class="movie-poster" src="../assets/images/posters/${movie.poster}" alt="${movie.title} poster">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-meta">
                ${movie.genre} · ${movie.duration} · ${movie.age}
            </p>
            <a
                class="btn btn-cinema-outline mt-auto" href="movie-details.html?movie=${movie.id}">
                Book tickets
            </a>
        `;

        moviesContainer.appendChild(card);
    });
}

renderHomeMovies(movies.slice(0,4));