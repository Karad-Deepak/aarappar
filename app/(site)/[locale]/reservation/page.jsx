"use client";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import ReserveTable from "@/app/components/ReserveTable";
import ConnectSection from "@/app/components/ConnectSection";

function page() {
  return (
    <>
      <header className="">
        <Nav />
      </header>
      <main className="bg-white mt-8 lg:mt-14">
        <ReserveTable />
        <ConnectSection />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default page;
