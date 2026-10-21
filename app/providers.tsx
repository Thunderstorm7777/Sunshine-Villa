"use client";

import type { ReactNode } from "react";
import AuthContext2 from "@/context/AuthContext2";

console.log("Imported AuthContext2:", AuthContext2);
console.log("Import type:", typeof AuthContext2);

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthContext2>{children}</AuthContext2>;
}