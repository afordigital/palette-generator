import openAIStore from "./openai-store";
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
  const apiKey = openAIStore.getApiKey();

  if (!apiKey) {
    onKeyRequired();
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a color palette generator specialized in creating colors for software development, web applications, and user interfaces. Consider accessibility, readability, and modern design trends. Respond only with a single hex color code that would work well as a primary or accent color.",
          },
          {
            role: "user",
            content:
              prompt ||
              "Generate a color that would work well for a modern software application, considering contrast ratios, accessibility, and current UI/UX trends.",
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    const generatedColor = data.choices[0].message.content.trim();

    if (!/^#[0-9A-F]{6}$/i.test(generatedColor)) {
      throw new Error("Invalid color format received");
    }

    onSuccess(generatedColor);
  } catch (err) {
    console.error(err);
    toast.error("Failed to generate AI palette");
    if (err instanceof Error) {
      if (err.message.includes("401")) {
        openAIStore.setApiKey("");
        onKeyRequired();
      }
      onError?.(err);
    }
  }
}
