import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}

const Hero = () => (
  <section className="hero">
    <div className="hero__content">
      <h1 className="hero__title">Volcanoes of the world</h1>
      <p className="hero__subtitle"> </p>

      <Link to="/volcano">Search Volcano</Link>
    </div>
  </section>
);
