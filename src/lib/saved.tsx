import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type SavedAdvice = {
  id: string;
  text: string;
  question?: string;
  source: string;
  createdAt: number;
};

const STORAGE_KEY = "kisan-saathi-saved-advice";

type Ctx = {
  items: SavedAdvice[];
  add: (item: Omit<SavedAdvice, "id" | "createdAt">) => void;
  remove: (id: string) => void;
  has: (text: string) => boolean;
};

const SavedContext = createContext<Ctx | null>(null);

export function SavedAdviceProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SavedAdvice[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as SavedAdvice[]);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: SavedAdvice[]) => {
    setItems(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const value = useMemo<Ctx>(
    () => ({
      items,
      add: (item) =>
        persist([
          { ...item, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, createdAt: Date.now() },
          ...items,
        ]),
      remove: (id) => persist(items.filter((i) => i.id !== id)),
      has: (text) => items.some((i) => i.text === text),
    }),
    [items],
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSavedAdvice() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSavedAdvice must be used inside SavedAdviceProvider");
  return ctx;
}
