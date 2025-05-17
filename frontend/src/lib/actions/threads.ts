'use server';

import { GoogleGenAI } from "@google/genai";

export const generateThreadName = async (message: string): Promise<string> => {
  try {
    // Default name in case the API fails
    const defaultName =
      message.trim().length > 50
        ? message.trim().substring(0, 47) + '...'
        : message.trim();

    // Gemini API key
    const apiKey = "AIzaSyDIdc9A-07LQKRHqnQKUbFvoiYTu-17in8";

    if (!apiKey) {
      console.error('Gemini API key not found');
      return defaultName;
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Generate an extremely brief title (2-4 words only) for a chat thread that starts with this message: "${message}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });

    const generatedName = response.text.trim();

    // Return the generated name or default if empty
    return generatedName || defaultName;
  } catch (error) {
    console.error('Error generating thread name:', error);
    // Fall back to using a truncated version of the message
    return message.trim().length > 50
      ? message.trim().substring(0, 47) + '...'
      : message.trim();
  }
};
