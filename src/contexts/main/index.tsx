import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import * as Localization from "expo-localization";
import * as Location from "expo-location";
import useUi from "../ui/useUi";
import moment from "moment";
import supportedLanguages from "../../utils/supportedLanguages";

type TypeMainContext = {
  weather: Weather | undefined;
  quote: Quote | undefined;
  loadInfo: () => void;
};

const MainContex = createContext<TypeMainContext>({} as TypeMainContext);

export const MainProvider: React.FC = ({ children }) => {
  const weatherApiKey = "2322096a8785018ccc68d1d36a4716cc";
  const yandexKey =
    "trnsl.1.1.20220728T011216Z.cf9658c539805769.a80aed759489fcb29afcdd60b3839f5af7413226";
  const { setLoading } = useUi();

  const [weather, setWeather] = useState<Weather>();
  const [quote, setQuote] = useState<Quote>();

  useEffect(() => {
    loadInfo();
  }, []);

  const loadInfo = async () => {
    try {
      setLoading(true);
      const weatherData = await getWeather();
      const quoteData = await getQuote();

      setQuote(quoteData);
      setWeather(weatherData);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const getQuote = async (): Promise<Quote> => {
    try {
      const { data: quotes } = await axios.get<Quote[]>(
        "https://type.fit/api/quotes"
      );

      const pickedQuote = quotes[Math.floor(Math.random() * quotes.length)];

      const language = Localization.locale.split("-")[0];

      if (language !== "en") {
        const {
          data: { text: translatedQuote },
        } = await axios.get(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexKey}&lang=${language}&text=${pickedQuote.text}`
        );
        return Promise.resolve({
          text: translatedQuote[0],
          author: pickedQuote.author,
        });
      }

      return Promise.resolve(pickedQuote);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getWeather = async (): Promise<Weather> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") throw new Error("Permission not granted");

      const languageLocale = Localization.locale
        .replace("-", "_")
        .toLowerCase();
      const language = languageLocale.split("_")[0];

      const languageCode = supportedLanguages.includes(languageLocale)
        ? languageLocale
        : supportedLanguages.includes(language)
        ? language
        : "en";

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&lang=${languageCode}&units=metric`
      );

      const hour = parseInt(moment().format().split("T")[1].split(":")[0]);

      const isDay = hour < 18 && hour > 6;

      const weatherData: Weather = {
        country: data.sys.country,
        description: data.weather[0].description,
        feelsLike: data.main.feels_like,
        id: data.weather[0].id,
        city: data.name,
        temp: data.main.temp,
        day: isDay,
      };

      return Promise.resolve(weatherData);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return (
    <MainContex.Provider
      value={{
        weather,
        quote,
        loadInfo,
      }}
    >
      {children}
    </MainContex.Provider>
  );
};

export default MainContex;
