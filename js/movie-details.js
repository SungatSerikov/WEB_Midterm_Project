const params = new URLSearchParams(window.location.search);
const movieId = params.get("movie");

const selectedMovie = movies.find(function (movie) {
    return movie.id === movieId;
});

if (selectedMovie) {
    document.querySelector("#selected-movie").value = selectedMovie.id;
    document.title = "Cinema+ | " + selectedMovie.title;

    document.querySelector("#movie-title").textContent =
        selectedMovie.title;

    document.querySelector("#movie-breadcrumb").textContent =
        "› " + selectedMovie.title;

    document.querySelector("#booking-movie-title").textContent =
        selectedMovie.title;

    const poster = document.querySelector("#movie-poster");

    poster.src = "../assets/images/posters/" + selectedMovie.poster;
    poster.alt = selectedMovie.title + " poster";

    document.querySelector("#movie-meta").textContent =
        selectedMovie.genre + " · " +
        selectedMovie.duration + " · " +
        selectedMovie.age;

    document.querySelector("#movie-description").textContent =
        selectedMovie.description || "Description coming soon.";

    document.querySelector("#movie-genre").textContent =
        selectedMovie.genre;

    document.querySelector("#movie-duration").textContent =
        selectedMovie.duration;

    document.querySelector("#movie-age").textContent =
        selectedMovie.age;

    const favoriteMovieButton = document.querySelector("#favorite-movie");

    updateFavoriteButton(favoriteMovieButton, selectedMovie.id);

    favoriteMovieButton.addEventListener("click", function () {
        if (toggleFavorite(selectedMovie.id)) {
            updateFavoriteButton(favoriteMovieButton, selectedMovie.id);
        }
    });

    window.addEventListener("pageshow", function () {
        updateFavoriteButton(favoriteMovieButton, selectedMovie.id);
    });
} else {
    document.title = "Cinema+ | Movie not found";

    document.querySelector(".details-main").innerHTML = `
        <h1>Movie not found</h1>
        <p>Please choose a movie from the catalogue.</p>
        <a class="btn btn-cinema" href="movies.html">Back to movies</a>
    `;
}
