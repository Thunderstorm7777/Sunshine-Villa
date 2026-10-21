import { Link } from "lucide-react";

const amenities = [
  {
    icon: "🏊",
    title: "Swimming Pool",
    description:
      "Refresh your senses and enjoy relaxing moments in a beautiful poolside setting.",
  },
  {
    icon: "🛏️",
    title: "Luxury Bedrooms",
    description:
      "Experience a comfortable stay in thoughtfully designed and relaxing bedrooms.",
  },
  {
    icon: "🌿",
    title: "Garden & Nature",
    description:
      "Escape the everyday rush and spend peaceful moments surrounded by greenery.",
  },
  {
    icon: "🍽️",
    title: "Dining Area",
    description:
      "Enjoy meals and meaningful conversations in a welcoming dining space.",
  },
  {
    icon: "🛋️",
    title: "Comfortable Living",
    description:
      "Unwind in a spacious living area designed for relaxation and togetherness.",
  },
  {
    icon: "🚗",
    title: "Parking",
    description:
      "Convenient parking for guests arriving at the villa.",
  },
  {
    icon: "📶",
    title: "Wi-Fi",
    description:
      "Stay connected during your getaway.",
  },
  {
    icon: "✨",
    title: "Private Villa Experience",
    description:
      "Enjoy quality time with family and friends in your own private setting.",
  },
];

export default function AmenitiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-green-950 px-6 py-24 text-center md:py-32">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-green-700/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-green-300">
            The Sunshine Experience
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Little Luxuries.
            <span className="mt-2 block text-green-300">
              Beautiful Memories.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-green-100/80 md:text-lg">
            Discover the comforts and experiences that make
            your stay at Sunshine Villa special.
          </p>

          <Link
            href="/Booking"
            className="mt-9 inline-flex rounded-full bg-white px-8 py-3.5 font-semibold text-green-950 transition hover:bg-green-100"
          >
            Book Your Stay →
          </Link>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-6 pb-8 pt-16 text-center md:pt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
          Made for Your Comfort
        </p>

        <h2 className="mt-3 text-3xl font-bold text-green-950 md:text-4xl">
          Everything You Need to Feel at Home
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
          From relaxing spaces to convenient essentials,
          explore the features available at Sunshine Villa.
        </p>
      </section>

      {/* Amenities grid */}
      <section className="px-6 py-12 md:px-12 lg:px-20 lg:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((amenity, index) => (
            <article
              key={amenity.title}
              className="group rounded-3xl border border-green-100 bg-green-50/50 p-7 transition duration-300 hover:-translate-y-2 hover:border-green-200 hover:bg-white hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl transition duration-300 group-hover:bg-green-900 group-hover:scale-105">
                {amenity.icon}
              </div>

              <p className="mt-7 text-xs font-semibold tracking-widest text-green-700">
                {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className="mt-2 text-xl font-bold text-green-950">
                {amenity.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {amenity.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="px-6 pb-20 pt-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-green-900 px-6 py-12 text-center md:px-12 md:py-16">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Your Perfect Getaway Awaits
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-green-100/80">
            Make time for yourself, reconnect with loved ones,
            and create memories at Sunshine Villa.
          </p>

          <Link
            href="/Booking"
            className="mt-7 inline-flex rounded-full bg-white px-8 py-3.5 font-semibold text-green-950 transition hover:bg-green-100"
          >
            Reserve Your Stay
          </Link>
        </div>
      </section>
    </main>
  );
}
