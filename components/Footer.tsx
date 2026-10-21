import Link from "next/link";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
  },
  {
    name: "Twitter / X",
    href: "https://x.com/",
  },
];

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1
      gap-10 px-6 py-14 sm:grid-cols-2 md:px-12
      lg:grid-cols-4 lg:px-20">

        {/* Villa information */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">
            Sunshine <span className="text-green-300">Villa</span>
          </h2>

          <p className="mt-4 max-w-xs leading-7 text-green-100/75">
            A peaceful private getaway where comfort,
            nature, and memorable moments come together.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>

          <ul className="mt-4 space-y-3 text-green-100/75">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#amenities" className="transition hover:text-white">
                Amenities
              </Link>
            </li>
            <li>
              <Link href="/#accommodations" className="transition hover:text-white">
                Accommodations
              </Link>
            </li>
            <li>
              <Link href="/Booking" className="transition hover:text-white">
                Book Your Stay
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact information */}
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>

          <div className="mt-4 space-y-3 text-green-100/75">
            <p>📍 Sunshine Villa, [Your Location]</p>
            <p>📞 [Your Contact Number]</p>
            <p>✉️ [Your Email Address]</p>
          </div>
        </div>

        {/* Social media */}
        <div>
          <h3 className="text-lg font-semibold">Follow Our Journey</h3>

          <p className="mt-4 text-sm leading-6 text-green-100/75">
            Explore the villa and discover moments worth remembering.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="rounded-full border border-green-700
                px-4 py-2 text-sm text-green-100 transition
                hover:border-green-300 hover:bg-green-800
                hover:text-white"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-green-800">
        <div className="mx-auto flex max-w-7xl flex-col
        gap-3 px-6 py-5 text-sm text-green-100/60
        sm:flex-row sm:items-center sm:justify-between md:px-12
        lg:px-20">
          <p>
            © 2026 Sunshine Villa. All rights reserved.
          </p>

          <p>Made for memorable stays 🌿</p>
        </div>
      </div>
    </footer>
  );
}
