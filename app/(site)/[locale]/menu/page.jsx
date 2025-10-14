import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { fetchMenuItems } from "@/app/lib/actions";
import MenuDisplay from "@/app/components/MenuDisplay";
import CartBottomBar from "@/app/components/CartBottomBar";
import DrinksMenu from "@/app/components/DrinksMenu";

async function page() {
  const menudata = await fetchMenuItems();
  return (
    <>
      <header className="">
        <Nav />
      </header>
      <main className="bg-white pt-12 lg:pt-2 ">
        <MenuDisplay menudata={menudata} />
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
