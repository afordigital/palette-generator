import { Env } from "@/constants/env";

interface IGeminiAPI {
  getApiKey: () => string;
  setApiKey: (key: string) => void;
  subscribe: (listener: Listener) => () => void;
}

type Listener = () => void;

let apiKey: string = Env.VITE_GEMINI_API_KEY;
let listeners: Listener[] = [];

function emit() {
  listeners.forEach((listener) => listener());
}
 class GeminiAPI implements IGeminiAPI {
  public getApiKey(): string {
    return apiKey;
  };

  public setApiKey(key: string): void { 
    apiKey = key;
    localStorage.setItem("gemini_api_key", key);
    emit();
  };

  public subscribe(listener: Listener): () => void {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

}

export default new GeminiAPI();