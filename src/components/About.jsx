// src/components/About.jsx
// Photo block on the left, story on the right (stacked on phones).

function About() {
  return (
    // id="about" is the target of the "About" link in the header.
    // Phone: one column. md and up: two columns, photo narrower than text (Grid)
    <section id="about" className="grid grid-cols-1 bg-forest text-mist md:grid-cols-[1fr_1.2fr]">
      {/* Photo block: short on phones, taller from md up. overflow-hidden stops the photo spilling out */}
      <div className="relative grid min-h-40 place-items-center overflow-hidden bg-forest-soft md:min-h-72">
        {/* Placeholder photo. alt="" because it is decoration */}
        <img
          src="https://picsum.photos/seed/kitchen/900/700"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Light green overlay so the badge stays readable */}
        <div className="absolute inset-0 bg-forest/35" />
        {/* Floating badge on top of the photo */}
        <span className="relative animate-float rounded-full bg-butter px-6 py-2 font-display text-2xl text-forest motion-reduce:animate-none">
          Est. 2016
        </span>
      </div>

      {/* Story text: vertically centred, limited line length */}
      <div className="max-w-[40rem] self-center px-5 py-10 md:px-6 md:py-12">
        <h2 className="mb-2 font-display text-3xl text-butter sm:text-4xl">Family run, since 2016</h2>
        <p className="mb-4">
          Marlena opened her first espresso bar with one machine and her grandmother's recipes. Today the whole family
          cooks here.
        </p>
        <p>
          We make pasta by hand every morning, roast our coffee with a local roaster, and buy produce from farms within
          an hour of town.
        </p>
      </div>
    </section>
  );
}

export default About;