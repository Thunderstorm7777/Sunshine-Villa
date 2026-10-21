
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent, Suspense, useContext } from "react";
import {
  LockKeyhole,
  Mail,
  ArrowRight,
  House,
  CheckCircle2,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext2";




function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
//   const { setUser } = useAuth();
const AuthContext3 = useAuth()
if (!AuthContext3) {
  throw new Error("Authcontext is undefined ");
}
const {setUser} = AuthContext3
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const registered = searchParams.get("registered") === "true";
  const [showSuccess, setShowSuccess] = useState(registered);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/Backend/checklogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError(
          response.status === 401
            ? "Invalid email or password."
            : "Login failed. Please try again."
        );
        return;
      }

      const user = await response.json();
       setUser(user);
      router.push("/");
      router.refresh();
    } catch {
      setError("Cannot connect to the server. Is Spring Boot running?");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-100 px-5 py-12">
      {/* Account-created success popup */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="signup-success-title"
        >
          <div className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setShowSuccess(false);
                router.replace("/login");
              }}
              aria-label="Close success popup"
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={36} />
            </div>

            <h2
              id="signup-success-title"
              className="mt-5 text-2xl font-bold text-emerald-950"
            >
              Account Created Successfully!
            </h2>

            <p className="mt-3 leading-6 text-gray-600">
              Your Sunshine Villa account has been created. You can now log in
              using your email and password.
            </p>

            <button
              type="button"
              onClick={() => {
                setShowSuccess(false);
                router.replace("/login");
              }}
              className="mt-7 w-full rounded-xl bg-emerald-800 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-900"
            >
              Continue to Login
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        <section className="hidden flex-col justify-between bg-emerald-900 p-10 text-white md:flex">
          <Link href="/" className="flex items-center gap-3">
            <House size={30} />
            <span className="text-2xl font-bold">Sunshine Villa</span>
          </Link>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-200">
              Welcome back
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight">
              Your next peaceful getaway starts here.
            </h1>
            <p className="mt-5 leading-7 text-emerald-100">
              Sign in to manage your details and keep track of your bookings.
            </p>
          </div>

          <p className="text-sm text-emerald-200">
            A little escape. A lot of happiness.
          </p>
        </section>

        <section className="p-7 sm:p-10 md:p-12">
          <Link
            href="/"
            className="text-sm font-medium text-emerald-800 hover:underline"
          >
            ← Back to home
          </Link>

          <div className="mt-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
              <LockKeyhole size={24} />
            </div>

            <h2 className="mt-5 text-3xl font-bold text-emerald-950">
              Log in
            </h2>
            <p className="mt-2 text-gray-500">
              Welcome back to Sunshine Villa.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email address
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-emerald-700">
                <Mail size={19} className="text-gray-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full py-3.5 text-green-950 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 focus-within:border-emerald-700">
                <LockKeyhole size={19} className="text-gray-400" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full py-3.5 text-green-950 outline-none"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Logging in..." : "Log in"}
              {!submitting && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-emerald-800 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-emerald-50" aria-label="Loading login page" />
      }
    >
      <LoginForm />
    </Suspense>
  );
}
