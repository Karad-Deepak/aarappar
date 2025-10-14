"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "@/app/components/LocalizedLink";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import {
  Menu as MenuIcon,
  X as CloseIcon,
  Phone as PhoneIcon,
  PartyPopper,
} from "lucide-react";
import logo2 from "@/public/logo2.png";

function Nav() {
  const [isMobileNav, setMobileNav] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const isHomePage = pathname === "/" || pathname === `/${locale}`;

  function handleMobileNav() {
    setMobileNav((prev) => !prev);
  }

  return (
    <div className="z-20 text-slate-950 bg-slate-50 opacity-90 w-full fixed left-0 top-0 flex flex-row justify-between items-center px-4 py-3 md:px-10 md:py-3">
      <div className="flex items-center gap-2 lg:pl-24">
        <Link href="/">
          <Image
            src={logo2}
            alt="AARAPPAR Logo"
            width={40}
            height={30}
            className="w-12 h-10"
          />
        </Link>
        <Link href="/">
          <h1 className="font-bold text-lg lg:text-xl text-normalbg uppercase"></h1>
        </Link>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <a
          href="tel:+49 6921939837"
          className="flex items-center gap-2 text-normalbg font-bold text-sm lg:text-lg hover:text-rose-600 transition"
          aria-label="Call +49 6921939837"
        >
          <PhoneIcon size={18} className="hidden lg:inline-block" />
          <PhoneIcon size={16} className="lg:hidden" />
          <span>+49 6921939837</span>
        </a>
      </div>

      <Navbar offer={t("takeawayOffer")} labels={t.raw("links")} />

      <Menu handleMobileNav={handleMobileNav} isMobileNav={isMobileNav} />

      {isMobileNav && (
        <Mobile
          handleMobileNav={handleMobileNav}
          isHomePage={isHomePage}
          labels={t.raw("links")}
          offer={t("takeawayOffer")}
        />
      )}
    </div>
  );
}

function Navbar({ labels, offer }) {
  return (
    <nav className="hidden lg:flex flex-row gap-8 text-lg font-semibold text-slate-950">
      <span className="inline-flex items-center gap-2 text-normalbg font-semibold">
        <PartyPopper size={18} /> {offer}
      </span>
      <Link href={labels.menu.href}>
        <span className="hover:text-normalbg transition duration-300">
          {labels.menu.label}
        </span>
      </Link>
      <Link href={labels.reservation.href}>
        <span className="hover:text-normalbg transition duration-300">
          {labels.reservation.label}
        </span>
      </Link>
      <Link href={labels.catering.href}>
        <span className="hover:text-normalbg transition duration-300">
          {labels.catering.label}
        </span>
      </Link>
      <Link href={labels.about.href}>
        <span className="hover:text-normalbg transition duration-300">
          {labels.about.label}
        </span>
      </Link>
    </nav>
  );
}

function Menu({ handleMobileNav, isMobileNav }) {
  return (
    <div className="flex items-center lg:hidden">
      <button
        onClick={handleMobileNav}
        className="cursor-pointer p-2 rounded-xl hover:bg-rose-100 transition"
        aria-label={isMobileNav ? "Close Menu" : "Open Menu"}
      >
        {isMobileNav ? (
          <CloseIcon size={32} className="text-rose-600 drop-shadow-lg" />
        ) : (
          <MenuIcon size={32} className="text-rose-600 drop-shadow-lg" />
        )}
      </button>
    </div>
  );
}

function Mobile({ handleMobileNav, isHomePage, labels, offer }) {
  return (
    <nav className="z-40 fixed top-16 left-0 w-full h-screen bg-zinc-950/90 backdrop-blur-lg text-white flex flex-col items-center justify-center gap-6 text-xl">
      <span className="inline-flex items-center gap-2 text-normalbg font-semibold">
        <PartyPopper size={24} /> {offer}
      </span>
      {!isHomePage && (
        <Link href={labels.home.href} onClick={handleMobileNav}>
          <span className="hover:text-normalbg transition duration-300">
            {labels.home.label}
          </span>
        </Link>
      )}
      {["menu", "reservation", "catering", "about"].map((key) => (
        <Link
          key={key}
          href={labels[key].href}
          onClick={handleMobileNav}
        >
          <span className="hover:text-normalbg transition duration-300">
            {labels[key].label}
          </span>
        </Link>
      ))}
    </nav>
  );
}

export default Nav;

