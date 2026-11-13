const BOOKINGS_KEY = "cinemaplus_bookings";
const STANDARD_TICKET_PRICE = 2800;

class Booking {
    constructor(id, movie, date, session, seats, status, customerName, customerEmail, customerPhone) {
        this.id = id;
        this.movie = movie;
        this.date = date;
        this.session = session;
        this.seats = seats;
        this.status = status || "Confirmed";
        this.customerName = customerName || "";
        this.customerEmail = customerEmail || "";
        this.customerPhone = customerPhone || "";
    }

    calculateTotal() {
        return this.seats.length * STANDARD_TICKET_PRICE;
    }

    cancel() {
        this.status = "Cancelled";
    }
}

function getBookings() {
    try {
        const raw = localStorage.getItem(BOOKINGS_KEY);
        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            localStorage.removeItem(BOOKINGS_KEY);
            return [];
        }

        return parsed
            .filter(function (item) {
                return item && typeof item === "object" && typeof item.movie === "string" && Array.isArray(item.seats);
            })
            .map(function (item) {
                return new Booking(
                    item.id || String(Date.now()),
                    item.movie,
                    item.date || "",
                    item.session || "",
                    item.seats,
                    item.status || "Confirmed",
                    item.customerName || "",
                    item.customerEmail || "",
                    item.customerPhone || ""
                );
            });
    } catch (error) {
        try {
            localStorage.removeItem(BOOKINGS_KEY);
        } catch (e) {
        }
        return [];
    }
}

function saveBookings(bookingsList) {
    try {
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookingsList));
    } catch (error) {
    }
}

function addBooking(bookingObject) {
    const existing = getBookings();
    existing.unshift(bookingObject);
    saveBookings(existing);
}