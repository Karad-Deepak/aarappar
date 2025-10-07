"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu as MenuIcon,
  X as CloseIcon,
  Phone as PhoneIcon,
  PartyPopper,
} from "lucide-react"; // Lucide icons
import logo2 from "@/public/logo2.png"; // Your logo image

function Nav() {
  const [isMobileNav, setMobileNav] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  function handleMobileNav() {
    setMobileNav(!isMobileNav);
  }

  return (
    <>
      <div className="z-20 text-slate-950 bg-slate-50 opacity-90 w-full fixed left-0 top-0 flex flex-row justify-between items-center px-4 py-3 md:px-10 md:py-3">
        {/* Logo & Title */}
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
        <div>
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
        {/* Desktop Navbar */}
        <Navbar />

        {/* Mobile Menu Toggle */}
        <Menu handleMobileNav={handleMobileNav} isMobileNav={isMobileNav} />

        {/* Mobile Navigation */}
        {isMobileNav && (
          <Mobile handleMobileNav={handleMobileNav} isHomePage={isHomePage} />
        )}
      </div>
    </>
  );
}

function Navbar() {
  return (
    <nav className="hidden lg:flex flex-row gap-8 text-lg font-semibold text-slate-950">
      <span className="inline-flex items-center gap-2 text-normalbg font-semibold">
        <PartyPopper size={18} /> 10 % Rabatt zum Mitnehmen!
      </span>
      <Link href="/menu">
        <span className="hover:text-normalbg transition duration-300">
          Menu
        </span>
      </Link>
      <Link href="/reservation">
        <span className="hover:text-normalbg transition duration-300">
          Reserve Table
        </span>
      </Link>
      <Link href="/catering">
        <span className="hover:text-normalbg transition duration-300">
          Catering
        </span>
      </Link>
      <Link href="/about">
        <span className="hover:text-normalbg transition duration-300">
          About Us
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

function Mobile({ handleMobileNav, isHomePage }) {
  return (
    <nav className="z-40 fixed top-16 left-0 w-full h-screen bg-zinc-950/90 backdrop-blur-lg text-white flex flex-col items-center justify-center gap-6 text-xl">
      {!isHomePage && (
        <Link href="/" onClick={handleMobileNav}>
          <span className="hover:text-normalbg transition duration-300">
            Home
          </span>
        </Link>
      )}
      <Link href="/menu" onClick={handleMobileNav}>
        <span className="hover:text-normalbg transition duration-300">
          Menu
        </span>
      </Link>
      <Link href="/reservation" onClick={handleMobileNav}>
        <span className="hover:text-normalbg transition duration-300">
          Reserve Table
        </span>
      </Link>
      <Link href="/catering" onClick={handleMobileNav}>
        <span className="hover:text-normalbg transition duration-300">
          Catering
        </span>
      </Link>
      <Link href="/about" onClick={handleMobileNav}>
        <span className="hover:text-normalbg transition duration-300">
          About Us
        </span>
      </Link>
    </nav>
  );
}

export default Nav;
