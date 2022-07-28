import React, { createContext, useState, useEffect, useCallback } from "react";
import { DefaultTheme } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

import getStrings from "../../utils/strings";

import themeLight from "../../themes/light";
import themeDark from "../../themes/dark";
import en_us from "../../utils/strings/en_us";

type TypeUiContext = {
  strings: Strings;
  theme: DefaultTheme;
  language: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme(): void;
};

const UiContext = createContext<TypeUiContext>({} as TypeUiContext);

export const UiProvider: React.FC = ({ children }) => {
  const tokenKey = "@tccapp:token:";

  const [strings, setStrings] = useState<Strings>(en_us);
  const [theme, setTheme] = useState<DefaultTheme>(themeLight);
  const [language, setLanguage] = useState<string>("pt-br");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLanguage(Localization.locale.toLowerCase());

    const loadStoragedData = async () => {
      setLoading(true);

      const themeData = await AsyncStorage.getItem(tokenKey + "theme");

      if (themeData !== null)
        setTheme(themeData === "light" ? themeLight : themeDark);

      setLoading(false);
    };

    loadStoragedData();
  }, []);

  useEffect(() => {
    setStrings(getStrings(language));
  }, [language]);

  useEffect(() => {
    AsyncStorage.setItem(tokenKey + "theme", theme.title);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === "light" ? themeDark : themeLight);
  }, [theme]);

  return (
    <UiContext.Provider
      value={{
        strings,
        theme,
        toggleTheme,
        language,
        loading,
        setLoading,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export default UiContext;
