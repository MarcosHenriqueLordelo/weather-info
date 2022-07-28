import React, { createContext, useState, useEffect, useCallback } from "react";
import { DefaultTheme } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

import getStrings from "../../utils/strings";

import defaultTheme from "../../themes/defaultTeheme";
import en_us from "../../utils/strings/en_us";

type TypeUiContext = {
  strings: Strings;
  theme: DefaultTheme;
  language: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const UiContext = createContext<TypeUiContext>({} as TypeUiContext);

export const UiProvider: React.FC = ({ children }) => {
  const tokenKey = "@tccapp:token:";

  const [strings, setStrings] = useState<Strings>(en_us);
  const [theme, setTheme] = useState<DefaultTheme>(defaultTheme);
  const [language, setLanguage] = useState<string>("pt-br");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLanguage(Localization.locale.toLowerCase());
  }, []);

  useEffect(() => {
    setStrings(getStrings(language));
  }, [language]);

  return (
    <UiContext.Provider
      value={{
        strings,
        theme,
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
