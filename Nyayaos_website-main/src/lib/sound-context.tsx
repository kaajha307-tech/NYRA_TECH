import { useRef, type ReactNode } from "react";

// Sound feature removed. These exports are kept as no-op shims so existing
// imports across the app continue to work without changes.

export function SoundProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useSound() {
  return { enabled: false, toggle: () => {}, setZone: () => {}, zone: "default" as const };
}

export function useSoundZone(_zone?: string) {
  return useRef<HTMLElement | null>(null);
}
