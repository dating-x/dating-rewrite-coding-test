import 'vue-router';
import type { AppConfig } from "@/Types/General";

export interface Metas {
  title: string;
  description: string;
  keywords: string;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent;
}

declare global {
  interface Window {
    appConfig: AppConfig;
  }
  type Nullable<T> = T | null;
}
