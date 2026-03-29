"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function ValueProps() {
  const t = useTranslations("valueProps");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const values = [
    {
      label: t("quality.label"),
      title: t("quality.title"),
      description: t("quality.description"),
    },
    {
      label: t("endToEnd.label"),
      title: t("endToEnd.title"),
      description: t("endToEnd.description"),
    },
    {
      label: t("price.label"),
      title: t("price.title"),
      description: t("price.description"),
    },
  ];

  return (
    <section ref={ref} id="services" className="bg-[#00344B] py-16 md:py-20">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              className="flex flex-col items-center text-center px-8 py-8"
            >
              {/* Pill label */}
              <div className="border border-white/40 text-white/80 text-xs px-4 py-1 rounded-full mb-16">
                {v.label}
              </div>

              <h3 className="text-white text-lg font-semibold mb-3">
                {v.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
