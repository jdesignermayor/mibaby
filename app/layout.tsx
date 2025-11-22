import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/shared/QueryProvider";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Specify desired weights
  variable: "--font-quicksand", // Optional: for use with CSS variables
});

export const metadata: Metadata = {
  title: "Mire - AI baby illustration generator",
  description:
    "AI generation to create realistic illustration of your baby, based on 2D ultrasound scans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider></body>
    </html>
  );
}
