"use client";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import ConnectSection from "@/app/components/ConnectSection";
import CateringPage from "@/app/components/CateringPage";

function page() {
  return (
    <>
      <header className="">
        <Nav />
      </header>
      <main className=" mt-8 lg:mt-14">
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
