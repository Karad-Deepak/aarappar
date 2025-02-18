"use client";
import Nav from "@/app/components/Nav";
import MenuPage from "../components/MenuPage";
import Footer from "../components/Footer";

import ConnectSection from "../components/ConnectSection";
import CateringPage from "../components/CateringPage";

function page() {
  return (
    <>
      <header className="">
        <Nav />
      </header>
      <main className="bg-lightbg mt-8 lg:mt-14">
        <CateringPage />
        <ConnectSection />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default page;
