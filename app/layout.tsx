import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // adjust weights as needed
  variable: '--font-dm-sans', // Tailwind custom property
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // adjust weights as needed
  variable: '--font-manrope', // Tailwind custom property
});

export const metadata: Metadata = {
  title: "Smart Coding Classes",
  description: "Smart Coding Classes is a platform that offers comprehensive coding courses for students of all levels, from beginners to advanced programmers. Our mission is to empower learners with the skills they need to succeed in the tech industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${manrope.variable} font-dm-sans antialiased`}
      >
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
