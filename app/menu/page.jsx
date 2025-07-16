import Nav from "@/app/components/Nav";

import Footer from "../components/Footer";
import { fetchMenu, fetchMenuItems } from "../lib/actions";
import MenuDisplay from "../components/MenuDisplay";
import CartBottomBar from "../components/CartBottomBar";

import DrinksMenu from "../components/DrinksMenu";
import RunnerBanner from "../components/RunnerBanner";

async function page() {
  const menudata = await fetchMenuItems();
  return (
    <>
      <header className="">
        <RunnerBanner />
        <Nav />
      </header>
      <main className="bg-slate-950">
        <MenuDisplay menudata={menudata} />
        <DrinksMenu />
        <CartBottomBar />\
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default page;
