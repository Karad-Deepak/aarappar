import Nav from "@/app/components/Nav";

import Footer from "../components/Footer";
import { fetchMenu, fetchMenuItems } from "../lib/actions";
import MenuDisplay from "../components/MenuDisplay";
import CartBottomBar from "../components/CartBottomBar";

import DrinksMenu from "../components/DrinksMenu";

async function page() {
  const menudata = await fetchMenuItems();
  return (
    <>
      <header className="">
        <Nav />
      </header>
      <main className="bg-white">
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
