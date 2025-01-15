import type { Metadata } from "next";
import "./globals.css";
import { Cinzel, Cormorant_Garamond } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "CHAT.FUN",
  description: "Chat with fun characters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${cormorantGaramond.variable} ...`}>
        {children}
      </body>
    </html>
  );
}
