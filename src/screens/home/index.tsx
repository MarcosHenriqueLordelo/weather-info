import React, { useCallback, useRef } from "react";
import { Alert, Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";

import {
  Author,
  BuiltBy,
  BuiltByContainer,
  Container,
  Content,
  FeeledTemp,
  InfoContainer,
  Quote,
  QuoteContainer,
  Temperature,
  WeatherCondion,
} from "./styles";

import useMain from "../../contexts/main/useMain";
import useUi from "../../contexts/ui/useUi";

import Loading from "../../components/Loading";
import Header from "../../components/header";

import getBackGroundImage from "../../utils/getBackGroundImage";

const Index: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { loading, strings } = useUi();
  const { weather, quote } = useMain();
  const captureView = useRef(null);

  const onShare = useCallback(async () => {
    try {
      const result = await captureRef(captureView, {
        quality: 1,
        format: "png",
      });

      await Sharing.shareAsync(result);
    } catch (err) {
      Alert.alert(
        "Algo deu errado",
        "Algo deu errado durante o compartilhamento, tente novamente mais tarde"
      );
    }
  }, [captureView]);

  if (!weather || loading || !quote) return <Loading />;

  return (
    <Container collapsable={false} ref={captureView}>
      <Image
        source={getBackGroundImage(weather.id, weather.day)}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        resizeMethod="resize"
      />
      <View
        style={{
          height: insets.top,
          width: "100%",
        }}
      />
      <Content>
        <Header onShare={onShare} />

        <InfoContainer>
          <Temperature>{weather.temp}°</Temperature>
          <WeatherCondion>{weather.description}</WeatherCondion>
          <FeeledTemp>{`${strings.feelsLike} ${weather.feelsLike}°`}</FeeledTemp>
        </InfoContainer>

        <QuoteContainer>
          <Quote>"{quote.text}"</Quote>
          <Author>- {quote.author}</Author>
        </QuoteContainer>
      </Content>
      <BuiltByContainer
        onPress={() =>
          Linking.openURL(
            "https://www.linkedin.com/in/marcos-marques-681167146/"
          )
        }
      >
        <BuiltBy>Built By Marcos Marques</BuiltBy>
      </BuiltByContainer>
      <View
        style={{
          height: insets.bottom,
          width: "100%",
        }}
      />
    </Container>
  );
};

export default Index;
