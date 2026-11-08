# Cinema+ — Cinema Ticketing Platform

A responsive, multi-page website created for the Web Technologies project. Cinema+ presents movies and a demo ticket-booking process. The endterm version extends our midterm website with JavaScript and jQuery features.

**Team:** Kudaibergen Temirlan and Serikov Sunggat.

## Pages

- Home
- Movies
- Movie Details
- Seat Selection
- Checkout

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

## How to Open

Open `cinema-ticketing/index.html` in a browser or use VS Code Live Server. No installation is required. An internet connection is needed to load jQuery.

## How to Test

1. Search for a movie from Home, try the genre filter, and click Reset.
2. Open a movie, choose a date and session, and proceed to seat selection.
3. Select two available seats and check that the total is 5,600 ₸. Deselect a seat and check that the total updates. Occupied seats should remain unavailable.
4. Proceed to checkout and submit an empty form to see validation errors. Enter a name with at least two characters, a valid email, a phone number with at least ten digits, and accept the terms to see the demo confirmation.
5. Click FAQ questions on Home and the Show extra details button on Checkout to check the jQuery effects.

## Demo Limitations

Movies, sessions, and occupied seats use predefined data. Booking confirmation is simulated in the browser. No real reservations, payments, or emails are processed. Accounts and saved booking history are unavailable.
