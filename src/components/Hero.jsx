// src/components/Hero.jsx
// The first thing visitors see: the one h1, the main call to action and the CSS-drawn steaming cup.

// Three steam wisps. Each has its own delay and height so they don't move in sync.
const steam = [
  { delay: "0s", height: "100%" },
  { delay: "1s", height: "80%" },
  { delay: "2s", height: "100%" },
];

function Hero() {
  return (
    // Phone: stacked (flex-col). md and up: text and cup side by side (md:flex-row), taller hero
    <section className="mx-auto flex max-w-[70rem] flex-col items-center gap-10 px-5 py-8 md:min-h-[75vh] md:flex-row md:justify-between md:py-16">
      {/* Left side: the words. animate-rise fades the text in once on page load */}
      <div className="w-full animate-rise motion-reduce:animate-none md:max-w-[34rem]">
        {/* The ONE h1 on the whole page. Text grows at each breakpoint */}
        <h1 className="mb-4 font-display text-4xl leading-tight text-forest sm:text-5xl lg:text-6xl">
          Slow coffee, handmade pasta, a table saved for you.
        </h1>
        <p className="mb-4 text-lg">
          A small Italian café and kitchen in the middle of town. Come for an espresso, stay for dinner.
        </p>
        {/* Main call to action */}
        <a
          href="#reserve"
          className="inline-block rounded-full bg-butter px-6 py-3 font-semibold text-forest transition hover:-translate-y-0.5 hover:shadow-[0_8px_0_var(--color-plum)]"
        >
          Book a table
        </a>
      </div>

      {/* Right side: the drawing. aria-hidden because it is decoration only. pr-10 leaves room for the handle on phones */}
      <div aria-hidden="true" className="flex flex-col items-center pr-10 sm:pr-0">
        {/* Steam wisps, one <span> per item in the steam array */}
        <div className="mb-2 flex h-20 gap-5">
          {steam.map((wisp, index) => (
            <span
              key={index}
              style={{ animationDelay: wisp.delay, height: wisp.height }}
              className="w-[0.7rem] animate-steam rounded-full bg-forest-soft opacity-0 motion-reduce:animate-none"
            />
          ))}
        </div>

        {/* Cup body: round bottom, thick green border */}
        <div className="relative h-[8.5rem] w-[11rem] rounded-b-[5.5rem] border-[6px] border-forest bg-mist">
          {/* Dark coffee surface across the top */}
          <div className="absolute inset-x-0 top-0 h-[1.6rem] bg-plum" />
          {/* Handle sticking out on the right (smaller on phones) */}
          <div className="absolute -right-[2.6rem] top-4 h-[3.8rem] w-[2.6rem] rounded-r-[2rem] border-[6px] border-l-0 border-forest sm:-right-[3.2rem] sm:w-[3.2rem]" />
        </div>

        {/* Saucer under the cup */}
        <div className="-mt-[0.2rem] h-[1.1rem] w-60 max-w-full rounded-full bg-butter shadow-[0_10px_0_var(--color-forest)]" />
      </div>
    </section>
  );
}

export default Hero;