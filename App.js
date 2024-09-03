import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import HowTo from "./components/How-To's/howTosPage";
import VideoPlayerScreen from "./components/videoPlayerScreen"; // Add this screen if you have one
import RecipeScreen from "./components/Recipe/recipe";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="HowTo">
        <Stack.Screen 
          name="HowTo" 
          component={HowTo} 
          options={{ headerShown: false }} // Hide header if using custom header
        />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      </Stack.Navigator> */}
      <Stack.Navigator initialRouteName="Recipe">
        <Stack.Screen 
          name="Recipe" 
          component={RecipeScreen} 
          options={{ headerShown: false }} // Hide header if using custom header
        />
        {/* <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} /> */}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
