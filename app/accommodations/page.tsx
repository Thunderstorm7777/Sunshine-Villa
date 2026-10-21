export const instant = false;

import AccommodationCard from "../../components/AccommodationCard";
import type { AccommodationUnit } from "../../types/Accommodation";

export default async function AccommodationsPage() {
  const response = await fetch(
    "http://localhost:8080/Backend/getaccommodationunits",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch accommodation data");
  }

  const accommodations: AccommodationUnit[] = await response.json();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
            Welcome to Sunshine Villa
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
            Find Your Perfect Stay
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Explore our comfortable accommodations and choose the perfect
            space for your next getaway.
          </p>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-lime-500" />
        </div>

        {/* Accommodation count */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-emerald-950">
            Our Accommodations
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            {accommodations.length} accommodations found
          </p>
        </div>

        {/* Accommodation cards */}
        {accommodations.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white p-10 text-center">
            <h3 className="text-xl font-semibold text-emerald-950">
              No accommodations found
            </h3>

            <p className="mt-2 text-gray-600">
              Please check again later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {accommodations.map((unit, index) => (
              <AccommodationCard
                key={unit.id}
                unit={unit}
                index={index}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}