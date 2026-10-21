"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Users,
  BedDouble,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
} from "lucide-react";
import type { AccommodationUnit } from "../types/Accommodation";

type Props = {
  unit: AccommodationUnit;
  index: number;
};

function getImage(type: string) {
  const value = type.toLowerCase();

  if (value.includes("1")) {
    return "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80";
  }

  if (value.includes("2")) {
    return "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80";
  }

  if (value.includes("3")) {
    return "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80";
  }

  return "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80";
}

export default function AccommodationCard({ unit, index }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.1,
        ease: "easeOut",
      }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <motion.img
          src={getImage(unit.type)}
          alt={`${unit.type} accommodation`}
          className="h-full w-full object-cover"
          whileHover={reduceMotion ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.5 }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-emerald-900">
          {unit.type}
        </span>

        <div className="absolute bottom-4 left-5 text-white">
          <p className="text-xs font-medium uppercase tracking-widest text-white/80">
            Sunshine Villa
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            Your perfect getaway
          </h2>
        </div>
      </div>

      {/* Accommodation details */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-emerald-950">
              {unit.type} Accommodation
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Unit {unit.unitNumber} · Floor {unit.floorNumber}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-xl font-bold text-emerald-800">
              ₹{unit.pricePerNight.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-gray-500">per night</p>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <Users size={17} className="text-emerald-700" />
            Up to {unit.maxGuests} guests
          </p>

          <p className="flex items-center gap-2">
            <BedDouble size={17} className="text-emerald-700" />
            Comfortable private accommodation
          </p>
        </div>

        {/* Availability */}
        <div className="mt-5 border-t border-gray-100 pt-4">
          {unit.booked ? (
            <p className="flex items-center gap-2 text-sm font-medium text-red-600">
              <XCircle size={17} />
              Currently booked
            </p>
          ) : (
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-700">
              <CheckCircle2 size={17} />
              Available to book
            </p>
          )}
        </div>

        {/* Booking link */}
        <Link
          href={unit.booked ? "#" : `/Booking/?id=${unit.id}`}
          aria-disabled={unit.booked}
          tabIndex={unit.booked ? -1 : undefined}
          className={`mt-5 flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
            unit.booked
              ? "pointer-events-none bg-gray-200 text-gray-500"
              : "bg-emerald-800 text-white hover:bg-emerald-900"
          }`}
        >
          {unit.booked ? "Unavailable" : "Book Now"}

          {!unit.booked && <ArrowUpRight size={18} />}
        </Link>
      </div>
    </motion.article>
  );
}