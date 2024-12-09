import { Env } from "@/constants/env";
import geminiStore from "./gemini-store";
import { toast } from "sonner";

interface AIColorGeneratorOptions {
  onSuccess: (color: string) => void;
  onError?: (error: Error) => void;
  onKeyRequired: () => void;
  prompt?: string;
}

export async function generateAIColor({
  onSuccess,
  onError,
  onKeyRequired,
  prompt,
}: AIColorGeneratorOptions) {
  const apiKey = geminiStore.getApiKey();

  if (!apiKey) {
    onKeyRequired();
    return;
  }

  try {
    const response = await fetch(
      Env.VITE_GEMINI_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${
                    prompt ||
                    "Generate a color that would work well for a modern software application, considering contrast ratios, accessibility, and current UI/UX trends."
                  } Respond only with a single hex color code.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "API request failed");
    }

    const data = await response.json();

    const generatedColor = data.candidates[0].content.parts[0].text.trim();

    // Extraer solo el código hex si viene con texto adicional
    const hexColor = generatedColor.match(/#[0-9A-F]{6}/i)?.[0];

    if (!hexColor || !/^#[0-9A-F]{6}$/i.test(hexColor)) {
      throw new Error("Invalid color format received");
    }

    onSuccess(hexColor);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      if (
        err.message.includes("401") ||
        err.message.includes("invalid_api_key")
      ) {
        geminiStore.setApiKey("");
        onKeyRequired();
      }
      onError?.(err);
    }
    toast.error("Failed to generate AI palette");
  }
}

