import { NextRequest, NextResponse } from "next/server";
import { saveFlashcardsSet } from "../firestoreUtils";

export async function POST(req: NextRequest) {
  const { email, subject, flashcardsSet } = await req.json();

  if (!email || !subject || !Array.isArray(flashcardsSet)) {
    return new NextResponse(
      JSON.stringify({
        error: "Please specify email, subject and flashcardsSet",
      }),
      { status: 400 },
    );
  }

  try {
    await saveFlashcardsSet(email, subject, flashcardsSet);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Something went wrong. Try again later.",
      }),
      { status: 500 },
    );
  }

  return new NextResponse(
    JSON.stringify({
      success: `Flashcards set "${subject}" successfully created for ${email}!`,
    }),
    { status: 201 },
  );
}
