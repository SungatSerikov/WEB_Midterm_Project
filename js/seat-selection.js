document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("movie");
    const sessionDate = params.get("date");
    const sessionId = params.get("session");

    const contentWrapper = document.getElementById("seat-content-wrapper");
    const breadcrumbMovieLink = document.getElementById("breadcrumb-movie-link");
    const movieTitleElem = document.getElementById("session-movie-title");
    const cinemaNameElem = document.getElementById("session-cinema-name");
    const datetimeElem = document.getElementById("session-datetime");

    const currentMovie = movies.find(function (item) {
        return item.id === movieId;
    });

    const currentSession = sessions.find(function (item) {
        return item.id === sessionId;
    });

    if (!currentMovie || !currentSession || !sessionDate) {
        if (contentWrapper) {
            contentWrapper.innerHTML = `
                <div class="text-center py-5">
                    <h2 class="mb-3">Session Not Found</h2>
                    <p class="text-muted mb-4">Please choose a movie and session from our catalogue.</p>
                    <a href="movies.html" class="btn btn-proceed d-inline-block px-4">Browse Movies</a>
                </div>
            `;
        }
        return;
    }

    document.title = `Cinema+ | ${currentMovie.title} - Seat Selection`;

    if (breadcrumbMovieLink) {
        breadcrumbMovieLink.textContent = currentMovie.title;
        breadcrumbMovieLink.href = `movie-details.html?movie=${currentMovie.id}`;
    }

    if (movieTitleElem) movieTitleElem.textContent = currentMovie.title;
    if (cinemaNameElem) cinemaNameElem.textContent = currentSession.cinema;
    if (datetimeElem) datetimeElem.textContent = `${sessionDate} • ${currentSession.time} (${currentSession.format})`;

    const TICKET_PRICE = 2800;
    let selectedSeats = [];

    const seatsContainer = document.getElementById("selected-seats-container");
    const totalPriceDisplay = document.getElementById("total-price-display");
    const proceedButton = document.getElementById("proceed-button");
    const seatButtons = document.querySelectorAll(".seat:not(.occupied)");

    function calculateTotal(seats, ticketPrice) {
        return seats.length * ticketPrice;
    }

    function renderSummary() {
        if (!seatsContainer || !totalPriceDisplay || !proceedButton) return;

        seatsContainer.innerHTML = "";

        if (selectedSeats.length === 0) {
            seatsContainer.innerHTML = '<p class="text-muted mb-0" id="no-seats-text">No seats selected yet. Click on available seats to select.</p>';
            totalPriceDisplay.textContent = "0 ₸";
            proceedButton.disabled = true;
            return;
        }

        selectedSeats.forEach(function (seatCode) {
            const rowLetter = seatCode.charAt(0);
            const seatNum = seatCode.slice(1);

            const seatItem = document.createElement("div");
            seatItem.className = "selected-seat-item";

            const seatName = document.createElement("span");
            seatName.className = "seat-name";
            seatName.textContent = `Row ${rowLetter}, Seat ${seatNum}`;

            const seatCost = document.createElement("span");
            seatCost.className = "seat-cost";
            seatCost.textContent = `${TICKET_PRICE.toLocaleString("ru-RU")} ₸`;

            seatItem.appendChild(seatName);
            seatItem.appendChild(seatCost);
            seatsContainer.appendChild(seatItem);
        });

        const total = calculateTotal(selectedSeats, TICKET_PRICE);
        totalPriceDisplay.textContent = `${total.toLocaleString("ru-RU")} ₸`;
        proceedButton.disabled = false;
    }

    seatButtons.forEach(function (button) {
        let seatId = button.getAttribute("data-seat");
        if (!seatId) {
            const row = button.closest(".seat-row");
            const rowLabel = row ? row.querySelector(".row-label").textContent.trim() : "";
            seatId = rowLabel + button.textContent.trim();
            button.setAttribute("data-seat", seatId);
        }

        button.addEventListener("click", function () {
            const id = this.getAttribute("data-seat");

            if (selectedSeats.includes(id)) {
                selectedSeats = selectedSeats.filter(function (item) {
                    return item !== id;
                });
                this.classList.remove("selected");
            } else {
                selectedSeats.push(id);
                this.classList.add("selected");
            }

            renderSummary();
        });
    });

    if (proceedButton) {
        proceedButton.addEventListener("click", function () {
            if (selectedSeats.length === 0) {
                return;
            }

            const seatsParam = selectedSeats.join(",");
            const nextUrl = `checkout.html?movie=${encodeURIComponent(movieId)}&date=${encodeURIComponent(sessionDate)}&session=${encodeURIComponent(sessionId)}&seats=${encodeURIComponent(seatsParam)}`;
            window.location.href = nextUrl;
        });
    }
});