"use client"; // uses useState and useEffect

// src/components/OrderStatus.jsx
// Shows whether an order is paid. It re-checks a few times in case the webhook is a moment late.
import { useEffect, useState } from "react";
import Link from "next/link";

const MAX_TRIES = 8; // how many times we ask
const WAIT_MS = 1500; // pause between asks

function formatPrice(pence) {
  return `£${(pence / 100).toFixed(2)}`; // 900 becomes £9.00
}

function OrderStatus({ orderId }) {
  const [order, setOrder] = useState(null); // the order from the API
  const [state, setState] = useState("loading"); // loading, paid, waiting or error

  useEffect(() => {
    let cancelled = false; // stops updates if the visitor leaves the page

    async function check(attempt) {
      try {
        const response = await fetch(`/api/orders?id=${orderId}`);
        if (!response.ok) throw new Error("Order not found");
        const data = await response.json();
        if (cancelled) return;
        setOrder(data);

        if (data.status === "paid") {
          setState("paid"); // the webhook has done its job
        } else if (attempt >= MAX_TRIES) {
          setState("waiting"); // still pending after all tries
        } else {
          setTimeout(() => check(attempt + 1), WAIT_MS); // ask again shortly
        }
      } catch {
        if (!cancelled) setState("error");
      }
    }

    check(1);
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-forest p-6 text-mist" aria-live="polite">
      {state === "loading" && <p>Checking your payment…</p>}

      {state === "error" && (
        <>
          <h1 className="mb-2 font-display text-3xl text-butter">Order not found</h1>
          <p>We could not find that order. Make sure you are signed in with the account that placed it.</p>
        </>
      )}

      {state === "waiting" && (
        <>
          <h1 className="mb-2 font-display text-3xl text-butter">Payment pending</h1>
          <p>We have not had confirmation from Stripe yet. Please refresh this page in a minute.</p>
        </>
      )}

      {state === "paid" && order && (
        <>
          <h1 className="mb-2 font-display text-3xl text-butter">Payment received</h1>
          <p className="mb-4">Thank you! Order #{order.id} is paid.</p>
          <ul className="mb-4">
            {order.items.map((item, index) => (
              <li key={index} className="flex justify-between gap-4 border-b border-dashed border-forest-soft py-1">
                <span>
                  {item.quantity} × {item.name}
                </span>
                <span>{formatPrice(item.unitAmount * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="font-semibold">Total: {formatPrice(order.totalAmount)}</p>
        </>
      )}

      <Link href="/" className="mt-6 inline-block rounded-full bg-butter px-5 py-2 font-semibold text-forest">
        Back to the menu
      </Link>
    </div>
  );
}

export default OrderStatus;