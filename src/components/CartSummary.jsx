"use client"; // uses useState and talks to the API from the browser

// src/components/CartSummary.jsx
// The sticky "Your order" panel: lists the chosen dishes, shows a total, and starts checkout.
import { useState } from "react";
import { useRouter } from "next/navigation";

function CartSummary({ items, cart, onChange }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // true while we wait for the server
  const [error, setError] = useState(""); // message if something goes wrong

  // The dishes that are in the cart, each with its quantity
  const lines = items
    .filter((item) => cart[item.id] > 0)
    .map((item) => ({ item, quantity: cart[item.id] }));

  if (lines.length === 0) return null; // empty cart: show nothing

  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  // This total is only for display. The server works out the real total from the database
  const total = lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      // We send only dish ids and quantities, never prices
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((line) => ({ menuItemId: line.item.id, quantity: line.quantity })),
        }),
      });

      if (response.status === 401) {
        router.push("/login"); // not signed in: go and sign in first
        return;
      }

      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || "Something went wrong");

      window.location.href = data.url; // leave our site and go to Stripe's payment page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    // sticky bottom-4: floats at the bottom of the screen while you browse the menu
    <aside
      aria-label="Your order"
      className="sticky bottom-4 z-10 mt-8 rounded-2xl bg-forest p-4 text-mist shadow-lg"
    >
      <h3 className="mb-2 font-display text-xl text-butter">Your order ({count})</h3>

      {/* Scrolls inside the panel if there are many dishes, so it never covers the whole phone screen */}
      <ul className="max-h-32 overflow-y-auto">
        {lines.map(({ item, quantity }) => (
          <li key={item.id} className="flex justify-between gap-3 border-b border-dashed border-forest-soft py-1 text-sm">
            <span className="min-w-0 truncate">
              {quantity} × {item.name}
            </span>
            <span>£{(item.price * quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="font-semibold">Total: £{total.toFixed(2)}</p>
        <div className="flex gap-2">
          {/* Empty the whole cart */}
          <button
            type="button"
            onClick={() => lines.forEach((line) => onChange(line.item.id, 0))}
            className="rounded-full border-2 border-mist/50 px-4 py-2 text-sm font-semibold"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="rounded-full bg-butter px-5 py-2 font-semibold text-forest transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Please wait…" : "Checkout"}
          </button>
        </div>
      </div>

      {/* Error message, announced to screen readers */}
      {error && (
        <p role="alert" className="mt-2 rounded-lg bg-plum px-3 py-2 text-sm">
          {error}
        </p>
      )}
    </aside>
  );
}

export default CartSummary;