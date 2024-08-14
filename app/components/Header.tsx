import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full p-4 bg-secondary text-white text-center flex flex-col md:flex-row items-center justify-between gap-y-4">
      <Link href="/" className="flex flex-col text-lg">
        <h1 className="font-bold">AI Flashcards</h1>
        <p className="italic">Generate your flashcards in a snap!</p>
      </Link>
      <div className="flex items-center justify-between gap-x-4">
        <SignedOut>
          <SignInButton>
            <button className="btn-header">Sign In</button>
          </SignInButton>
          <SignUpButton>
            <button className="btn-header">Sign Up</button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
          <SignOutButton>
            <button className="btn-header">Sign Out</button>
          </SignOutButton>
        </SignedIn>
      </div>
    </header>
  );
}
