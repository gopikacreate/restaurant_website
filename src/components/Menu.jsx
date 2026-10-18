// src/components/Menu.jsx
// The main grid. Holds two pieces of state: the chosen category and the list of favourites.
import { useState } from "react";
import { menuItems, categories } from "../data/menu";
import MenuItem from "./MenuItem";

function Menu() {
  // Which filter button is active. Starts on "All"
  const [activeCategory, setActiveCategory] = useState("All");

  // Ids of dishes the visitor has hearted, e.g. [2, 7]. Lives here so the count stays in sync
  const [favourites, setFavourites] = useState([]);

  // Adds the id if it's missing, removes it if it's there
  function toggleFavourite(id) {
    setFavourites((current) =>
      current.includes(id) ? current.filter((favId) => favId !== id) : [...current, id]
    );
  }

  // THE FILTER: keep every dish for "All", otherwise only dishes whose category matches
  const visibleItems =
    activeCategory === "All" ? menuItems : menuItems.filter((item) => item.category === activeCategory);

  return (
    // id="menu" is the target of the "Menu" link in the header
    <section id="menu" className="mx-auto max-w-[70rem] px-5 py-12 md:py-16">
      <h2 className="mb-2 font-display text-3xl text-forest sm:text-4xl">The menu</h2>
      <p className="mb-6 max-w-xl">Cooked fresh each day. Ask us about allergens.</p>

      {/* Filter buttons, one per entry in the categories array. flex-wrap stops them overflowing on phones */}
      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Filter menu by course">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)} // changes the state, React re-renders the list
            aria-pressed={activeCategory === category}
            className={`rounded-full border-2 border-forest px-4 py-2 font-semibold transition ${
              activeCategory === category
                ? "bg-forest text-mist" // active button: dark
                : "bg-transparent text-forest hover:bg-forest/10" // inactive: outline
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Count of favourites. aria-live announces changes to screen readers */}
     {/* Toolbar: filter buttons on the left, saved badge on the right.
    Phone: stacked (flex-col). sm and up: one row (sm:flex-row) with space between */}
<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  {/* Filter buttons, one per entry in the categories array */}
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

  {/* Saved badge: a pill with a heart and a count. aria-live announces changes to screen readers.
      self-start keeps it from stretching full width on phones */}
  <p
    aria-live="polite"
    className={`inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold transition ${
      favourites.length === 0
        ? "bg-white text-ink/60" // empty: quiet white pill
        : "bg-plum text-mist" // has favourites: wine pill stands out
    }`}
  >
    {/* Heart icon: filled once something is saved */}
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

      {/* Grid: 1 column on phones (default), 2 from md, 3 from lg */}
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
    </section>
  );
}

export default Menu;