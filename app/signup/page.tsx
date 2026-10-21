"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { UserRoundPlus, House } from "lucide-react";

const API_URL = "http://localhost:8080/Backend";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    age: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (Number(form.age) < 18 || Number(form.age) > 120) {
      setError("Please enter a valid age of 18 or above.");
      return;
    }

    setSubmitting(true);
    

    try {
      const response = await fetch("http://localhost:8080/Backend/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const message = await response.text();
        setError(
          response.status === 409
            ? "An account with this email already exists."
            : message || "Signup failed. Please try again."
        );
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("Cannot connect to the server. Is Spring Boot running?");
    } finally {
      setSubmitting(false);
    }
  }

  const fields = [
    { name: "FirstName", label: "First name", placeholder: "First name", type: "text" },
    { name: "LastName", label: "Last name", placeholder: "Last name", type: "text" },
    { name: "email", label: "Email address", placeholder: "you@example.com", type: "email" },
    { name: "age", label: "Age", placeholder: "Your age", type: "number" },
    { name: "phone", label: "Phone (optional)", placeholder: "Phone number", type: "tel" },
    { name: "password", label: "Password", placeholder: "Create a password", type: "password" },
    { name: "confirmPassword", label: "Confirm password", placeholder: "Repeat password", type: "password" },
  ] as const;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-100 px-5 py-12">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-7 shadow-xl sm:p-10">
        <Link href="/" className="flex items-center gap-3 text-emerald-900">
          <House size={28} />
          <span className="text-xl font-bold">Sunshine Villa</span>
        </Link>

        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
          <UserRoundPlus size={24} />
        </div>

        <h1 className="mt-5 text-3xl font-bold text-emerald-950">
          Create your account
        </h1>
        <p className="mt-2 text-gray-500">
          Join us and make your next stay easier to manage.
        </p>

        <form onSubmit={handleSignup} className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.name}
              className={field.name === "email" || field.name === "phone" ||
                field.name === "password" || field.name === "confirmPassword"
                ? "sm:col-span-2"
                : ""}
            >
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type}
                required={field.name !== "phone"}
                min={field.name === "age" ? 18 : undefined}
                max={field.name === "age" ? 120 : undefined}
                minLength={field.name.includes("Password") ? 8 : undefined}
                autoComplete={
                  field.name === "password"
                    ? "new-password"
                    : field.name === "confirmPassword"
                      ? "new-password"
                      : field.name === "email"
                        ? "email"
                        : field.name === "FirstName"
                          ? "given-name"
                          : field.name === "LastName"
                            ? "family-name"
                            : "off"
                }
                value={form[field.name]}
                onChange={(e) => updateField(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-xl border border-gray-200 text-green-950  px-4 py-3.5 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          ))}

          {error && (
            <p role="alert" className="sm:col-span-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="sm:col-span-2 w-full rounded-xl bg-emerald-800 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-900 disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-emerald-800 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}