import React from "react";

import { ThemeProvider } from "styled-components";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import useUi from "./contexts/ui/useUi";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import RootNav from "./navigators/RootNav";

//Components
import Loading from "./components/Loading";

const App: React.FC = () => {
  const { theme } = useUi();

  const [loaded] = useFonts({
    EduBold: require("./fonts/EduTASBeginner-Bold.ttf"),
    EduMedium: require("./fonts/EduTASBeginner-Medium.ttf"),
    EduRegular: require("./fonts/EduTASBeginner-Regular.ttf"),
    EduSemiBold: require("./fonts/EduTASBeginner-SemiBold.ttf"),
  });

  if (!loaded) return <Loading />;

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar style={theme.title !== "light" ? "dark" : "light"} />
        <RootNav />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
