"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const featureIcons = [
  "/images/icons/verified.webp",
  "/images/icons/person.webp",
  "/images/icons/eye.webp",
  "/images/icons/message.webp",
];

export default function WhyKMI() {
  const t = useTranslations("whyKMI");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    {
      icon: featureIcons[0],
      title: t("features.verifiedQuality.title"),
      description: t("features.verifiedQuality.description"),
    },
    {
      icon: featureIcons[1],
      title: t("features.experiencedTeam.title"),
      description: t("features.experiencedTeam.description"),
    },
    {
      icon: featureIcons[2],
      title: t("features.transparentProcess.title"),
      description: t("features.transparentProcess.description"),
    },
    {
      icon: featureIcons[3],
      title: t("features.freeConsultation.title"),
      description: t("features.freeConsultation.description"),
    },
  ];

  return (
    <section ref={ref} id="why" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-10">
        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-muted text-base md:text-lg font-medium max-w-[600px] mb-14 leading-relaxed"
        >
          {t("intro")}
        </motion.p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.1,
                ease: "easeOut",
              }}
              className="bg-[#F5F7F9] rounded-2xl p-8 flex flex-col gap-6"
            >
              {/* Icon centered */}
              <div className="flex items-center justify-center mb-3">
                <Image
                  src={f.icon}
                  alt={f.title}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="text-muted text-xl mb-3">{f.title}</h3>
                <p className="text-muted text-sm lmax-w-xs">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
