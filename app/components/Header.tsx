import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full p-4 bg-secondary border-b-2 border-indigo-800 text-white flex flex-col md:flex-row items-center justify-between gap-y-4">
      <Link
        href="/"
        className="flex flex-col md:flex-row items-center justify-center gap-2 text-lg"
      >
        <Image
          src="/icons/icon.png"
          alt="App Logo"
          height={510}
          width={510}
          className="h-[3rem] w-[3rem] rounded-xl shadow-inner"
        />
        <div className="text-center md:text-left">
          <h1 className="font-bold">AI Flashcards</h1>
          <p className="italic">Generate your flashcards in a snap!</p>
        </div>
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
