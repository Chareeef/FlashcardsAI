import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firestore";
import { Card } from "@/types";

// Function to save a flashcards set
export async function saveFlashcardsSet(
  email: string,
  subject: string,
  flashcardsSet: Card[],
): Promise<void> {
  try {
    await setDoc(doc(db, "users", email, "flashcards", subject), {
      flashcardsSet,
    });
  } catch (error) {
    console.error("Error writing document: ", error);
    throw error;
  }
}

// Function to get all flashcards sets IDs (subjects) for a user
export async function getFlashcardsSetsIds(email: string): Promise<string[]> {
  try {
    const flashcardsCollectionRef = collection(
      db,
      "users",
      email,
      "flashcards",
    );
    const snapshot = await getDocs(flashcardsCollectionRef);

    const subjects = snapshot.docs.map((doc) => doc.id);
    return subjects;
  } catch (error) {
    console.error("Error fetching flashcards sets IDs: ", error);
    throw error;
  }
}

// Function to get a specific flashcards set by subject for a user
export async function getFlashcardsSet(
  email: string,
  subject: string,
): Promise<Card[] | null> {
  try {
    const flashcardsDocRef = doc(db, "users", email, "flashcards", subject);
    const docSnap = await getDoc(flashcardsDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data?.flashcardsSet || null;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching flashcards set: ", error);
    throw error;
  }
}
