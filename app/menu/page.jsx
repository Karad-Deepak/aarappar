import Nav from "@/app/components/Nav";

import Footer from "../components/Footer";
import { fetchMenuItems, fetchActiveDiscount } from "../lib/actions";
import MenuDisplay from "../components/MenuDisplay";
import CartBottomBar from "../components/CartBottomBar";

import DrinksMenu from "../components/DrinksMenu";

async function page() {
  const [menudata, activeDiscount] = await Promise.all([
    fetchMenuItems(),
    fetchActiveDiscount(),
  ]);
  return (
    <>
      <header className="">
        <Nav />
      </header>
      <main className="bg-white pt-12 lg:pt-2 ">
        <MenuDisplay menudata={menudata} activeDiscount={activeDiscount} />
        <DrinksMenu />
        <CartBottomBar />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default page;
