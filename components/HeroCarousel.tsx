"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  gradient: string; // fallback / overlay stand-in
  image?: string; // filename in /public/images
};

const slides: Slide[] = [
  {
    id: "denim",
    eyebrow: "Brand New Collection",
    title: "Denim that breaks in, not down.",
    subtitle: "Nice denim, cut straight, built to age with you.",
    cta: "Shop denim",
    href: "/shop?filter=Denim",
    gradient: "linear-gradient(135deg, #3B4A5A 0%, #221F1D 100%)",
    image: "image1.jpg",
  },
  {
    id: "outerwear",
    eyebrow: "Cold weather edit",
    title: "One coat. Every occasion.",
    subtitle: "Structured wool, cut clean, warm enough for anything.",
    cta: "Shop outerwear",
    href: "/shop?filter=Outerwear",
    gradient: "linear-gradient(135deg, #4A3B33 0%, #221F1D 100%)",
    image: "image2.jpg",
  },
  {
    id: "essentials",
    eyebrow: "Everyday essentials",
    title: "The tee you'll reach for first.",
    subtitle: "240gsm heavyweight cotton. Holds its shape, every wash.",
    cta: "Shop t-shirts",
    href: "/shop?filter=T-Shirts",
    gradient: "linear-gradient(135deg, #6E2A38 0%, #221F1D 100%)",
    image: "image3.png",
  },
];

const AUTOPLAY_MS = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [index],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative h-[540px] overflow-hidden sm:h-[600px]">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center overflow-hidden"
        >
          {/* Background image OR gradient fallback */}
          {slide.image ? (
            <img
              src={`/images/${slide.image}`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: slide.gradient }}
            />
          )}

          {/* Readability overlay (dark left → transparent right) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

          {/* Content */}
          <div className="relative mx-auto w-full max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-xl text-white"
            >
              <span className="text-sm uppercase tracking-widest text-white/70">
                {slide.eyebrow}
              </span>
              <h1 className="mt-4 font-display text-4xl leading-[1.1] sm:text-5xl">
                {slide.title}
              </h1>
              <p className="mt-4 text-lg text-white/80">{slide.subtitle}</p>
              <Link
                href={slide.href}
                className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition-opacity hover:opacity-90"
              >
                {slide.cta}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
