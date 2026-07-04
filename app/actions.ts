'use server'

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // Hardcode it here for one minute
  baseURL: "https://api.groq.com/openai/v1", 
});

export async function processSummarization(text: string, mode: string = "general") {
  const instructions: Record<string, string> = {
    meeting: "Act as a Project Manager. Output professional meeting minutes with a table for Action Items.",
    article: "Act as an Editor. Output a 3-bullet point TL;DR and a 'Key Insights' section.",
    code: "Act as a Senior Developer. Explain the functionality, potential bugs, and how to improve the performance of this code snippet.",
    general: "Provide a concise, neutral summary of the provided text."
  };

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: instructions[mode] || instructions.general },
        { role: "user", content: `Summarize this: ${text}` }
      ],
    });
    return { summary: completion.choices[0].message.content };
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("Failed to process.");
  }
}