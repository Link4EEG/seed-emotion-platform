import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "seed-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  // hydrate from localStorage once
  useEffect(() => {
    const v = (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? "ko";
    setLangState(v === "en" ? "en" : "ko");
    document.documentElement.lang = v === "en" ? "en" : "ko";
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
    document.documentElement.lang = l === "en" ? "en" : "ko";
  }

  return (
    <LangContext.Provider value={{ lang, setLang, toggle: () => setLang(lang === "ko" ? "en" : "ko") }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const v = useContext(LangContext);
  if (!v) throw new Error("useLang must be used inside LangProvider");
  return v;
}
