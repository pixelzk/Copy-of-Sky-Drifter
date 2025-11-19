import { GoogleGenAI, Type } from "@google/genai";
import { BirdThought } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBirdThought = async (): Promise<BirdThought> => {
  const ai = getClient();
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a short, funny, or philosophical internal thought for a seagull flying over the ocean. Keep it under 15 words.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            thought: {
              type: Type.STRING,
              description: "The internal monologue of the seagull",
            },
            mood: {
              type: Type.STRING,
              enum: ['happy', 'hungry', 'philosophical', 'sassy'],
              description: "The mood of the thought",
            }
          },
          required: ["thought", "mood"],
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as BirdThought;
    }
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Error generating bird thought:", error);
    return {
      thought: "Squawk? Where are the fries?",
      mood: 'hungry'
    };
  }
};
