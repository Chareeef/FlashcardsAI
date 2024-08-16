import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firestore";
import { Flashcard } from "@/types";

// Function to save a flashcards set
export async function saveFlashcardsSet(
  userId: string,
  subject: string,
  flashcardsSet: Flashcard[],
): Promise<void> {
  try {
    await setDoc(doc(db, "users", userId, "flashcards", subject), {
      flashcardsSet,
    });
  } catch (error) {
    console.error("Error writing document: ", error);
    throw error;
  }
}

// Function to get all flashcards sets IDs (subjects) for a user
export async function getFlashcardsSetsIds(userId: string): Promise<string[]> {
  try {
    const flashcardsCollectionRef = collection(
      db,
      "users",
      userId,
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
  userId: string,
  subject: string,
): Promise<Flashcard[] | null> {
  try {
    const flashcardsDocRef = doc(db, "users", userId, "flashcards", subject);
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
