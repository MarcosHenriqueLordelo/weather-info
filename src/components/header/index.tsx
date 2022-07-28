import React from "react";
import moment from "moment";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";

import useMain from "../../contexts/main/useMain";
import useUi from "../../contexts/ui/useUi";

import {
  ActionsContainer,
  Container,
  HeaderTitleSubtitle,
  IconContainer,
  Subtitle,
  Title,
} from "./styles";

interface PropTypes {
  onShare?: () => void;
}

const Header: React.FC<PropTypes> = ({ onShare }) => {
  const { weather, loadInfo } = useMain();
  const { theme } = useUi();

  return (
    <Container>
      <HeaderTitleSubtitle>
        <Title>{moment().format("ll")}</Title>
        <Subtitle>{`${weather!.city}, ${weather!.country}`}</Subtitle>
      </HeaderTitleSubtitle>
      <ActionsContainer>
        <IconContainer style={{ marginRight: 10 }} onPress={onShare}>
          <MaterialIcon size={30} name="share" color={theme.colors.font} />
        </IconContainer>
        <IconContainer onPress={loadInfo}>
          <MaterialIcon size={32} name="refresh" color={theme.colors.font} />
        </IconContainer>
      </ActionsContainer>
    </Container>
  );
};

export default Header;
