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
import RunnerBanner from "./components/RunnerBanner";

import { fetchPopupSettings } from "@/app/_lib/actions"; // Adjust path as needed
import GalleryCarousel from "./components/Gallery";
import Notice from "./components/Notice";

export default async function Page() {
  // Fetch popup settings on the server side
  const popup = await fetchPopupSettings();

  return (
    <>
      {/* Render the popup if it is active */}
      {/* {popup && popup.active && <PopupModal content={popup.content} />}
      <header className="w-full lg:h-[90vh]  px-2 py-1 md:px-16 md:py-5">
        <RunnerBanner />
        <Nav />
        <Hero />
      </header>
      <main>
        <MenuSection />

        <CateringSection />
        <ConnectSection />

        <GalleryCarousel />

        <CustomerFeedback />
      </main>
      <footer>
        <Footer />
      </footer>
 */}
      <Notice />
    </>
  );
}
