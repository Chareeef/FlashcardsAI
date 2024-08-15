import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full p-4 bg-secondary border-b-2 border-indigo-800 text-white text-center flex flex-col md:flex-row items-center justify-between gap-y-4">
      <Link href="/" className="flex flex-col text-lg">
        <h1 className="font-bold">AI Flashcards</h1>
        <p className="italic">Generate your flashcards in a snap!</p>
      </Link>
      <div className="flex items-center justify-between gap-x-4">
        <SignedOut>
          <Link href="/sign-in" className="btn-header">
            Sign In
          </Link>
          <Link href="/sign-up" className="btn-header">
            Sign Up
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton />
          <Link href="/home" className="btn-header">
            Home
          </Link>
        </SignedIn>
      </div>
    </header>
  );
}
