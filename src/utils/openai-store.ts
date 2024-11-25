type Listener = () => void;

const STORAGE_KEY = "openai_api_key";

const openAIStore = {
  listeners: new Set<Listener>(),

  getApiKey: () => {
    return localStorage.getItem(STORAGE_KEY) || "";
  },

  setApiKey: (key: string) => {
    localStorage.setItem(STORAGE_KEY, key);
    openAIStore.emitChange();
  },

  subscribe: (listener: Listener) => {
    openAIStore.listeners.add(listener);
    return () => {
      openAIStore.listeners.delete(listener);
    };
  },

  emitChange: () => {
    openAIStore.listeners.forEach((listener) => listener());
  },
};

export default openAIStore;
