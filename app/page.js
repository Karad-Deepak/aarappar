// app/page.jsx
import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import MenuSection from "./components/MenuSection";
import DeliverySection from "./components/DeliverySection";
import ConnectSection from "./components/ConnectSection";
import Footer from "./components/Footer";
import CateringSection from "./components/CateringSection";
import CustomerFeedback from "./components/CustomerFeedback";
import PopupModal from "./components/PopupModal";
import { fetchPopupSettings } from "@/app/_lib/actions"; // Adjust path as needed

export default async function Page() {
  // Fetch popup settings on the server side
  const popup = await fetchPopupSettings();

  return (
    <>
      {/* Render the popup if it is active */}
      {popup && popup.active && <PopupModal content={popup.content} />}
      <header className="w-full lg:h-[90vh] px-3 py-1 md:px-20 md:py-5">
        <Nav />
        <Hero />
      </header>
      <main>
        <MenuSection />

        <CateringSection />
        <ConnectSection />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
