import { NextRequest, NextResponse } from "next/server";
import { getFlashcardsSetsIds } from "../firestoreUtils";

/**
 * Handles POST requests to retrieve all flashcards sets' IDs (subjects) for a user.
 *
 * This route expects a JSON payload containing:
 * - `email`: The email of the user.
 *
 * The function fetches all the document IDs (which correspond to the subjects)
 * in the `flashcards` collection for the specified user in Firestore.
 * If the email is missing or an error occurs during the fetch operation,
 * an appropriate error response is returned.
 */
export async function POST(req: NextRequest) {
  const { email } = await req.json();

  // Validate the email parameter
  if (!email) {
    return new NextResponse(
      JSON.stringify({ error: "Please specify the email" }),
      { status: 400 },
    );
  }

  try {
    // Retrieve the flashcards sets' IDs from Firestore
    const subjects = await getFlashcardsSetsIds(email);
    return new NextResponse(JSON.stringify({ subjects }), { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong. Try again later." }),
      { status: 500 },
    );
  }
}
