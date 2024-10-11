import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import NavigationStack from "./navigation/NavigationStack";
import { StatusBar } from "expo-status-bar";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { translations } from "./translations"; // Make sure this file exists

import { useKeepAwake } from "expo-keep-awake"; // Import KeepAwake

const i18n = new I18n(translations);

export default function App() {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Kaleko-Bold": require("./assets/fonts/Kaleko205Round-Bold.ttf"),
  });

  useKeepAwake(); // Keeps the app awake

  useEffect(() => {
    const initializeI18n = () => {
      const deviceLocale = Localization.locale;
      i18n.locale = deviceLocale;
      i18n.enableFallback = true;
      setIsI18nInitialized(true);
    };
    initializeI18n();
  }, []);

  if (!fontsLoaded || !isI18nInitialized) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Export i18n instance to use in other components
export { i18n };
