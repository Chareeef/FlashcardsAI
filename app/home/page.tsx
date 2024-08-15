import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  return (
    <>
      {/* Profile infos */}
      <div className="flex flex-col items-center justify-around p-4 bg-tertiary text-center text-black">
        {user?.hasImage && (
          <Image
            src={user?.imageUrl}
            alt="Profile picture"
            width={150}
            height={150}
            className="rounded-full border-4 border-amber-600 mb-4"
          />
        )}
        <h2 className="font-bold">{user?.fullName}</h2>
      </div>

      {/* Card sets */}
      <div className="flex flex-col items-center justify-around p-4 bg-tertiary text-center text-black">
        <Link href="/generate_cards" className="btn-cta mb-4">
          Generate New Flashcards
        </Link>

        <div className="w-full flex flex-col p-4 items-center border-4 border-indigo-800 rounded-lg">
          <h2 className="italic">No Flashcards Yet</h2>
        </div>
      </div>
    </>
  );
}
