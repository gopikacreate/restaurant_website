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
      <p className="mb-6 text-sm text-ink/70" aria-live="polite">
        {favourites.length === 0 ? "Tap a heart to save a dish." : `${favourites.length} dish(es) saved`}
      </p>

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