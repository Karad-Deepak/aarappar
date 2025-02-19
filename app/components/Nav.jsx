"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import close from "@/public/close.png";
import list from "@/public/list.png";
import logo from "@/public/logo.png"; // Import logo

function Nav() {
  const [isMobileNav, setMobileNav] = useState(false);

  function handleMobileNav() {
    setMobileNav(!isMobileNav);
  }

  return (
    <>
      <div className="z-20 text-slate-50 bg-darkbg w-full fixed left-0 top-0 flex flex-row justify-between items-center px-4 py-3 md:px-10 md:py-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-2 lg:pl-24">
          <Link href="/">
            <Image
              src={logo}
              alt="AARAPPAR Logo"
              width={40}
              height={30}
              className="w-9h-7"
            />
          </Link>
          <Link href="/">
            <h1 className="font-bold text-lg lg:text-xl text-normalbg uppercase">
              AARAPPAR Restaurant
            </h1>
          </Link>
        </div>

        {/* Desktop Navbar */}
        <Navbar />

        {/* Mobile Menu Toggle */}
        <Menu handleMobileNav={handleMobileNav} isMobileNav={isMobileNav} />

        {/* Mobile Navigation */}
        {isMobileNav && <Mobile handleMobileNav={handleMobileNav} />}
      </div>
    </>
  );
}

function Navbar() {
  return (
    <nav className="hidden lg:flex flex-row gap-8 text-lg font-semibold text-white">
      <Link href="/menu">
        <span className="hover:text-rose-500 transition duration-300">
          Menu
        </span>
      </Link>
      <Link href="/reservation">
        <span className="hover:text-rose-500 transition duration-300">
          Reserve Table
        </span>
      </Link>
      <Link href="/catering">
        <span className="hover:text-rose-500 transition duration-300">
          Catering
        </span>
      </Link>
      <Link href="#">
        <span className="hover:text-rose-500 transition duration-300">
          About Us
        </span>
      </Link>
    </nav>
  );
}

function Menu({ handleMobileNav, isMobileNav }) {
  return (
    <div className="flex items-center lg:hidden">
      <span onClick={handleMobileNav} className="cursor-pointer">
        <Image
          src={!isMobileNav ? list : close}
          alt="Menu Icon"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      </span>
    </div>
  );
}

function Mobile({ handleMobileNav }) {
  return (
    <nav className="z-40 fixed top-14 left-0 w-full h-screen bg-zinc-900/90 backdrop-blur-lg text-white flex flex-col items-center justify-center gap-6 text-xl">
      <Link href="/menu" onClick={handleMobileNav}>
        <span className="hover:text-rose-500 transition duration-300">
          Menu
        </span>
      </Link>
      <Link href="/reservation" onClick={handleMobileNav}>
        <span className="hover:text-rose-500 transition duration-300">
          Reserve Table
        </span>
      </Link>
      <Link href="/catering" onClick={handleMobileNav}>
        <span className="hover:text-rose-500 transition duration-300">
          Catering
        </span>
      </Link>
      <Link href="#" onClick={handleMobileNav}>
        <span className="hover:text-rose-500 transition duration-300">
          About Us
        </span>
      </Link>
    </nav>
  );
}

export default Nav;
