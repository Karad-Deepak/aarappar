"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import close from "@/public/close.png";

import list from "@/public/list.png";

function Nav() {
  const [isMobileNav, setMobileNav] = useState(false);
  function handleMobileNav() {
    setMobileNav(!isMobileNav);
  }

  return (
    <>
      <div className=" z-20 text-slate-50 border-b-1 bg-darkbg w-full fixed left-0 top-0 flex flex-row justify-between px-3 py-2 md:px-10 md:py-2">
        <div className="flex gap-1">
          <Link href="/">
            <h1 className="font-bold text-lg lg:text-xl pt-2 text-normalbg">
              AARAPAR
            </h1>
          </Link>
        </div>
        <Navbar />
        <Menu handleMobileNav={handleMobileNav} isMobileNav={isMobileNav} />
        {isMobileNav && <Mobile />}
      </div>
    </>
  );
}
function Navbar() {
  return (
    <nav className="font-bold hidden lg:flex flex-row gap-7 text-lg relative py-2 px-5 nav">
      <Link href="/menu">
        <span className="">Menu</span>
      </Link>
      <Link href="/reservation">
        <span className="">Reserve Table</span>
      </Link>
      <Link href="/catering">
        <span className="">Catering</span>
      </Link>
      <Link href="#">
        <span className="">About Us</span>
      </Link>
    </nav>
  );
}
function Menu({ handleMobileNav, isMobileNav }) {
  return (
    <>
      <div className="flex items-center lg:hidden pt-1 pr-5 ">
        <span onClick={handleMobileNav}>
          <Image
            src={!isMobileNav ? list : close}
            alt="mobile menu"
            className="w-7 h-8 p-1"
          />
        </span>
      </div>
    </>
  );
}
function Mobile() {
  return (
    <>
      <nav className="z-40 fomt-bold absolute top-12 left-0 w-[100vw] h-[90vh] flex lg:hidden flex-col gap-5 pt-4 text-[16px] font-semibold items-start pl-10 bg-zinc-900/80 backdrop-blur-md text-slate-100 ">
        <div className="flex flex-col gap-2 ">
          <Link href="/menu">
            <span className="">Menu</span>
          </Link>
          <Link href="/reservation">
            <span className="">Reserve Table</span>
          </Link>
          <Link href="/catering">
            <span className="">Catering</span>
          </Link>
          <Link href="#">
            <span className="">About Us</span>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Nav;
