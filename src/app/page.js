// src/app/page.js
// The home page: your sections in order.
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import About from "@/components/About";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
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