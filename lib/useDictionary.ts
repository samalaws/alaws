import { Locale } from "@/i18n";
import {
  useState,
  useEffect,
} from "react";

type lang = Locale
const useDictionary = (lang: "en" | "de" | "ar") =>  {
  const [dictionary, setDictionary] =
    useState({});

  useEffect(() => {
    const fetchDictionary =
      async () => {
        const loadedDictionary =
          await import(
            `@/dictionaries/${lang}.json`
          ).then(
            (module) => module.default
          );
        setDictionary(
          loadedDictionary.ContactPage
        );
      };
    fetchDictionary();
  }, [dictionary, lang]);

  return dictionary;
};

export default useDictionary;
