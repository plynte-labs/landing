// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { translations, type TranslationValue } from "../data/translations";

export type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 1. Prioriza localStorage
    const saved = localStorage.getItem("plynte_lang");
    if (saved === "es" || saved === "en") return saved;
    
    // 2. Por defecto es Español ('es') para la audiencia de habla hispana
    return "es";
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("plynte_lang", lang);
  }, []);

  // SEO dinámico nativo: actualiza el atributo lang del HTML ante cambios de idioma
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Función traductora ligera que navega objetos anidados (ej. t('navbar.inicio'))
  const t = useCallback((key: string): string => {
    const keys = key.split(".");
    let current: TranslationValue = translations[language];

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        return key; // Fallback: retorna la clave si no la encuentra
      }
    }

    return typeof current === "string" ? current : key;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
};
