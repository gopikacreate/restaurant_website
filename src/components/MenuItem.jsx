// src/components/MenuItem.jsx
// One dish. It only displays what it is given (props), so one component serves all 9 dishes.
import FavouriteToggle from "./FavouriteToggle";
import OrderButton from "./OrderButton";

// Top border colour per category, same look as the old course cards
const borderColours = {
  Starters: "border-forest",
  Mains: "border-butter",
  Desserts: "border-plum",
};

function MenuItem({ item, isFavourite, onToggleFavourite }) {
  return (
    // Card: white, coloured top border from the lookup above
    <li className={`flex items-center gap-4 rounded-b-2xl border-t-8 bg-white p-4 ${borderColours[item.category]}`}>
      {/* Round dish photo. width/height stop the page jumping while it loads */}
      <img
        src={item.image}
        alt={item.alt}
        width="160"
        height="160"
        loading="lazy"
        className="h-16 w-16 shrink-0 rounded-full bg-forest-soft object-cover"
      />

      {/* Text takes the free space; min-w-0 lets it shrink so nothing overflows on phones */}
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg leading-snug">{item.name}</h3>
        <p className="text-sm text-ink/70">{item.description}</p>
        <p className="mt-1 font-semibold text-plum">£{item.price}</p>
        <OrderButton menuItemId={item.id} dishName={item.name} />
      </div>

      {/* The reusable toggle: value and function both come from the parent */}
      <FavouriteToggle isFavourite={isFavourite} onToggle={onToggleFavourite} dishName={item.name} />
    </li>
  );
}

export default MenuItem;