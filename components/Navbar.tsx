
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  UserRound,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext2";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const reduceMotion = useReducedMotion();
  const { user,setUser} = useAuth();

  const userName = user?.FirstName || user?.email || "Guest";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Stays", href: "/accommodations" },
    { name: "Amenities", href: "/amenities" },
    { name: "About Us", href: "/about" },
  ];
function handleLogout() {
  setUser(null)
  setProfileOpen(false);
  setMenuOpen(false);
}

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: "easeOut",
      }}
      className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <motion.span
            whileHover={
              reduceMotion ? undefined : { rotate: 20, scale: 1.08 }
            }
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-800 text-lime-200"
          >
            <Sun size={25} strokeWidth={1.8} />
          </motion.span>

          <span className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-emerald-950 sm:text-2xl">
              Sunshine Villa
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-700">
              Your peaceful escape
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={reduceMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : 0.15 + index * 0.1,
              }}
            >
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-700 transition hover:text-emerald-800"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop profile and booking buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white p-1.5 pr-3 transition hover:bg-emerald-50"
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800 text-white">
                  <UserRound size={22} />
                </span>

                <ChevronDown
                  size={17}
                  className={`text-emerald-900 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-60 rounded-xl border border-emerald-100 bg-white p-3 shadow-xl">
                  <div className="border-b border-gray-100 px-3 py-3">
                    

                    <p className="mt-1 truncate font-semibold text-emerald-950">
                      Hi, {userName}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-lg px-4 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              Log in
            </Link>
          )}

          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          >
            <Link
              href="/accommodations"
              className="block rounded-lg bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900"
            >
              Book Your Stay <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-emerald-950 transition hover:bg-emerald-50 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Animated mobile navigation */}
      <motion.div
        initial={false}
        animate={
          menuOpen
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.3,
          ease: "easeInOut",
        }}
        className="overflow-hidden md:hidden"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="border-t border-emerald-100 bg-white px-5 py-5 shadow-lg">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-900"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile profile section */}
            {user && (
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-white">
                  <UserRound size={22} />
                </span>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">
                    Welcome back
                  </p>
                  <p className="truncate font-semibold text-emerald-950">
                    Hi, {userName}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Log out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg border border-emerald-800 px-4 py-3 text-center text-sm font-semibold text-emerald-900"
                >
                  Log in
                </Link>
              )}

              <Link
                href="/accommodations"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-emerald-800 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-900"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
