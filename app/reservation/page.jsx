"use client";
import Nav from "@/app/components/Nav";

import Footer from "../components/Footer";
import ReserveTable from "../components/ReserveTable";
import ConnectSection from "../components/ConnectSection";
import RunnerBanner from "../components/RunnerBanner";

function page() {
  return (
    <>
      <header className="">
        <RunnerBanner />
        <Nav />
      </header>
      <main className="bg-lightbg mt-8 lg:mt-14">
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
