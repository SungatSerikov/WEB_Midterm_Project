function getFavorites() {
    try {
        const saved = JSON.parse(localStorage.getItem("cinema-favorites"));

        if (!Array.isArray(saved)) {
            return [];
        }

        return saved.filter(function (id) {
            return typeof id === "string";
        });
    } catch {
        return [];
    }
}

function saveFavorites(favorites) {
    try {
        localStorage.setItem("cinema-favorites", JSON.stringify(favorites));
        return true;
    } catch {
        alert("Could not save favorites. Check your browser storage settings.");
        return false;
    }
}

function toggleFavorite(movieId) {
    let favorites = getFavorites();

    if (favorites.includes(movieId)) {
        favorites = favorites.filter(function (id) {
            return id !== movieId;
        });
    } else {
        favorites.push(movieId);
    }

    return saveFavorites(favorites);
}

function updateFavoriteButton(button, movieId) {
    const favorites = getFavorites();

    if (favorites.includes(movieId)) {
        button.textContent = "Remove from favorites";
    } else {
        button.textContent = "Add to favorites";
    }
}
