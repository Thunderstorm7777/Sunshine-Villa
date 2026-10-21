
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Waves,
  BedDouble,
  Trees,
  UtensilsCrossed,
  Wifi,
  CarFront,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const amenities = [
  {
    title: "Swimming Pool",
    description: "Relax, refresh, and enjoy your private escape.",
    icon: Waves,
  },
  {
    title: "Luxury Bedrooms",
    description: "Comfortable spaces designed for peaceful nights.",
    icon: BedDouble,
  },
  {
    title: "Garden & Nature",
    description: "Unwind surrounded by greenery and fresh air.",
    icon: Trees,
  },
  {
    title: "Dining Experience",
    description: "Enjoy memorable meals with your loved ones.",
    icon: UtensilsCrossed,
  },
  {
    title: "Wi-Fi Access",
    description: "Stay connected throughout your getaway.",
    icon: Wifi,
  },
  {
    title: "Parking Space",
    description: "Convenient parking for your visit.",
    icon: CarFront,
  },
];

export default function AmenitiesPreview() {
  return (
    <section
      id="amenities"
      className="overflow-hidden bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-800">
            <Sparkles size={16} />
            Experience Sunshine Villa
          </span>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-green-950 sm:text-5xl">
            Little Luxuries.
            <span className="block mt-2 text-green-700">
              Beautiful Memories.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
            From refreshing poolside moments to peaceful garden evenings,
            discover the comforts that make every stay special.
          </p>
        </motion.div>

        {/* Image and introduction */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
           <div className="relative h-[340px] overflow-hidden rounded-3xl sm:h-[470px]">
            <Image
                src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1400&q=85"
                alt="Beautiful swimming pool at a luxury villa"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                className="object-cover transition-transform duration-700 hover:scale-105"
            />


              <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-7 sm:p-10">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-green-100">
                  Your private escape
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                  Make time for yourself.
                </h3>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-2 rounded-2xl border border-green-100 bg-white p-4 shadow-xl sm:-right-5 sm:p-5">
              <p className="text-sm text-gray-500">Your getaway</p>
              <p className="mt-1 font-semibold text-green-900">
                Your own kind of luxury
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="pt-5 lg:pt-0"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Comfort in every corner
            </p>

            <h3 className="mt-4 text-3xl font-semibold leading-tight text-green-950 sm:text-4xl">
              Everything you need for a memorable stay.
            </h3>

            <p className="mt-5 leading-7 text-gray-600">
              Whether you are planning a relaxing weekend, quality family
              time, or a special celebration, Sunshine Villa offers a
              welcoming setting to slow down and enjoy the moment.
            </p>

            <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {amenities.map((amenity, index) => {
                const Icon = amenity.icon;

                return (
                  <motion.div
                    key={amenity.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    className="group flex items-start gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800 transition-colors duration-300 group-hover:bg-green-800 group-hover:text-white">
                      <Icon size={23} strokeWidth={1.7} />
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-950">
                        {amenity.title}
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {amenity.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Link
              href="/amenities"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-green-800 px-7 py-4 font-medium text-white transition-all duration-300 hover:bg-green-950 hover:shadow-lg"
            >
              Explore All Amenities
              <ArrowUpRight size={19} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
