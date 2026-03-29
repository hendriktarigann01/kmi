"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export type ProductKey =
  | "Interactive Kiosk"
  | "LED Indoor"
  | "Standfoor"
  | "Interactive Whiteboard";

interface Feature {
  title: string;
  description: string;
}

interface ProductData {
  name: string;
  image: string;
  sizes: string[];
  features: Feature[];
}

const PRODUCTS: Record<ProductKey, ProductData> = {
  Standfoor: {
    name: "Standfloor",
    image: "/images/products/standfloor.webp",
    sizes: ['43"', '55"', '65"'],
    features: [
      {
        title: "Sleek & Durable",
        description:
          "Premium slim-line design with tempered glass and a sturdy industrial-grade build.",
      },
      {
        title: "Remote Management",
        description:
          "Update content instantly across multiple locations via our centralized CMS.",
      },
      {
        title: "Interactive Wayfinding",
        description:
          "Optional high-responsivity touchscreens for information hubs and retail.",
      },
      {
        title: "Plug & Play",
        description:
          "Easy setup with integrated speakers and multiple connectivity ports (USB, HDMI, LAN).",
      },
    ],
  },
  "Interactive Kiosk": {
    name: "Interactive Whiteboard",
    image: "/images/products/interactive-whiteboard.webp",
    sizes: ['65"', '75"', '86"', '98"'],
    features: [
      {
        title: "Precision Touch",
        description:
          "Smooth, multi-user writing experience with ultra-low latency.",
      },
      {
        title: "Seamless Integration",
        description:
          "Easily share your screen from any device (iOS, Android, Windows, Mac).",
      },
      {
        title: "Crystal Clear Visuals",
        description:
          "High resolution with anti-glare technology for optimal visibility in all lighting conditions.",
      },
      {
        title: "All-in-One Solution",
        description: "Equipped with built-in video conferencing tools.",
      },
    ],
  },
  "LED Indoor": {
    name: "LED Indoor",
    image: "/images/products/led-indoor.webp",
    sizes: ["P1.25", "P1.5", "P1.8", "P2.5", "P3.0"],
    features: [
      {
        title: "Seamless Design",
        description:
          "Bezel-less installation for a truly immersive, large-scale viewing experience.",
      },
      {
        title: "Vibrant Color Accuracy",
        description:
          "High refresh rates and superior contrast levels that make content pop.",
      },
      {
        title: "Energy Efficient",
        description:
          "Advanced heat dissipation and low power consumption for 24/7 operation.",
      },
      {
        title: "Versatile Mounting",
        description:
          "Ultra-slim profile suitable for wall-mounting or recessed installation in lobbies and halls.",
      },
    ],
  },
  "Interactive Whiteboard": {
    name: "Interactive Whiteboard",
    image: "/images/products/whiteboard.webp",
    sizes: ['65"', '75"', '86"', '98"'],
    features: [
      {
        title: "Precision Touch",
        description:
          "Smooth, multi-user writing experience with ultra-low latency.",
      },
      {
        title: "Seamless Integration",
        description:
          "Easily share your screen from any device (iOS, Android, Windows, Mac).",
      },
      {
        title: "Crystal Clear Visuals",
        description:
          "High resolution with anti-glare technology for optimal visibility in all lighting conditions.",
      },
      {
        title: "All-in-One Solution",
        description: "Equipped with built-in video conferencing tools.",
      },
    ],
  },
};

interface ProductPopupProps {
  productKey: ProductKey | null;
  onClose: () => void;
}

export default function ProductPopup({
  productKey,
  onClose,
}: ProductPopupProps) {
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, [productKey]);
  const product = productKey ? PRODUCTS[productKey] : null;

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Popup Panel */}
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-md shadow-2xl w-full max-w-3xl pointer-events-auto overflow-hidden">
              {/* Inner card */}
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-muted text-lg">{product.name}</h2>
                  <button
                    onClick={onClose}
                    className="text-[#616161] hover:text-muted transition-colors p-1 -mr-1"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Product Image + Sizes */}
                  <div className="flex flex-col items-center gap-4 sm:min-w-[180px]">
                    <div className="relative w-40 h-52 sm:w-44 sm:h-60">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Size chips */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="border border-[#E5E9EC] text-muted text-xs px-3 py-1 rounded-full"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    {product.features.map((feature) => (
                      <div
                        key={feature.title}
                        className="bg-secondary rounded-xl p-4 shadow-[0_4px_50px_0_rgba(175,175,175,0.2)]"
                      >
                        <h3 className="text-muted text-sm mb-1.5 text-center leading-snug">
                          {feature.title}
                        </h3>
                        <p className="text-muted text-xs leading-relaxed text-center">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Back button */}
                <div className="flex justify-center mt-7">
                  <button
                    onClick={onClose}
                    className="flex items-center gap-2 border border-[#E5E9EC] text-[#616161] text-sm px-5 py-2 rounded-full hover:border-muted hover:text-muted transition-colors"
                  >
                    Back <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
