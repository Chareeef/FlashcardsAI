"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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

  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-around overflow-hidden gap-y-4 p-4 bg-tertiary text-center text-black">
      <div className="flex flex-col items-center gap-y-2">
        <Image
          src="/icons/icon.png"
          alt="App Logo"
          height={510}
          width={510}
          className="h-[3rem] w-[3rem] rounded-xl shadow-inner"
          data-aos="fade-left"
        />

        <h1 className="text-lg font-bold" data-aos="fade-right">
          AI Flashcards
        </h1>
      </div>

      <ul className="flex flex-col gap-0 w-full" data-aos="zoom-out-up">
        {features.map((feature, index) => (
          <li className="w-full grid grid-cols-2 gap-0" key={index}>
            {index % 2 !== 0 && (
              <Image
                src={feature.imageURL}
                alt={feature.text}
                height={571}
                width={960}
                data-aos="zoom-out-right"
                className="border-y-2 border-l-2 border-r border-indigo-500"
              />
            )}

            <div
              className={`${index % 2 === 0 ? "border-l-2" : "border-r-2"} border-y-2 border-indigo-500 shadow-inner bg-gradient-to-r from-indigo-300 to-violet-300 p-2 flex items-center justify-center`}
              data-aos="zoom-in"
            >
              {feature.text}
            </div>

            {index % 2 === 0 && (
              <Image
                src={feature.imageURL}
                alt={feature.text}
                height={571}
                width={960}
                className="border-y-2 border-r-2 border-l border-indigo-500"
                data-aos="zoom-out-left"
              />
            )}
          </li>
        ))}
      </ul>

      <Link href="/sign-up" className="btn-cta my-4" data-aos="zoom-in-right">
        Take Your Reviews To The Next Level !
      </Link>
    </div>
  );
}
