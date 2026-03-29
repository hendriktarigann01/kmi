"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import ProductPopup, { type ProductKey } from "@/components/ui/ProductPopup";

const labels: { text: ProductKey; position: string }[] = [
  { text: "Interactive Kiosk", position: "top-[25%] left-[15%]" },
  { text: "LED Indoor", position: "top-[15%] left-[50%]" },
  { text: "Standfoor", position: "bottom-[5%] right-[23%]" },
];

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
          <Image
            src="/images/products/product-kmi.webp"
            alt="KMI Display Products"
            fill
            className="object-cover object-center"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Labels */}
          {labels.map((label, i) => (
            <motion.div
              key={label.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.12 }}
              className={`absolute ${label.position}`}
            >
              <motion.button
                onClick={() => setActiveProduct(label.text)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#9CA3AF4D]/30 backdrop-blur-sm text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-md border border-white/60 cursor-pointer hover:bg-white/20 transition-colors"
              >
                {label.text}
              </motion.button>
            </motion.div>
          ))}
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
