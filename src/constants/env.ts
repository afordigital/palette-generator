export class Env {
    public static readonly VITE_GEMINI_API_KEY: string = import.meta.env.VITE_GEMINI_API_KEY ?? "";
    public static readonly VITE_GEMINI_URL: string = import.meta.env.VITE_GEMINI_URL ?? "";
    public static readonly VITE_API_COLOR_PIZZA: string = import.meta.env.VITE_API_COLOR_PIZZA ?? "";
}