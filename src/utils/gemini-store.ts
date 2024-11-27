type Listener = () => void;

let apiKey: string | null = import.meta.env.VITE_GEMINI_API_KEY ?? null;
let listeners: Listener[] = [];

function emit() {
  listeners.forEach((listener) => listener());
}

const geminiStore = {
  getApiKey: () => apiKey,
  setApiKey: (key: string) => {
    apiKey = key;
    localStorage.setItem("gemini_api_key", key);
    emit();
  },
  subscribe: (listener: Listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

export default geminiStore;
