"use client"; // this component uses useState and useEffect, so it runs in the browser

// src/components/Menu.jsx
// The main grid. It now loads dishes from the API instead of a hardcoded array.
import { useState, useEffect } from "react";
import { categories } from "../data/menu"; // only the filter button names still come from here
import MenuItem from "./MenuItem";

function Menu() {
  // The dishes from the database. Starts empty until the fetch finishes
  const [items, setItems] = useState([]);
  // true while we wait for the API, so we can show a loading message
  const [loading, setLoading] = useState(true);
  // holds an error message if the API call fails
  const [error, setError] = useState("");

  // Which filter button is active. Starts on "All"
  const [activeCategory, setActiveCategory] = useState("All");
  // Ids of dishes the visitor has hearted
  const [favourites, setFavourites] = useState([]);

  // useEffect with [] runs once, right after the first render: it calls our API
  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch("/api/menu"); // GET request to our own API
        if (!response.ok) throw new Error("Request failed"); // 4xx/5xx counts as a failure
        const data = await response.json(); // turn the JSON text into a JavaScript array
        setItems(data); // store the dishes, React re-renders the grid
      } catch {
        setError("Sorry, we could not load the menu. Please refresh the page.");
      } finally {
        setLoading(false); // success or failure, we are no longer waiting
      }
    }
    loadMenu();
  }, []);

  // Adds the id if it's missing, removes it if it's there
  function toggleFavourite(id) {
    setFavourites((current) =>
      current.includes(id) ? current.filter((favId) => favId !== id) : [...current, id]
    );
  }

  // THE FILTER: now filters the dishes that came from the database
  const visibleItems =
    activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="mx-auto max-w-[70rem] px-5 py-12 md:py-16">
      <h2 className="mb-2 font-display text-3xl text-forest sm:text-4xl">The menu</h2>
      <p className="mb-6 max-w-xl">Cooked fresh each day. Ask us about allergens.</p>

      {/* Toolbar: filter buttons on the left, saved badge on the right */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter menu by course">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full border-2 border-forest px-4 py-2 font-semibold transition ${
                activeCategory === category
                  ? "bg-forest text-mist"
                  : "bg-transparent text-forest hover:bg-forest/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p
          aria-live="polite"
          className={`inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold transition ${
            favourites.length === 0 ? "bg-white text-ink/60" : "bg-plum text-mist"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={favourites.length === 0 ? "none" : "currentColor"}
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.5 3 5 6.4 5c2 0 3.7 1.1 5.6 3.2C13.9 6.1 15.6 5 17.6 5 21 5 22.8 8.5 21.5 11.8 19.5 16.4 12 21 12 21z" />
          </svg>
          {favourites.length === 0 ? "No favourites yet" : `${favourites.length} saved`}
        </p>
      </div>

      {/* Three possible states: loading, error, or the grid */}
      {loading ? (
        <p role="status">Loading the menu…</p>
      ) : error ? (
        <p role="alert" className="rounded-2xl bg-white p-6 text-plum">
          {error}
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isFavourite={favourites.includes(item.id)}
              onToggleFavourite={() => toggleFavourite(item.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default Menu;