"use client";
import Nav from "./Nav";
import Hero from "./Hero";

export default function HeaderSection() {
  return (
    <header className="w-full lg:h-[90vh] px-2 py-1 md:px-16 md:py-5">
      <Nav />
      <Hero />
    </header>
  );
}
