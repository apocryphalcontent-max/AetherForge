import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { SYSTEM_PROMPT_STANDARD, SYSTEM_PROMPT_THINKING } from "../constants";

// Helper to get API key securely
const getApiKey = () => process.env.API_KEY || '';

// Function definition for searching current tech specs
const searchToolDeclaration: FunctionDeclaration = {
  name: 'searchTechSpecs',
  description: 'Search for current versions, pricing, and capabilities of tools like Ollama, Hetzner, AWS, etc.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: 'The search query for the tool or technology.'
      }
    },
    required: ['query']
  }
};

export const generateStandardResponse = async (prompt: string, history: any[]) => {
  if (!process.env.API_KEY) throw new Error("API Key missing");
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use Flash for standard queries
  const model = 'gemini-2.5-flash';
  
  const chat = ai.chats.create({
    model: model,
    config: {
      systemInstruction: SYSTEM_PROMPT_STANDARD,
      tools: [{ googleSearch: {} }] // Enable grounding for up-to-date info
    },
    history: history
  });

  const result = await chat.sendMessage({ message: prompt });
  return {
    text: result.text,
    sources: result.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => {
        if (chunk.web?.uri) {
             return { uri: chunk.web.uri, title: chunk.web.title };
        }
        return null;
    }).filter(Boolean)
  };
};

export const generateDeepThoughtResponse = async (prompt: string) => {
  if (!process.env.API_KEY) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Use Pro Preview for Thinking Mode
  const model = 'gemini-3-pro-preview';

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 16000 }, // High budget for complex strategy
      systemInstruction: SYSTEM_PROMPT_THINKING,
    }
  });

  return {
    text: response.text,
    sources: []
  };
};