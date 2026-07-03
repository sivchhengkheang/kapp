import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AuthProvider } from "@/src/context/AuthContext";
import "./globals.css";

const inter = Roboto({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Kapp — Learning Games Hub",
  description:
    "Discover interactive learning games designed to sharpen your skills. Browse curated games by KOOMPI for the next generation of builders.",
  keywords: ["learning games", "educational games", "KOOMPI", "typing games"],
  openGraph: {
    title: "Kapp — Learning Games Hub",
    description: "Discover interactive learning games with KOOMPI App.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col ${inter.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
