"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { List, X, CaretDown } from "@phosphor-icons/react";
import { NAV_LINKS, SERVICES } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] transition-colors duration-300 ${
        scrolled || open
          ? "bg-[#0a0610]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-d flex h-[72px] items-center justify-between">
        <Link href="/" aria-label="Digitales home" className="relative z-10 flex items-center">
          <Image
            src="/Digitales logo.png"
            alt="Digitales"
            width={150}
            height={45}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) =>
            "dropdown" in link && link.dropdown ? (
              <li
                key={link.href}
                className="group relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 py-2 font-body text-sm font-medium text-white/90 transition hover:text-white ${
                    pathname.startsWith("/services") ? "nav-active" : ""
                  }`}
                >
                  {link.label}
                  <CaretDown size={12} weight="bold" className="mt-0.5" />
                </Link>
                <div
                  className={`absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 transition ${
                    servicesOpen
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  }`}
                >
                  <ul className="overflow-hidden rounded-card border border-white/10 bg-night-surface py-2 shadow-card-hover">
                    {SERVICES.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="block px-4 py-2.5 font-body text-sm text-muted transition hover:bg-white/5 hover:text-white"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`py-2 font-body text-sm font-medium text-white/90 transition hover:text-white ${
                    pathname === link.href ? "nav-active" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn-gold hidden sm:inline-flex">
            Book a Call
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[130] grid h-10 w-10 place-items-center rounded text-white lg:hidden"
          >
            {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[100] overflow-y-auto bg-[#0a0610] transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="container-d flex min-h-screen flex-col gap-1 pt-24 pb-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-white/10">
              <Link
                href={link.href}
                className="block bg-[#0a0610] py-4 font-display text-lg font-semibold text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-6">
            <Link href="/contact" className="btn-gold w-full">
              Book a Call
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
