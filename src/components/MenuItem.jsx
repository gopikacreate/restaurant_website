// src/components/MenuItem.jsx
// One dish. It only displays what it is given (props), so one component serves every dish.
import FavouriteToggle from "./FavouriteToggle";
import QuantityStepper from "./QuantityStepper";

// Top border colour per category
const borderColours = {
  Starters: "border-forest",
  Mains: "border-butter",
  Desserts: "border-plum",
};

function MenuItem({ item, isFavourite, onToggleFavourite, quantity, onQuantityChange }) {
  return (
    <li className={`flex items-center gap-4 rounded-b-2xl border-t-8 bg-white p-4 ${borderColours[item.category]}`}>
      <img
        src={item.image}
        alt={item.alt}
        width="160"
        height="160"
        loading="lazy"
        className="h-16 w-16 shrink-0 rounded-full bg-forest-soft object-cover"
      />

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg leading-snug">{item.name}</h3>
        <p className="text-sm text-ink/70">{item.description}</p>
        <p className="mt-1 font-semibold text-plum">£{item.price}</p>

        {/* Not in the order yet: show a button. Already in the order: show the stepper */}
        <div className="mt-2">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => onQuantityChange(1)}
              aria-label={`Add ${item.name} to your order`}
              className="rounded-full bg-forest px-4 py-1.5 text-sm font-semibold text-mist transition hover:-translate-y-0.5"
            >
              Add to order
            </button>
          ) : (
            <QuantityStepper value={quantity} onChange={onQuantityChange} dishName={item.name} />
          )}
        </div>
      </div>

      <FavouriteToggle isFavourite={isFavourite} onToggle={onToggleFavourite} dishName={item.name} />
    </li>
  );
}

export default MenuItem;