import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "companion.ai",
  description: "Chat with AI companions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-[#121212] text-white`}>
        {children}
      </body>
    </html>
  );
}