import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Family Hub Demo",
  description: "Sanitised portfolio edition of a family operations application.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
