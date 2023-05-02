import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routers from "../client/Routers/index";
import LoginProvider from "./Context/LoginProvider";
import HistoryProvider from "./Context/HistoryProvider";

const App = () => {
  return (
    <LoginProvider>
      <NavigationContainer>
        <HistoryProvider>
          <Routers />
        </HistoryProvider>
      </NavigationContainer>
    </LoginProvider>
  );
};
export default App;
