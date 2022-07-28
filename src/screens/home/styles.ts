import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 16px 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  color: #ffffff;
  font-size: 22px;
  font-family: "EduRegular";
`;

export const Subtitle = styled.Text`
  color: #ffffff;
  text-transform: uppercase;
  font-family: "EduBold";
  font-size: 18px;
  letter-spacing: 2px;
`;

export const HeaderTitleSubtitle = styled.View``;

export const InfoContainer = styled.View`
  margin-top: 70px;
`;

export const Temperature = styled.Text`
  color: #ffffff;
  font-family: "EduBold";
  font-size: 80px;
`;

export const WeatherCondion = styled.Text`
  color: #ffffff;
  font-size: 36px;
  font-family: "EduSemiBold";
  text-transform: capitalize;
`;

export const FeeledTemp = styled.Text`
  color: #ffffff;
  font-size: 22px;
  font-family: "EduRegular";
`;

export const QuoteContainer = styled.View`
  margin-top: 100px;
`;

export const Quote = styled.Text`
  color: #ffffff;
  font-family: "EduRegular";
  font-size: 22px;
  text-align: center;
`;

export const Author = styled.Text`
  color: #ffffff;
  font-family: "EduMedium";
  font-size: 18px;
  text-align: center;
  margin-top: 8px;
`;

export const BuiltByContainer = styled.TouchableOpacity`
  align-self: center;
  background-color: ${({ theme }) => theme.colors.section};
  border-radius: 12px;
  padding: 6px 12px;
  margin-bottom: 16px;
`;

export const BuiltBy = styled.Text`
  font-family: "EduMedium";
  color: #ffffff;
`;
