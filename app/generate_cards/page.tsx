"use client";
import { Dispatch, SetStateAction, useState } from "react";

function Modal({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`${isModalOpen ? "fixed" : "hidden"} w-[100dvw] h-[100vh] top-0 flex items-center justify-center bg-black/20`}
    >
      <div className="bg-slate-300 rounded-lg w-[33dvw] flex flex-col items-center p-4">
        {/* Inputs */}

        {/* Buttons */}
        <div className="flex justify-around gap-x-4">
          <button className="btn-cta" onClick={() => setIsModalOpen(false)}>
            Generate
          </button>
          <button className="btn-close" onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GenerateCards() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-[70vh] flex flex-col items-center p-4 bg-tertiary text-center text-black">
      <button className="btn-cta" onClick={() => setIsModalOpen(true)}>
        Generate New Flashcards
      </button>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
