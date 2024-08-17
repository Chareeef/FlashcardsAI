"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import ErrorAlert from "../components/Error";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { showError } from "../utils";
import { Flashcard } from "@/types";
import Flashcards from "../components/Flashcards";

function FlashcardsModal({
  subject,
  flashcards,
  isOpenFlashcardsModal,
  setIsOpenFlashcardsModal,
}: {
  subject: string;
  flashcards: Flashcard[];
  isOpenFlashcardsModal: boolean;
  setIsOpenFlashcardsModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`${isOpenFlashcardsModal ? "fixed" : "hidden"} w-[100dvw] h-[100dvh] flex flex-col items-center justify-center top-0 left-0 p-4 bg-black/40`}
    >
      <div className="h-[95dvh] overflow-y-auto">
        <div className="relative flex flex-col items-center justify-evenly p-4 gap-y-4 bg-white">
          <button
            onClick={() => setIsOpenFlashcardsModal(false)}
            className="absolute top-4 right-4 bg-red-600 w-4 h-4 flex flex-col items-center justify-center rounded-full p-4 text-white font-bold"
          >
            X
          </button>
          <h2 className="font-bold text-xl">{subject}</h2>
          <Flashcards flashcards={flashcards} />
        </div>
      </div>
    </div>
  );
}

function FlashcardsSubjects({
  flashcardsSubjects,
  openFlashcardsSet,
}: {
  flashcardsSubjects: string[];
  openFlashcardsSet: (subject: string) => Promise<void>;
}) {
  return (
    <ul className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full">
      {flashcardsSubjects.map((subject, index) => (
        <li
          key={index}
          onClick={() => openFlashcardsSet(subject)}
          className="relative h-[10rem] shadow-inner border border-slate-400 rounded-r-lg bg-slate-200"
        >
          <div className="absolute h-full w-full bg-slate-200 top-1 left-1 border border-slate-400 rounded-r-lg">
            <div className="flex justify-center items-center absolute h-full w-full bg-slate-200 top-1 left-1 border border-slate-400 rounded-r-lg break-words">
              {subject}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const { user, isLoaded } = useUser();
  const [flashcardsSubjects, setFlashcardsSubjects] = useState<string[]>([]);
  const [openedFlashcards, setOpenedFlashcards] = useState<Flashcard[]>([]);
  const [openedSubject, setOpenedSubject] = useState<string>("");
  const [isOpenFlashcardsModal, setIsOpenFlashcardsModal] =
    useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isLoaded || !user) {
      return;
    }

    const getSubjects = async () => {
      try {
        const response = await fetch("/api/firestore/get_flashcards_subjects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setFlashcardsSubjects(data.subjects);
      } catch (error) {
        showError("Something went wrong. Try again!", setError, setOpenError);
      }
    };

    getSubjects();
  }, [user, isLoaded]);

  if (!isLoaded || !user) {
    return (
      <div className="grow flex flex-col items-center justify-center">
        <p className="font-bold text-white ">Wait a moment...</p>
      </div>
    );
  }

  async function openFlashcardsSet(subject: string) {
    try {
      const response = await fetch("/api/firestore/get_flashcards_set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id, subject }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setOpenedSubject(subject);
      setOpenedFlashcards(data.flashcardsSet);
      setIsOpenFlashcardsModal(true);
    } catch (error) {
      showError("Something went wrong. Try again!", setError, setOpenError);
    }
  }

  return (
    <>
      <ErrorAlert error={error} openError={openError} />
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
        <Link href="/generate_flashcards" className="btn-cta mb-4">
          Generate New Flashcards
        </Link>

        <div className="w-full flex flex-col p-4 items-center border-4 border-indigo-800 rounded-lg">
          {flashcardsSubjects.length > 0 ? (
            <FlashcardsSubjects
              flashcardsSubjects={flashcardsSubjects}
              openFlashcardsSet={openFlashcardsSet}
            />
          ) : (
            <h2 className="italic">No Flashcards Yet</h2>
          )}
        </div>
      </div>

      <FlashcardsModal
        flashcards={openedFlashcards}
        isOpenFlashcardsModal={isOpenFlashcardsModal}
        setIsOpenFlashcardsModal={setIsOpenFlashcardsModal}
        subject={openedSubject}
      />
    </>
  );
}
