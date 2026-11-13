document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("movie");
    const sessionDate = params.get("date");
    const sessionId = params.get("session");
    const seatsParam = params.get("seats");

    const contentWrapper = document.getElementById("checkout-content-wrapper");
    const breadcrumbMovieLink = document.getElementById("breadcrumb-movie-link");

    const moviePoster = document.getElementById("checkout-poster");
    const movieTitle = document.getElementById("checkout-title");
    const movieMeta = document.getElementById("checkout-meta");
    const sessionInfo = document.getElementById("checkout-session");
    const seatsText = document.getElementById("checkout-seats-text");
    const ticketsLabel = document.getElementById("checkout-tickets-label");
    const subtotalText = document.getElementById("checkout-subtotal");
    const totalPriceText = document.getElementById("checkout-total-price");
    const submitBtn = document.getElementById("btn-submit-booking");

    const currentMovie = movies.find(function (item) {
        return item.id === movieId;
    });

    const currentSession = sessions.find(function (item) {
        return item.id === sessionId;
    });

    const rawSeats = seatsParam ? seatsParam.split(",") : [];
    const seatsList = rawSeats.filter(function (s) {
        return s.trim().length > 0;
    });

    if (!currentMovie || !currentSession || !sessionDate || seatsList.length === 0) {
        if (contentWrapper) {
            contentWrapper.innerHTML = `
                <div class="text-center py-5">
                    <h2 class="mb-3">Invalid Order Data</h2>
                    <p class="text-muted mb-4">No valid session or seats were selected. Please select your seats again.</p>
                    <a href="movies.html" class="btn btn-cinema d-inline-block px-4">Browse Movies</a>
                </div>
            `;
        }
        return;
    }

    document.title = `Cinema+ | Checkout - ${currentMovie.title}`;

    if (breadcrumbMovieLink) {
        breadcrumbMovieLink.textContent = currentMovie.title;
        breadcrumbMovieLink.href = `movie-details.html?movie=${currentMovie.id}`;
    }

    const previewBooking = new Booking(
        "PREVIEW",
        currentMovie.id,
        sessionDate,
        currentSession.id,
        seatsList,
        "Confirmed"
    );
    const totalAmount = previewBooking.calculateTotal();

    if (moviePoster) {
        moviePoster.src = `../assets/images/posters/${currentMovie.poster}`;
        moviePoster.alt = `${currentMovie.title} poster`;
    }

    if (movieTitle) movieTitle.textContent = currentMovie.title;
    if (movieMeta) movieMeta.textContent = `${currentMovie.genre} · ${currentMovie.duration} · ${currentSession.cinema}`;
    if (sessionInfo) sessionInfo.textContent = `${sessionDate} · ${currentSession.time} (${currentSession.format})`;

    if (seatsText) seatsText.textContent = seatsList.join(", ");
    if (ticketsLabel) ticketsLabel.textContent = `Tickets (${seatsList.length} x Standard)`;
    if (subtotalText) subtotalText.textContent = `${totalAmount.toLocaleString("ru-RU")} ₸`;
    if (totalPriceText) totalPriceText.textContent = `${totalAmount.toLocaleString("ru-RU")} ₸`;
    if (submitBtn) submitBtn.textContent = `Confirm Booking (${totalAmount.toLocaleString("ru-RU")} ₸)`;

    $("#toggle-order-details").on("click", function () {
        $("#extra-order-details").fadeToggle(300);
        const currentText = $(this).text().trim();
        if (currentText === "Show extra details") {
            $(this).text("Hide extra details");
        } else {
            $(this).text("Show extra details");
        }
    });

    const bookingForm = document.getElementById("booking-form");
    const nameInput = document.getElementById("full-name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const termsCheckbox = document.getElementById("agree-terms");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");
    const termsError = document.getElementById("terms-error");

    const successCard = document.getElementById("booking-success-card");
    const successText = document.getElementById("success-message-text");

    let isSubmitted = false;

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (isSubmitted) {
            return;
        }

        let isValid = true;

        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        termsError.textContent = "";

        const nameValue = nameInput.value.trim();
        if (nameValue.length < 2) {
            nameError.textContent = "Please enter your full name (at least 2 characters).";
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        const phoneValue = phoneInput.value.trim();
        const digitsOnly = phoneValue.replace(/\D/g, "");
        if (digitsOnly.length < 10) {
            phoneError.textContent = "Please enter a valid phone number (at least 10 digits).";
            isValid = false;
        }

        if (!termsCheckbox.checked) {
            termsError.textContent = "You must agree to the terms and conditions.";
            isValid = false;
        }

        if (isValid) {
            isSubmitted = true;

            const newBooking = new Booking(
                "BK-" + Date.now().toString().slice(-6),
                currentMovie.id,
                sessionDate,
                currentSession.id,
                seatsList,
                "Confirmed",
                nameValue,
                emailValue,
                phoneValue
            );

            addBooking(newBooking);

            bookingForm.style.display = "none";
            successCard.style.display = "block";
            successText.textContent = `Thank you, ${nameValue}! Booking #${newBooking.id} for ${seatsList.length} ticket(s) to "${currentMovie.title}" has been saved to My Tickets.`;
        }
    });
});