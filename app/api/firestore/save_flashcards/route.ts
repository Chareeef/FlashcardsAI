import { NextRequest, NextResponse } from "next/server";
import { saveFlashcardsSet } from "../firestoreUtils";

/**
 * Handles POST requests to save a flashcards set for a user.
 *
 * This route expects a JSON payload containing:
 * - `email`: The email of the user.
 * - `subject`: The subject (ID) of the flashcards set.
 * - `flashcardsSet`: An array of flashcards (of type `Card`) to be saved.
 *
 * If the provided data is valid, the flashcards set is saved to Firestore
 * under the user's document. If any required data is missing, or if an error
 * occurs during the save operation, an appropriate error response is returned.
 */
export async function POST(req: NextRequest) {
  const { email, subject, flashcardsSet } = await req.json();

  // Validate the input data
  if (!email || !subject || !Array.isArray(flashcardsSet)) {
    return new NextResponse(
      JSON.stringify({
        error: "Please specify email, subject and flashcardsSet",
      }),
      { status: 400 },
    );
  }

  try {
    // Save the flashcards set to Firestore
    await saveFlashcardsSet(email, subject, flashcardsSet);
  } catch (error) {
    // Handle any errors that occur during the save operation
    return new NextResponse(
      JSON.stringify({
        error: "Something went wrong. Try again later.",
      }),
      { status: 500 },
    );
  }

  // Return a success response
  return new NextResponse(
    JSON.stringify({
      success: `Flashcards set "${subject}" successfully created for ${email}!`,
    }),
    { status: 201 },
  );
}
