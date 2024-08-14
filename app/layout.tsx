import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";

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
        <body className="bg-primary">
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
