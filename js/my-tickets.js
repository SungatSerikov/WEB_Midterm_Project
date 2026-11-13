document.addEventListener("DOMContentLoaded", function () {
    const ticketsListContainer = document.getElementById("tickets-list");

    function renderTickets() {
        const bookings = getBookings();
        ticketsListContainer.innerHTML = "";

        if (bookings.length === 0) {
            ticketsListContainer.innerHTML = `
                <div class="col-12">
                    <div class="empty-tickets-box">
                        <h2 class="h4 mb-2">No tickets booked yet</h2>
                        <p class="text-muted mb-4">Choose a movie, pick your seats, and confirm a booking to see your tickets here.</p>
                        <a href="movies.html" class="btn btn-cinema d-inline-block px-4">Browse Movies</a>
                    </div>
                </div>
            `;
            return;
        }

        bookings.forEach(function (booking) {
            const movieObj = movies.find(function (m) {
                return m.id === booking.movie;
            });

            const sessionObj = sessions.find(function (s) {
                return s.id === booking.session;
            });

            const titleText = movieObj ? movieObj.title : booking.movie;
            const posterSrc = movieObj ? `../assets/images/posters/${movieObj.poster}` : "../assets/images/posters/dune-part-two.jpg";
            const cinemaText = sessionObj ? sessionObj.cinema : "Cinema+";
            const timeText = sessionObj ? `${sessionObj.time} (${sessionObj.format})` : booking.session;

            const isCancelled = booking.status === "Cancelled";
            const statusClass = isCancelled ? "ticket-status status-cancelled" : "ticket-status status-confirmed";

            const col = document.createElement("div");
            col.className = "col-12 col-md-6";

            col.innerHTML = `
                <article class="ticket-card">
                    <div class="ticket-card-top">
                        <img class="ticket-poster" src="${posterSrc}" alt="${titleText} poster">
                        <div>
                            <span class="ticket-id">Booking #${booking.id}</span>
                            <h2 class="ticket-title">${titleText}</h2>
                            <span class="${statusClass}">${booking.status}</span>
                        </div>
                    </div>

                    <div class="ticket-details">
                        <div class="ticket-row">
                            <span class="ticket-label">Cinema</span>
                            <span class="ticket-value">${cinemaText}</span>
                        </div>
                        <div class="ticket-row">
                            <span class="ticket-label">Date &amp; Time</span>
                            <span class="ticket-value">${booking.date} · ${timeText}</span>
                        </div>
                        <div class="ticket-row">
                            <span class="ticket-label">Seats (${booking.seats.length})</span>
                            <span class="ticket-value">${booking.seats.join(", ")}</span>
                        </div>
                        <div class="ticket-row">
                            <span class="ticket-label">Guest</span>
                            <span class="ticket-value">${booking.customerName || "Guest"}</span>
                        </div>
                    </div>

                    <div class="ticket-footer">
                        <span class="ticket-total">${booking.calculateTotal().toLocaleString("ru-RU")} ₸</span>
                        <button type="button" class="btn btn-cinema-outline btn-sm cancel-ticket-btn" data-booking-id="${booking.id}" ${isCancelled ? "disabled" : ""}>
                            ${isCancelled ? "Cancelled" : "Cancel Booking"}
                        </button>
                    </div>
                </article>
            `;

            ticketsListContainer.appendChild(col);
        });
    }

    ticketsListContainer.addEventListener("click", function (event) {
        const cancelBtn = event.target.closest(".cancel-ticket-btn");
        if (!cancelBtn) {
            return;
        }

        const bookingId = cancelBtn.getAttribute("data-booking-id");
        const bookings = getBookings();

        const targetBooking = bookings.find(function (b) {
            return b.id === bookingId;
        });

        if (targetBooking && targetBooking.status !== "Cancelled") {
            targetBooking.cancel();
            saveBookings(bookings);
            renderTickets();
        }
    });

    renderTickets();
});