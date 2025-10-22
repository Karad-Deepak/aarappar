// app/(site)/[locale]/page.jsx
import HeaderSection from "@/app/components/HeaderSection";
import MenuSection from "@/app/components/MenuSection";
import ConnectSection from "@/app/components/ConnectSection";
import Footer from "@/app/components/Footer";
import CateringSection from "@/app/components/CateringSection";
import CustomerFeedback from "@/app/components/CustomerFeedback";
import PopupModal from "@/app/components/PopupModal";
import CookieNotice from "@/app/components/CookieNotice";

import { fetchPopupSettings } from "@/app/lib/actions";
import GalleryCarousel from "@/app/components/Gallery";

export default async function Page() {
  // Fetch popup settings on the server side
  const popup = await fetchPopupSettings();

  return (
    <>
      {/* Render the popup if it is active */}
      {popup && popup.active && (
        <PopupModal
          type={popup.type}
          content={popup.content}
          imageUrl={popup.image_url}
        />
      )}
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
