"use client"; // uses useState and talks to the API from the browser

// src/components/OrderButton.jsx
// "Order now" for one dish. It asks our server to start a Stripe checkout, then sends the visitor to Stripe.
import { useState } from "react";
import { useRouter } from "next/navigation";

function OrderButton({ menuItemId, dishName }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // true while we wait for the server
  const [error, setError] = useState(""); // message if something goes wrong

  async function handleOrder() {
    setLoading(true);
    setError("");
    try {
      // We send only the dish id and a quantity. The server looks up the real price itself
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ menuItemId, quantity: 1 }] }),
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
    <div className="mt-2">
      <button
        type="button"
        onClick={handleOrder}
        disabled={loading}
        aria-label={`Order ${dishName} now`}
        className="rounded-full bg-forest px-4 py-1.5 text-sm font-semibold text-mist transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {loading ? "Please wait…" : "Order now"}
      </button>
      {/* Error message, announced to screen readers */}
      {error && (
        <p role="alert" className="mt-1 text-sm text-plum">
          {error}
        </p>
      )}
    </div>
  );
}

export default OrderButton;