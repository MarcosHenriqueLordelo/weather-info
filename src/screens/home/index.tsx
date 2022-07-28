import React from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";

import {
  Author,
  BuiltBy,
  BuiltByContainer,
  Container,
  Content,
  FeeledTemp,
  Header,
  HeaderTitleSubtitle,
  InfoContainer,
  Quote,
  QuoteContainer,
  Subtitle,
  Temperature,
  Title,
  WeatherCondion,
} from "./styles";

import { TouchableOpacity } from "react-native-gesture-handler";
import useMain from "../../contexts/main/useMain";
import Loading from "../../components/Loading";
import getBackGroundImage from "../../utils/getBackGroundImage";
import moment from "moment";
import useUi from "../../contexts/ui/useUi";

const Index: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { loading, strings } = useUi();
  const { weather, getWeatherInfo, quote } = useMain();

  if (!weather || loading || !quote) return <Loading />;

  return (
    <Container>
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
        <Header>
          <HeaderTitleSubtitle>
            <Title>{moment().format("ll")}</Title>
            <Subtitle>{`${weather.city}, ${weather.country}`}</Subtitle>
          </HeaderTitleSubtitle>
          <TouchableOpacity onPress={getWeatherInfo}>
            <MaterialIcon size={32} name="refresh" color={"#FFFFFF"} />
          </TouchableOpacity>
        </Header>

        <InfoContainer>
          <Temperature>{weather.temp}°</Temperature>
          <WeatherCondion>{weather.description}</WeatherCondion>
          <FeeledTemp>{`${strings.feelsLike} ${weather.feelsLike}°`}</FeeledTemp>
        </InfoContainer>

        <QuoteContainer>
          <Quote>{`"${quote.text}"`}</Quote>
          <Author>{`- ${quote.author}`}</Author>
        </QuoteContainer>
      </Content>
      <BuiltByContainer>
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
