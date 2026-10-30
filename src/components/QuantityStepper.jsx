// src/components/QuantityStepper.jsx
// A − 2 + control. It is "controlled": it keeps no state, the parent passes the value and an onChange function.

function QuantityStepper({ value, onChange, min = 0, max = 10, dishName }) {
  return (
    <div
      role="group"
      aria-label={`Quantity of ${dishName}`}
      className="inline-flex items-center gap-2 rounded-full border-2 border-forest px-1 py-0.5"
    >
      {/* Minus: disabled at the minimum */}
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Remove one ${dishName}`}
        className="grid h-7 w-7 place-items-center rounded-full font-bold text-forest hover:bg-forest/10 disabled:opacity-40"
      >
        −
      </button>

      {/* Current number. aria-live announces changes to screen readers */}
      <span className="min-w-6 text-center font-semibold" aria-live="polite">
        {value}
      </span>

      {/* Plus: disabled at the maximum (the server also allows at most 10 per dish) */}
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Add one more ${dishName}`}
        className="grid h-7 w-7 place-items-center rounded-full font-bold text-forest hover:bg-forest/10 disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}

export default QuantityStepper;