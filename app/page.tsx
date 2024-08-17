import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      text: "Ask for flashcards on any topic of your choice.",
      imageURL: "/screenshots/query_flashcards.png",
    },
    {
      text: "Save your generated flashcards, or request a new set.",
      imageURL: "/screenshots/new_flashcards.png",
    },
    {
      text: "Access all your previously saved flashcard sets.",
      imageURL: "/screenshots/home.png",
    },
    {
      text: "Open a flashcard set and begin your review.",
      imageURL: "/screenshots/review_flashcards.png",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-around gap-y-4 p-4 bg-tertiary text-center text-black">
      <div className="flex flex-col items-center gap-y-2">
        <Image
          src="/icons/icon.png"
          alt="App Logo"
          height={510}
          width={510}
          className="h-[3rem] w-[3rem] rounded-xl shadow-inner"
        />

        <h1 className="text-lg font-bold">AI Flashcards</h1>
      </div>

      <div className="border-2 border-indigo-500 grid grid-cols-2 gap-0 w-full">
        {features.map((feature, index) => (
          <>
            {index % 2 !== 0 && (
              <Image
                src={feature.imageURL}
                alt={feature.text}
                height={571}
                width={960}
              />
            )}

            <div className="shadow-inner bg-gradient-to-r from-indigo-300 to-violet-300 p-2 flex items-center justify-center">
              {feature.text}
            </div>

            {index % 2 === 0 && (
              <Image
                src={feature.imageURL}
                alt={feature.text}
                height={571}
                width={960}
              />
            )}
          </>
        ))}
      </div>

      <Link href="/sign-up" className="btn-cta">
        Take your reviews to the next level!
      </Link>
    </div>
  );
}
