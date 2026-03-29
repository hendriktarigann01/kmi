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

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
    setLangOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-transparent backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-10 h-16">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/images/logos/logo-light.webp"
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
              className="text-sm text-secondary font-medium hover:opacity-70 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Language Switcher */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center w-20 gap-1.5 text-sm text-secondary font-medium border border-[#E5E9EC] rounded-full px-3 py-1.5 hover:border-secondary transition-colors"
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
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-secondary hover:text-primary transition-colors"
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
          className="md:hidden text-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-[#E5E9EC] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-secondary font-medium py-1"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 pt-2">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => switchLocale(l)}
                    className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-colors ${
                      locale === l
                        ? "border-secondary text-secondary"
                        : "border-[#E5E9EC] text-[#616161]"
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
