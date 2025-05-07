import OpenAI from "openai";

const OPENAI_API_KEY: string = process.env.REACT_APP_OPENAI_API_KEY || '';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for browser use
});

export async function getChatbotResponse(userMessage: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: userMessage },
    ],
  });
  return completion.choices[0]?.message?.content || "Sorry, I couldn't think of a reply!";
} 