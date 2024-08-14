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
    <ClerkProvider>
      <html lang="en">
        <body className="flex flex-col min-h-dvh bg-primary">
          <Header />
          <main className="grow p-4">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
