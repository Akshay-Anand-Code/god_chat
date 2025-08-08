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
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans text-white`}>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        
        <div className="bright-star"></div>
        <div className="bright-star"></div>
        <div className="bright-star"></div>
        <div className="bright-star"></div>
        <div className="bright-star"></div>
        {children}
      </body>
    </html>
  );
}