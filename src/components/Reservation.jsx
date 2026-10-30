"use client"; // uses useState and talks to the API from the browser

// src/components/Reservation.jsx
// The booking form. It now saves the booking through /api/reservations.
import { useState } from "react";
import { useRouter } from "next/navigation";

// One object per form field, so the JSX isn't copy-pasted five times
const fields = [
  { label: "Name", name: "name", type: "text", autoComplete: "name" },
  { label: "Email", name: "email", type: "email", autoComplete: "email" },
  { label: "Date", name: "date", type: "date" },
  { label: "Time", name: "time", type: "time", min: "09:00", max: "22:00" },
  { label: "Guests", name: "guests", type: "number", min: 1, max: 12, defaultValue: 2 },
];

function Reservation() {
  const router = useRouter();
  const [saved, setSaved] = useState(null); // the saved reservation, or null while the form is showing
  const [error, setError] = useState(""); // message if something goes wrong
  const [loading, setLoading] = useState(false); // disables the button while we wait

  async function handleSubmit(event) {
    event.preventDefault(); // stop the page reloading
    setError("");

    // Read the typed values before any await
    const values = Object.fromEntries(new FormData(event.currentTarget));

    setLoading(true);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.status === 401) {
        router.push("/login"); // not signed in: go and sign in first
        return;
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setSaved(data); // success: show the confirmation
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="reserve" className="mx-auto max-w-[70rem] px-5 py-12 md:py-16">
      <h2 className="mb-2 font-display text-3xl text-forest sm:text-4xl">Reserve your table</h2>
      <p className="mb-6 max-w-xl">Tell us when you are coming. You need to be signed in to book.</p>

      {saved ? (
        // Confirmation, using the details the server actually saved
        <div role="status" className="rounded-2xl bg-forest p-6 text-mist">
          <p className="mb-1 font-display text-2xl text-butter">Table booked</p>
          <p className="mb-4">
            Thank you, {saved.name}! We have a table for {saved.guests} on {saved.date} at {saved.time.slice(0, 5)}.
          </p>
          <button
            type="button"
            onClick={() => setSaved(null)}
            className="rounded-full bg-butter px-5 py-2 font-semibold text-forest"
          >
            Make another booking
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 items-end gap-4 rounded-2xl bg-forest p-6 text-mist sm:grid-cols-2 lg:grid-cols-3"
        >
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
            disabled={loading}
            className="h-12 rounded-full bg-butter font-semibold text-forest transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Please wait…" : "Book a table"}
          </button>

          {/* Error message, announced to screen readers, spans the whole form width */}
          {error && (
            <p role="alert" className="rounded-lg bg-plum px-3 py-2 text-sm sm:col-span-2 lg:col-span-3">
              {error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}

export default Reservation;