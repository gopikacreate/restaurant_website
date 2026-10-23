"use client"; // reads the login session in the browser

// src/components/Header.jsx
// Sticky top bar: logo, links, sign in / sign out, and the Reserve button.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// "/#menu" works from any page, not just the home page
const navLinks = [
  { label: "Menu", href: "/#menu" },
  { label: "About", href: "/#about" },
  { label: "Hours", href: "/#visit" },
];

function Header() {
  const router = useRouter();
  // session is null when signed out. isPending is true while the browser checks
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut(); // deletes the session on the server and in the cookie
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-10 bg-forest text-mist">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[70rem] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3"
      >
        <a href="/" className="font-display text-xl sm:text-2xl">
          Caffè Marlena
        </a>

        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="decoration-butter underline-offset-[6px] hover:underline">
                {link.label}
              </a>
            </li>
          ))}

          {/* Sign in / Sign out. Nothing is shown while the session is still loading, so it doesn't flicker */}
          {!isPending &&
            (session ? (
              <>
                <li className="text-sm text-mist/80">Hi, {session.user.name}</li>
                <li>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="decoration-butter underline-offset-[6px] hover:underline"
                  >
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/login" className="decoration-butter underline-offset-[6px] hover:underline">
                  Sign in
                </Link>
              </li>
            ))}

          <li>
            <a
              href="/#reserve"
              className="inline-block rounded-full bg-butter px-4 py-2 font-semibold text-forest transition hover:-translate-y-0.5 hover:shadow-[0_6px_0_var(--color-plum)]"
            >
              Reserve
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;