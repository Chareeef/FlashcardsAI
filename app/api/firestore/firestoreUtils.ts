import { doc, setDoc } from "firebase/firestore";
import { db } from "./firestore";
import { Card } from "@/types";

export async function saveFlashcardsSet(
  email: string,
  subject: string,
  flashcardsSet: Card[],
): Promise<void> {
  try {
    await setDoc(doc(db, "users", email, "flashcards", subject), {
      flashcardsSet,
    });
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
    throw error;
  }
}
