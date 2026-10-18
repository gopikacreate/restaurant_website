# Caffè Marlena

A single-page restaurant website rebuilt with React and Tailwind CSS. It started as a plain HTML and CSS project.

## Run it

    npm install
    npm run dev

## Built with

- Vite + React (JavaScript)
- Tailwind CSS v4

## Structure

- `src/components/` Header, Hero, Menu, MenuItem, FavouriteToggle, About, Reservation, Footer
- `src/data/menu.js` all menu items in one array
- `src/index.css` Tailwind import and theme (colours, fonts, animations)

## Features

- Menu filter by course (All, Starters, Mains, Desserts) using `useState`
- Favourite toggle on every dish, a controlled component reused per item
- Mobile-first responsive layout with no horizontal scroll
- Reservation form with a thank-you message

## Note

The reservation form does not send data anywhere, and the restaurant details and photos are placeholders.