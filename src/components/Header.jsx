// src/components/Header.jsx
// The sticky top bar: logo on the left, links and the Reserve button on the right.

// Nav links as data, so the list below is mapped instead of copy-pasted
const navLinks = [
  { label: "Menu", href: "#menu" },   // jumps to the menu section
  { label: "About", href: "#about" }, // jumps to the about section
  { label: "Hours", href: "#visit" }, // jumps to the footer
];

function Header() {
  return (
    // sticky top-0 = stays at the top while scrolling; z-10 keeps it above the page; dark green bar
    <header className="sticky top-0 z-10 bg-forest text-mist">
      {/* flex = row layout; flex-wrap = wraps on tiny screens; mx-auto + max-w centres it at 70rem */}
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[70rem] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3"
      >
        {/* Logo: smaller on phones (unprefixed), bigger from the sm breakpoint up */}
        <a href="#top" className="font-display text-xl sm:text-2xl">
          Caffè Marlena
        </a>

        {/* Links row: wraps instead of overflowing on narrow phones */}
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {/* One <li> per item in navLinks; key helps React track each item */}
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="decoration-butter underline-offset-[6px] hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* Reserve button: pill shape, lifts and shows a plum shadow on hover */}
          <li>
            <a
              href="#reserve"
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