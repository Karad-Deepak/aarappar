import Nav from "@/app/components/Nav";
import MenuPage from "../components/MenuPage";
import Footer from "../components/Footer";

function page() {
  return (
    <>
      <header className="">
        <Nav />
      </header>
      <main className="bg-lightbg">
        <MenuPage />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default page;
