import { Locale } from "@/i18n";
import {
  useState,
  useEffect,
} from "react";

type lang = Locale
const useDictionary = () =>  {
  const [dictionary, setDictionary] =
    useState({});

  useEffect(() => {
    const fetchDictionary =
      async () => {
        const loadedDictionary =
          await import(
            `@/dictionaries/en.json`
          ).then(
            (module) => module.default
          );
        setDictionary(
          loadedDictionary.ContactPage
        );
      };
    fetchDictionary();
  }, [dictionary]);

  return dictionary;
};

export default useDictionary;
