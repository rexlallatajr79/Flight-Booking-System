
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTravelSuggestions = async (destination: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest top 3 things to do and a travel tip for ${destination}. Keep it brief and travel-oriented. Return as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Top 3 activities'
            },
            tip: {
              type: Type.STRING,
              description: 'Pro travel tip'
            }
          },
          required: ['suggestions', 'tip']
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const getFlightPriceAlertReasoning = async (origin: string, dest: string, date: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze if flight prices from ${origin} to ${dest} around ${date} are typically high or low. Provide a short 1-sentence prediction.`,
      });
      return response.text;
    } catch (error) {
      return "Price predictions currently unavailable.";
    }
}
