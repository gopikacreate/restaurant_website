// src/App.jsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";
import Menu from "./components/Menu"; 

function App() {
  return (
    <>
      <Header />
      {/* id="top" is the target of the logo link */}
      <main id="top">
        <Hero />
      <Menu />
        <About />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}

export default App;