import Nav from "@/app/components/Nav";
import MenuPage from "../components/MenuPage";
import Footer from "../components/Footer";
import { fetchMenu, fetchMenuItems } from "../_lib/actions";
import MenuDisplay from "../components/MenuDisplay";
import CartBottomBar from "../components/CartBottomBar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import DrinksMenu from "../components/DrinksMenu";

async function page() {
  const menudata = await fetchMenuItems();
  return (
    <>
      <header className="">
        <Nav />
      </header>
      <main className="bg-lightbg">
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
