import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

// Initializing the Groq client with the API key from environment variables
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// The POST function to handle incoming requests
export async function POST(req: NextRequest) {
  // Extracting the subject from the request body
  const { subject, numberOfCards } = await req.json();

  // If no subject is provided, return a 400 Bad Request error
  if (!subject) {
    return new NextResponse(
      JSON.stringify({ error: "Subject not specified" }),
      { status: 400 },
    );
  }

  // If numberOfCards is null, return a 400 Bad Request error
  if (!numberOfCards) {
    return new NextResponse(
      JSON.stringify({ error: "numberOfCards not provided" }),
      { status: 400 },
    );
  }

  // Defining the JSON schema for the flashcard data structure
  const flashcardSchema = {
    $defs: {
      Flashcard: {
        properties: {
          front: { title: "Front", type: "string" }, // The front side of the flashcard (question/term)
          back: { title: "Back", type: "string" }, // The back side of the flashcard (answer/definition)
        },
        required: ["front", "back"], // Both front and back are required fields
        title: "Flashcard", // Name of the schema definition
        type: "object", // The schema type is an object
      },
    },
    properties: {
      flashcards: {
        items: { $ref: "#/$defs/Flashcard" }, // Each item in the flashcards array must follow the Flashcard schema
        title: "Flashcards", // Name of the flashcards array
        type: "array", // The flashcards field is an array
        length: numberOfCards, // The array is expected to have 10 items
      },
    },
    required: ["flashcards"], // The flashcards field is required in the schema
    title: "Flashcard Set", // Name of the top-level schema
    type: "object", // The schema type is an object
  };

  // Stringifying the schema to include in the system prompt
  const jsonSchema = JSON.stringify(flashcardSchema, null, 4);

  // Creating the system prompt with the flashcard schema
  const systemPrompt = `You are a flashcard generator that outputs flashcards in JSON.\nThe JSON object must use the schema: ${jsonSchema}`;

  try {
    // Sending a request to Groq API to generate flashcards based on the subject
    const chat_completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt, // The system prompt that defines the role and schema
        },
        {
          role: "user",
          content: `Generate a list of flashcards about ${subject}`, // User request to generate flashcards
        },
      ],
      model: "mixtral-8x7b-32768", // Model used for generating the flashcards
      temperature: 0, // Temperature set to 0 for deterministic results
      stream: false, // No streaming; the response is returned as a whole
      response_format: { type: "json_object" }, // The expected response format is a JSON object
    });

    // Parsing the response content to get the flashcard set
    const flashcardSet = JSON.parse(
      chat_completion.choices[0].message.content as string,
    );

    // Returning the generated flashcard set with a 200 OK status
    return new NextResponse(JSON.stringify(flashcardSet), { status: 200 });
  } catch (error) {
    // Handling any errors that occur during the process
    return new NextResponse(JSON.stringify({ error: error?.toString() }), {
      status: 500, // Returning a 500 Internal Server Error status
    });
  }
}
