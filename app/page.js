// app/page.jsx
import HeaderSection from "./components/HeaderSection";
import MenuSection from "./components/MenuSection";
import DeliverySection from "./components/DeliverySection";
import ConnectSection from "./components/ConnectSection";
import Footer from "./components/Footer";
import CateringSection from "./components/CateringSection";
import CustomerFeedback from "./components/CustomerFeedback";
import PopupModal from "./components/PopupModal";
import CookieNotice from "./components/CookieNotice";

import { fetchPopupSettings } from "@/app/lib/actions"; // Adjust path as needed
import GalleryCarousel from "./components/Gallery";

export default async function Page() {
  // Fetch popup settings on the server side
  const popup = await fetchPopupSettings();

  return (
    <>
      {/* Render the popup if it is active */}
      {popup && popup.active && <PopupModal content={popup.content} />}
      <CookieNotice />
      <HeaderSection />
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
    </>
  );
}
