// src/components/Reservation.jsx
// The booking form. Fields come from an array, so the JSX isn't copy-pasted five times.
import { useState } from "react";

// One object per form field: label text, input name, input type, and any extra attributes
const fields = [
  { label: "Name", name: "name", type: "text", autoComplete: "name" },
  { label: "Email", name: "email", type: "email", autoComplete: "email" },
  { label: "Date", name: "date", type: "date" },
  { label: "Time", name: "time", type: "time", min: "09:00", max: "22:00" },
  { label: "Guests", name: "guests", type: "number", min: 1, max: 12, defaultValue: 2 },
];

function Reservation() {
  // Remembers whether the form was sent, so we can show a thank-you message
  const [sent, setSent] = useState(false);

  // Stops the page from reloading and shows the message (no real backend yet)
  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    // id="reserve" is the target of every "Reserve" and "Book a table" button
    <section id="reserve" className="mx-auto max-w-[70rem] px-5 py-12 md:py-16">
      <h2 className="mb-2 font-display text-3xl text-forest sm:text-4xl">Reserve your table</h2>
      <p className="mb-6 max-w-xl">Tell us when you are coming and we will confirm by email.</p>

      {sent ? (
        // Thank-you card shown after submitting
        <p className="rounded-2xl bg-forest p-6 text-lg text-mist">
          Thank you! We have your request and will confirm by email soon.
        </p>
      ) : (
        // Grid: 1 column on phones, 2 from sm, 3 from lg
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 items-end gap-4 rounded-2xl bg-forest p-6 text-mist sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* One label + input per item in the fields array */}
          {fields.map(({ label, name, ...inputProps }) => (
            <label key={name} className="grid gap-1 font-semibold">
              {label}
              <input
                name={name}
                required
                {...inputProps}
                className="h-12 w-full rounded-[0.6rem] border-2 border-transparent bg-white px-3 text-ink focus:border-butter focus:ring-2 focus:ring-butter focus:outline-none"
              />
            </label>
          ))}

          <button
            type="submit"
            className="h-12 rounded-full bg-butter font-semibold text-forest transition hover:-translate-y-0.5"
          >
            Book a table
          </button>
        </form>
      )}
    </section>
  );
}

export default Reservation;