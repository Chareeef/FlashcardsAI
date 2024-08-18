"use client";
import { useEffect, useState } from "react";
import { Flashcard } from "@/types";

export default function Flashcards({
  flashcards,
}: {
  flashcards: Flashcard[];
}) {
  const [flippedFlashcards, setFlippedFlashcards] = useState<{
    [key: number]: boolean;
  }>({});

  function handleClickFlashcard(key: number) {
    setFlippedFlashcards((flippedFlashcards) => ({
      ...flippedFlashcards,
      [key]: !flippedFlashcards[key],
    }));
  }

  useEffect(() => setFlippedFlashcards({}), [flashcards]);

  return (
    <ul className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
      {flashcards.map((flashcard, index) => (
        <li
          key={index}
          className={`flex justify-center items-center text-center h-[10rem] ${flippedFlashcards[index] ? "rotateFlashcard bg-secondary text-white" : "bg-slate-200 text-black"} transition ease-in-out duration-300`}
          onClick={() => handleClickFlashcard(index)}
        >
          <div className="w-full max-h-full break-words p-2 overflow-y-auto">
            {flippedFlashcards[index] ? flashcard.back : flashcard.front}
          </div>{" "}
        </li>
      ))}
    </ul>
  );
}
