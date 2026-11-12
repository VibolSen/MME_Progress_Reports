import type { Metadata } from "next";
import {
  Battambang,
  Kantumruy_Pro,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const battambang = Battambang({
  variable: "--font-battambang",
  subsets: ["khmer", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

const kantumruyPro = Kantumruy_Pro({
  variable: "--font-khmer",
  subsets: ["khmer", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-en",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MME Progress Reports | OONE Power",
  description: "Progress reports and tracking system for OONE Power",
  icons: {
    icon: "/logo/logo tab.svg",
    shortcut: "/logo/logo tab.svg",
    apple: "/logo/logo tab.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="km"
      className={`${battambang.variable} ${kantumruyPro.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
