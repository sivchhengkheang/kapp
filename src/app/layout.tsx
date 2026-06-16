import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";



const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kapp — Learning Games Hub",
  description: "Discover interactive learning games with KOOMPI App.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col ${roboto.className}`}>{children}</body>
    </html>
  );
}
