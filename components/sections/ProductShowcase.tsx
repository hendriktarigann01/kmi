"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import ProductPopup, { type ProductKey } from "@/components/ui/ProductPopup";

const desktopLabels: { text: ProductKey; position: string }[] = [
  { text: "Interactive Whiteboard", position: "top-[25%] left-[15%]" },
  { text: "LED Indoor", position: "top-[15%] left-[50%]" },
  { text: "Standfloor", position: "bottom-[5%] right-[23%]" },
];

const mobileLabels: { text: ProductKey; position: string }[] = [
  { text: "Interactive Whiteboard", position: "bottom-[25%] left-[10%]" },
  { text: "LED Indoor", position: "top-[18%] left-[38%]" },
  { text: "Standfloor", position: "bottom-[25%] right-[10%]" },
];

function LabelButton({
  label,
  index,
  inView,
  onClick,
}: {
  label: { text: ProductKey; position: string };
  index: number;
  inView: boolean;
  onClick: (key: ProductKey) => void;
}) {
  return (
    <motion.div
      key={label.text}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.12 }}
      className={`absolute ${label.position}`}
    >
      <motion.button
        onClick={() => onClick(label.text)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#9CA3AF4D]/30 backdrop-blur-sm text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-md border border-white/60 cursor-pointer hover:bg-white/20 transition-colors"
      >
        {label.text}
      </motion.button>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeProduct, setActiveProduct] = useState<ProductKey | null>(null);

  return (
    <>
      <section
        ref={ref}
        id="product"
        className="relative w-full overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-screen"
        >
          {/* Desktop image */}
          <div className="hidden lg:block absolute inset-0">
            <Image
              src="/images/products/product-kmi.webp"
              alt="KMI Display Products"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Mobile/tablet */}
          <div className="block lg:hidden absolute inset-0">
            <Image
              src="/images/products/product-kmi-mobile.webp"
              alt="KMI Display Products"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Desktop labels */}
          <div className="hidden lg:block">
            {desktopLabels.map((label, i) => (
              <LabelButton
                key={label.text}
                label={label}
                index={i}
                inView={inView}
                onClick={setActiveProduct}
              />
            ))}
          </div>

          {/* Mobile/tablet labels */}
          <div className="block lg:hidden">
            {mobileLabels.map((label, i) => (
              <LabelButton
                key={label.text}
                label={label}
                index={i}
                inView={inView}
                onClick={setActiveProduct}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Popup */}
      <ProductPopup
        productKey={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </>
  );
}
