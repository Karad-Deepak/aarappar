"use client";
import Link from "next/link";
import Nav from "@/app/components/Nav";

import Hero from "@/app/components/Hero";
import MenuSection from "./components/MenuSection";
import DeliverySection from "./components/DeliverySection";
import ConnectSection from "./components/ConnectSection";
import Footer from "./components/Footer";

import CateringSection from "./components/CateringSection";
import CustomerFeedback from "./components/CustomerFeedback";

function page() {
  return (
    <>
      <header className=" w-full lg:h-[80vh]  px-3 py-1 md:px-20 md:py-5">
        <Nav />
        <Hero />
      </header>
      <main>
        <MenuSection />
        <DeliverySection />
        <CateringSection />
        <ConnectSection />
        <CustomerFeedback />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default page;
