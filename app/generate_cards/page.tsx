"use client";
import { Card } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

function Modal({
  isModalOpen,
  setIsModalOpen,
  setCards,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setCards: Dispatch<SetStateAction<Card[]>>;
}) {
  const [subject, setSubject] = useState("");
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");

  async function handleRequest() {
    if (!subject) {
      setError("Please specify a Subject.");
      setOpenError(true);
      setTimeout(() => setOpenError(false), 3000);
      return;
    } else if (!numberOfCards) {
      setError("Please specify a Number of Cards.");
      setOpenError(true);
      setTimeout(() => setOpenError(false), 3000);
      return;
    }
    try {
      const response = await fetch("/api/generate_cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, numberOfCards }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      console.log({ data });
      console.log("data.flashcards:", data.flashcards);
      setCards(data.flashcards);
      setIsModalOpen(false);
    } catch (error) {
      setError("Something went wrong. Try again!");
      setOpenError(true);
      setTimeout(() => setOpenError(false), 3000);
    }
  }

  return (
    <div
      className={`${isModalOpen ? "fixed" : "hidden"} w-[100dvw] h-[100dvh] top-0 bg-black/40 overflow-y-auto`}
    >
      <div className="flex flex-col p-4 items-center justify-evenly gap-y-4">
        <div
          className={`${!openError && "opacity-0"} bg-red-600 w-fit rounded shadow-lg p-2 text-white text-center transition-opacity duration-300`}
        >
          {error}
        </div>
        <div className="bg-slate-300 rounded-lg min-w-[33dvw] flex flex-col items-center p-4">
          {/* Inputs */}
          <form className="flex flex-col gap-y-4 shadow-2xl border-y-2 border-gray-400 p-4 my-4">
            <legend className="text-xl font-bold mb-2">
              What would you like to learn today?
            </legend>
            <div className="flex flex-col items-center">
              <label className="font-bold">Subject</label>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="rounded border-gray-400 focus:border-gray-600 p-1 text-center mt-4"
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="font-bold">Number of Cards</label>
              <input
                type="number"
                placeholder="Number of Cards"
                value={numberOfCards > 0 ? numberOfCards : ""}
                onChange={(e) => setNumberOfCards(parseInt(e.target.value))}
                className="rounded border-gray-400 focus:border-gray-600 w-fit p-1 text-center mt-4"
              />
            </div>
          </form>

          {/* Buttons */}
          <div className="flex justify-around gap-x-4">
            <button className="btn-cta" onClick={handleRequest}>
              Generate
            </button>
            <button className="btn-close" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GenerateCards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>(
    {},
  );

  function handleClickCard(key: number) {
    setFlippedCards((flippedCards) => ({
      ...flippedCards,
      [key]: !flippedCards[key],
    }));
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 p-4 bg-tertiary text-center text-black">
      {cards.length > 0 ? (
        <>
          {" "}
          <ul className="w-full grid grid-cols-3 md:grid-cols-4 gap-2">
            {/* handle overflow */}
            {cards.map((card, index) => (
              <li
                key={index}
                className={`flex flex-col justify-center items-center p-2 bg-slate-200 h-[10rem] overflow-y-auto ${flippedCards[index] && "rotateCard"} transition ease-in-out duration-300`}
                onClick={() => handleClickCard(index)}
              >
                {flippedCards[index] ? card.back : card.front}
              </li>
            ))}
          </ul>
          <button className="btn-cta" onClick={() => setIsModalOpen(true)}>
            Generate Other Flashcards
          </button>
        </>
      ) : (
        <button className="btn-cta" onClick={() => setIsModalOpen(true)}>
          Generate New Flashcards
        </button>
      )}

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setCards={setCards}
      />
    </div>
  );
}
