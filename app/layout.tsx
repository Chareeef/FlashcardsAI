import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "AI Flashcards",
  description: "Generate all your flashcards effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />

          {/* Apple Touch Icon */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          />
        </head>

        <body className="flex flex-col min-h-dvh bg-primary">
          <Header />
          <main className="grow flex flex-col gap-y-4 p-4">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
