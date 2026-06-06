import type { Metadata } from "next";
import { Outfit, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Möbel Furniture Imphal | Premium Home & Office Furniture",
  description: "Retail partner of Möbel Furniture Kolkata. We design and craft high-quality ergonomic office chairs, tables, sofas, beds, wardrobes, and dining tables. Showroom in Imphal, Manipur.",
  keywords: "furniture, imphal, manipur, mobel furniture, office chairs, ergonomic chairs, sofas, dining tables, home decor, modern furniture",
  openGraph: {
    title: "Möbel Furniture Imphal | Premium Home & Office Furniture",
    description: "Retail partner of Möbel Furniture Kolkata & Local Custom Furniture Workshop in Imphal.",
    images: ["/logo-v2.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 dark:bg-charcoal-900 dark:text-zinc-50 font-sans selection:bg-brand-red selection:text-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
