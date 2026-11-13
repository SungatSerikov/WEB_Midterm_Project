# Cinema+ — Cinema Ticketing Platform

A responsive, multi-page website created for the Web Technologies project. Cinema+ presents movies and a demo ticket-booking process. The final version continues our midterm and endterm project with an external API, object-oriented JavaScript, and persistent browser storage.

**Team:** Kudaibergen Temirlan and Serikov Sunggat.

**Repository:** [WEB_Midterm_Project](https://github.com/SungatSerikov/WEB_Midterm_Project). The final version is on the `Final` branch.

## Contributions

- Serikov Sunggat: Home, Movies, Movie Details, API movie picks, favorites, sorting, and duration filtering.
- Kudaibergen Temirlan: Seat Selection, Checkout, the Booking class, My Tickets, and the light/dark theme.

## Pages

- Home
- Movies
- Movie Details
- Seat Selection
- Checkout
- My Tickets

## Features

- Shared navigation and a minimalist design.
- Semantic HTML, movie posters, a movie information table, and forms.
- CSS Flexbox, Grid, and positioning.
- Responsive layouts with tablet and mobile media queries.
- Local Bootstrap files, grid system, and utility classes.

## Endterm Features

- Movie cards and details generated from a shared JavaScript array.
- Live movie search, genre filtering, and filter reset.
- Movie, date, session, and selected seats passed through URL parameters.
- Interactive seat selection and automatic total calculation at 2,800 ₸ per ticket.
- Customer form validation with field-specific errors and a demo confirmation.
- Expandable FAQ answers and order details using jQuery effects.

## Final Features

- API movie picks on Home using fetch and Promises, with loading, success, empty, and error states and a retry button.
- Favorite movies saved in localStorage, with add/remove buttons, a Favorites only filter, and Clear favorites.
- My Tickets with saved bookings and cancellation. The Booking class has a constructor, properties, calculateTotal(), and cancel(); saved records are restored as Booking objects.
- Movie sorting by title or duration and maximum-duration filtering, combined with search, genre, and favorites.
- A light/dark theme available across all pages, with the preference saved in localStorage.

## API Information

Home uses the public [Studio Ghibli films API](https://ghibliapi.vercel.app/films). No API key is required. The first four films are displayed with their posters, titles, release years, running times, directors, and descriptions. These are discovery picks; booking uses our predefined movie catalogue.

## How to Open

Download or clone the repository and select the `Final` branch. Open the folder in VS Code and use Live Server to open `cinema-ticketing/index.html`. No build step or package installation is required. An internet connection is needed for the API, remote posters, and jQuery. Use the same browser and site address/port to keep access to saved data.

## How to Test

1. Open Home and check that four Animation Picks load. Block the API request in browser DevTools to check the error message, then unblock it and click Try again.
2. Search from Home, combine genre and duration filters, try each sort order, and click Reset.
3. Add favorites in the catalogue and on Movie Details. Reload, use Favorites only, and try removing a movie and Clear favorites. Reset should keep saved favorites.
4. Choose a movie, date, and session. Select two available seats and check the total is 5,600 ₸. Deselect one and check the total updates. Occupied seats remain unavailable.
5. Submit an empty checkout form to see errors. Enter a name with at least two characters, a valid email, a phone with at least ten digits, and accept the terms to confirm.
6. Create two bookings, open My Tickets, and reload. Cancel one booking and reload again to check its saved Cancelled status.
7. Switch the theme, navigate to another page, and reload to check that the preference is kept.
8. Check FAQ and extra order details for jQuery effects, and try the pages at mobile and desktop widths.

## Demo Limitations

Bookable movies, sessions, and occupied seats use predefined data. Bookings, favorites, and theme preferences are stored only in this browser; clearing site data removes them. Booking and cancellation are demonstrations and do not reserve or release real seats. No accounts, payments, or emails are provided.
