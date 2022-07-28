import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.font};
  font-size: 22px;
  font-family: "EduRegular";
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.font};
  text-transform: uppercase;
  font-family: "EduBold";
  font-size: 18px;
  letter-spacing: 2px;
`;

export const HeaderTitleSubtitle = styled.View``;

export const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.TouchableOpacity``;
