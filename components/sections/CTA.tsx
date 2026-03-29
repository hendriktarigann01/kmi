"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("cta");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="consultation"
      className="bg-[#00344B] py-20 md:py-28"
    >
      <div className="container mx-auto px-6 lg:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-white text-lg md:text-xl mb-6"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="text-white text-sm md:text-base mx-auto leading-relaxed mb-12"
        >
          {t("subtitle")}
        </motion.p>

        <motion.a
          href="mailto:hello@kmi.id"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="inline-block border border-white text-white hover:text-primary text-sm font-medium px-7 py-3 rounded-full hover:bg-white transition-all duration-300"
        >
          {t("button")}
        </motion.a>
      </div>
    </section>
  );
}
