import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import SubscribeScreen from "./News Letter Signup/newsLetterSignup";
import HowTo from "./How-To's/howTosPage"; // Make sure to import the HowTo component
import RecipeScreen from "./Recipe/recipe";

const BottomBar = () => {
  const navigation = useNavigation();
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const [isHowToModalVisible, setIsHowToModalVisible] = useState(false);

  const handleClose = () => {
    setIsSignUpModalVisible(false);
    setIsHowToModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.navigationButton}
        >
          <Image source={require("../assets/images/frame-189.png")} />
          <Text style={styles.navigationButtonText}>EGG TIMER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => navigation.navigate("Recipe")}
        >
          <Image source={require("../assets/images/frame-190.png")} />
          <Text style={styles.navigationButtonText}>RECIPES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => setIsHowToModalVisible(true)}
        >
          <Image source={require("../assets/images/frame-191.png")} />
          <Text style={styles.navigationButtonText}>HOW-TOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() => setIsSignUpModalVisible(true)}
        >
          <Image source={require("../assets/images/frame-1911.png")} />
          <Text style={styles.navigationButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isSignUpModalVisible}
        onRequestClose={handleClose}
      >
        <SubscribeScreen onClose={handleClose} />
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isHowToModalVisible}
        onRequestClose={handleClose}
      >
        <HowTo onClose={handleClose} />
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isHowToModalVisible}
        onRequestClose={handleClose}
      >
        <RecipeScreen onClose={handleClose} />
      </Modal>
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