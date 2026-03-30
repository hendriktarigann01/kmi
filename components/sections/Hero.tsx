"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src="/images/hero/hero.webp"
        alt="KMI Hero"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="w-full px-6 lg:px-10 flex justify-center">
          <div className="w-full max-w-6xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4"
            >
              {t("title")
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="text-white/80 text-sm md:text-base mb-8 leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            <motion.a
              href="#consultation"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block border border-white text-white hover:text-primary text-sm font-medium px-6 py-2.5 rounded-full bg-[#9CA3AF4D]/30 hover:bg-white transition-all duration-300"
            >
              {t("cta")}
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
