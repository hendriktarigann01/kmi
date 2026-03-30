"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { localeNames, localeFlags, type Locale } from "@/i18n/config";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { label: t("product"), href: "#product" },
    { label: t("services"), href: "#services" },
    { label: t("whyChooseUs"), href: "#why" },
    { label: t("consultation"), href: "#consultation" },
  ];

  const locales = Object.keys(localeNames) as Locale[];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
    setLangOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 lg:px-10 h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Image
              src={
                scrolled || mobileOpen
                  ? "/images/logos/logo-default.webp"
                  : "/images/logos/logo-light.webp"
              }
              alt="KMI"
              width={100}
              height={60}
              className="object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-opacity hover:opacity-70 ${
                  scrolled ? "text-muted" : "text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center w-20 gap-1.5 text-sm font-medium px-3 py-1.5 transition-colors ${
                  scrolled ? "text-muted" : "text-white"
                }`}
              >
                <Image
                  src={localeFlags[locale]}
                  alt={locale}
                  width={18}
                  height={18}
                  className="rounded-full object-cover"
                />
                {locale.toUpperCase()}
                <ChevronDown size={13} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute mt-5 w-28 rounded-lg border border-[#E5E9EC] overflow-hidden"
                  >
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => switchLocale(l)}
                        className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors ${
                          scrolled
                            ? "text-muted/70 hover:text-muted hover:bg-black/10"
                            : "text-muted/70 hover:text-muted hover:bg-white/10"
                        }`}
                      >
                        <Image
                          src={localeFlags[l]}
                          alt={l}
                          width={16}
                          height={16}
                          className="rounded-full object-cover"
                        />
                        {localeNames[l]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden transition-colors ${
              scrolled || mobileOpen ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Nav links */}
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                className="text-2xl font-bold text-gray-800 hover:text-[#0D3A4A] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="w-12 h-px bg-gray-200"
            />

            {/* Language switcher */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex gap-3"
            >
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    switchLocale(l);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                    locale === l
                      ? "bg-[#0D3A4A] text-white border-[#0D3A4A]"
                      : "border-gray-200 text-gray-500 hover:border-[#0D3A4A] hover:text-[#0D3A4A]"
                  }`}
                >
                  <Image
                    src={localeFlags[l]}
                    alt={l}
                    width={16}
                    height={16}
                    className="rounded-full object-cover"
                  />
                  {l.toUpperCase()}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
