import { useEffect, useState } from "react";

export type Selectors = string[] | string;

export function useDomQuery<T>(
  selectors: Selectors,
  deps: Parameters<typeof useEffect>[1] = []
) {
  const [ref, setRef] = useState<T | undefined>(undefined);
  useEffect(() => {
    let node;
    if (typeof selectors === "string") node = document.querySelector(selectors);
    else
      for (let i = 0; i < selectors.length && !node; i++) {
        node = document.querySelector(selectors[i]);
      }
    setRef(node);
  }, deps);
  return ref;
}
