/// <reference types="vite/client" />
import "react";
declare module "react" {
  interface CSSProperties {
    "--color"?: string;
    "--hoverColor"?: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
