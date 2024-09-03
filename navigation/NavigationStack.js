import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home";
import HardBoiled from "../components/HardBoiled";
import SoftBoiled from "../components/SoftBoiled";
import PoachedEggs from "../components/PoachedEggs";

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HardBoiled"
        component={HardBoiled}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SoftBoiled"
        component={SoftBoiled}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PoachedEggs"
        component={PoachedEggs}
        options={{ headerShown: false }}
      />
    </>
  );
}
