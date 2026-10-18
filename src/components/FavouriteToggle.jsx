// src/components/FavouriteToggle.jsx
// A heart button. It is "controlled": it keeps no state of its own.
// The parent passes in the current value (isFavourite) and a function to call on click (onToggle).

function FavouriteToggle({ isFavourite, onToggle, dishName }) {
  return (
    <button
      type="button" // so it never submits a form
      onClick={onToggle} // tells the parent "the heart was clicked"
      aria-pressed={isFavourite} // screen readers announce on/off
      aria-label={`${isFavourite ? "Remove" : "Save"} ${dishName} ${isFavourite ? "from" : "to"} favourites`} // describes the action
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-plum transition hover:scale-110 hover:bg-mist"
    >
      {/* Heart drawn with SVG. Filled when saved, outline only when not */}
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill={isFavourite ? "currentColor" : "none"} // the visible on/off change
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.5 3 5 6.4 5c2 0 3.7 1.1 5.6 3.2C13.9 6.1 15.6 5 17.6 5 21 5 22.8 8.5 21.5 11.8 19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  );
}

export default FavouriteToggle;