// src/App.jsx
// The page is built from components. More will be added between Header and Footer.
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      {/* Temporary placeholder so you can see the header and footer; replaced in the next steps */}
      <main id="top" className="mx-auto min-h-[60vh] max-w-[70rem] px-5 py-16">
        <h1 className="font-display text-4xl text-forest">Main content coming next</h1>
      </main>
      <Footer />
    </>
  );
}

export default App;