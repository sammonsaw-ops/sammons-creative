"use client";
import { useEffect, useState } from "react";

export function useIsDesktop(breakpoint = 900) {
  const [state, setState] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const apply = () => setState(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [breakpoint]);
  return state;
}
