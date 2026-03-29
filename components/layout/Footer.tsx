"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const footerLinks = [
  { label: "Product", href: "#product" },
  { label: "Services", href: "#services" },
  { label: "Why choose us", href: "#why" },
  { label: "Consultation", href: "#consultation" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Tiktok", href: "#" },
  { label: "Youtube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E9EC] pt-14 pb-8">
      <div className="container mx-auto px-6 lg:px-10">
        {/* Top: Logo + tagline + links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-4 mb-10"
        >
          <Image
            src="/images/logos/logo-default.webp"
            alt="KMI"
            width={80}
            height={36}
            className="object-contain"
          />
          <p className="text-[#616161] text-xs tracking-wide">
            Trusted Digital Display Solutions.
          </p>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 mt-2">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted hover:text-primary text-sm transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-[#E5E9EC] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#616161] text-xs">
            © 2025 KMI. All rights reserved.
          </p>

          <div className="flex gap-5">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs text-muted hover:text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}