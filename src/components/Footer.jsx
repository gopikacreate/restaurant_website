// src/components/Footer.jsx
// Opening hours on the left, location on the right, copyright line below.

// Opening hours as data, mapped below
const hours = [
  { days: "Mon to Fri", time: "8am to 10pm" },
  { days: "Saturday", time: "9am to 11pm" },
  { days: "Sunday", time: "9am to 6pm" },
];

function Footer() {
  return (
    // id="visit" is the target of the "Hours" link in the header
    <footer id="visit" className="bg-forest py-12 text-mist">
      {/* Phone: columns stacked (flex-col). md and up: side by side (md:flex-row), one at each end */}
      <div className="mx-auto flex max-w-[70rem] flex-col gap-8 px-5 md:flex-row md:justify-between">
        {/* Column 1: hours */}
        <div className="w-full md:max-w-[22rem]">
          <h2 className="mb-2 font-display text-2xl text-butter">Opening hours</h2>
          <ul>
            {hours.map((row) => (
              // day on the left, time on the right, dashed line underneath
              <li
                key={row.days}
                className="flex justify-between gap-4 border-b border-dashed border-forest-soft py-1"
              >
                <span>{row.days}</span>
                <span>{row.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: location. Left aligned on phones, right aligned from md up */}
        <div className="w-full md:max-w-[22rem] md:text-right">
          <h2 className="mb-2 font-display text-2xl text-butter">Find us</h2>
          <address className="not-italic">
            12 Via Roma Lane
            <br />
            Peterborough PE1 1AA
            <br />
            <a href="tel:+441234567890" className="underline">
              01234 567890
            </a>
          </address>
        </div>
      </div>

      {/* Copyright line, centred */}
      <p className="mx-auto mt-10 max-w-[70rem] px-5 text-center text-sm opacity-70">
        © 2026 Caffè Marlena. Made with React and Tailwind.
      </p>
    </footer>
  );
}

export default Footer;