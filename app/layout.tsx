export const instant = false;
import type { Metadata } from "next";
import "./globals.css";


import Providers from "./providers";

export const metadata: Metadata = {
  title: "Sunshine Villa",
  description: "Book your perfect stay at Sunshine Villa.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body>
       <Providers>{children}</Providers>
      </body>
    </html>
  );
}