"use client"; // uses useState and talks to the auth API from the browser

// src/components/AuthForm.jsx
// One form that switches between "Sign in" and "Create account".
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function AuthForm() {
  const router = useRouter(); // lets us move to another page in code
  const [mode, setMode] = useState("signin"); // "signin" or "signup"
  const [error, setError] = useState(""); // message if something goes wrong
  const [loading, setLoading] = useState(false); // disables the button while waiting

  async function handleSubmit(event) {
    event.preventDefault(); // stop the page reloading
    setError("");
    setLoading(true);

    // Read the typed values (before any await)
    const form = new FormData(event.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const name = form.get("name");

    // Call the right API function. Each returns { data, error }
    const result =
      mode === "signup"
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

    setLoading(false);

    if (result.error) {
      setError(result.error.message || "Something went wrong. Please try again.");
      return;
    }

    router.push("/"); // success: go to the home page
    router.refresh(); // reload server data so the page knows we're signed in
  }

  // Shared look for the inputs
  const inputClass =
    "h-12 w-full rounded-[0.6rem] border-2 border-transparent bg-white px-3 text-ink focus:border-butter focus:ring-2 focus:ring-butter focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid max-w-md gap-4 rounded-2xl bg-forest p-6 text-mist">
      <h1 className="font-display text-3xl text-butter">{mode === "signup" ? "Create account" : "Sign in"}</h1>

      {/* The name field only appears when creating an account */}
      {mode === "signup" && (
        <label className="grid gap-1 font-semibold">
          Name
          <input name="name" type="text" required autoComplete="name" className={inputClass} />
        </label>
      )}

      <label className="grid gap-1 font-semibold">
        Email
        <input name="email" type="email" required autoComplete="email" className={inputClass} />
      </label>

      <label className="grid gap-1 font-semibold">
        Password
        <input
          name="password"
          type="password"
          required
          minLength={8} // Better Auth requires at least 8 characters
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          className={inputClass}
        />
      </label>

      {/* Error message, announced to screen readers */}
      {error && (
        <p role="alert" className="rounded-lg bg-plum px-3 py-2 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="h-12 rounded-full bg-butter font-semibold text-forest transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
      </button>

      {/* Switch between the two modes */}
      <button
        type="button"
        onClick={() => {
          setMode(mode === "signup" ? "signin" : "signup");
          setError("");
        }}
        className="text-sm underline"
      >
        {mode === "signup" ? "Already have an account? Sign in" : "New here? Create an account"}
      </button>
    </form>
  );
}

export default AuthForm;