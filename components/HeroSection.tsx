
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.8,
      delay: reduceMotion ? 0 : delay,
      ease: "easeOut" as const,
    },
  });

  return (
    <section className="relative flex min-h-[650px] items-center overflow-hidden bg-emerald-950 px-6 py-20 sm:px-10 lg:min-h-[720px] lg:px-20">
      {/* Background image animation */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85')",
        }}
        initial={reduceMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 2.5,
          ease: "easeOut",
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/65 to-emerald-950/10" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <motion.p
            {...reveal(0.2)}
            className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lime-200 sm:text-sm"
          >
            Welcome to Sunshine Villa
          </motion.p>

          <motion.h1
            {...reveal(0.4)}
            className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl"
          >
            Your Private Escape,
            <span className="mt-2 block text-lime-200">
              Surrounded by Nature.
            </span>
          </motion.h1>

          <motion.p
            {...reveal(0.7)}
            className="mt-6 max-w-xl text-base leading-8 text-white/85 sm:text-lg"
          >
            Experience comfort, privacy, and unforgettable moments
            in a peaceful villa designed for your perfect getaway.
          </motion.p>

          <motion.div
            {...reveal(0.95)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.04 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            >
              <Link
                href="/accommodations"
                className="inline-flex items-center rounded-md bg-lime-200 px-7 py-4 text-sm font-bold text-emerald-950 transition hover:bg-white"
              >
                Explore Our Stays
                <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            >
              <Link
                href="/#about"
                className="inline-flex items-center rounded-md border border-white/60 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Discover Sunshine
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            {...reveal(1.2)}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-white/90"
          >
            <span>✓ Peaceful surroundings</span>
            <span>✓ Comfortable stays</span>
            <span>✓ Memorable moments</span>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <motion.div
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.2,
          delay: reduceMotion ? 0 : 0.5,
          ease: "easeOut",
        }}
        style={{ transformOrigin: "left" }}
        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-lime-200 via-emerald-500 to-transparent"
      />
    </section>
  );
}
