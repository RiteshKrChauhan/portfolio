"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import { createLenis } from "@/lib/smooth-scroll";
import type { ReactNode } from "react";
import type Lenis from "lenis";

const LenisContext = createContext<{ lenis: Lenis | null }>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = createLenis();
    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  );
}
