import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import * as Localization from "expo-localization";
import * as Location from "expo-location";
import useUi from "../ui/useUi";
import moment from "moment";
import supportedLanguages from "../../utils/supportedLanguages";

type TypeMainContext = {
  weather: Weather | undefined;
  getWeatherInfo: () => void;
  quote: Quote | undefined;
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
    getWeatherInfo();
  }, []);

  const getWeatherInfo = async () => {
    try {
      setLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") throw new Error("Permission not granted");

      const languageCode = Localization.locale.replace("-", "_").toLowerCase();

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&lang=${supportedLanguages.includes(languageCode) ? languageCode: 'en'}&units=metric`
      );

      const isDay =
        parseInt(moment().format().split("T")[1].split(":")[0]) < 18 &&
        parseInt(moment().format().split("T")[1].split(":")[0]) > 6;

      const weatherData: Weather = {
        country: data.sys.country,
        description: data.weather[0].description,
        feelsLike: data.main.feels_like,
        id: data.weather[0].id,
        city: data.name,
        temp: data.main.temp,
        day: isDay,
      };

      const { data: quotes } = await axios.get<Quote[]>(
        "https://type.fit/api/quotes"
      );

      const pikedQuote = quotes[Math.floor(Math.random() * quotes.length)];

      const language = Localization.locale.split("-")[0];

      if (language !== "en") {
        const {
          data: { text: translatedQuote },
        } = await axios.get(
          `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${yandexKey}&lang=${language}&text=${pikedQuote.text}`
        );
        setQuote({ text: translatedQuote[0], author: pikedQuote.author });
      } else setQuote(pikedQuote);

      setWeather(weatherData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContex.Provider
      value={{
        weather,
        getWeatherInfo,
        quote,
      }}
    >
      {children}
    </MainContex.Provider>
  );
};

export default MainContex;
