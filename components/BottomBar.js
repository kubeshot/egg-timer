import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BottomBar = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={styles.navigationButton}
        >
          <Image source={require("../assets/images/frame-189.png")} />
          <Text style={styles.navigationButtonText}>EGG TIMER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => {
            navigation.navigate("Recipe");
          }}
        >
          <Image source={require("../assets/images/frame-190.png")} />
          <Text style={styles.navigationButtonText}>RECIPES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => {
            navigation.navigate("HowTo");
          }}
        >
          <Image source={require("../assets/images/frame-191.png")} />
          <Text style={styles.navigationButtonText}>HOW-TOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Image source={require("../assets/images/frame-1911.png")} />
          <Text style={styles.navigationButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 36,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  navigationButton: {
    alignItems: "center",
    gap: 8,
  },

  navigationButtonText: {
    fontSize: 10,
    fontFamily: "Inter-Bold",
  },
});

export default BottomBar;
