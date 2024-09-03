import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomBar from "./BottomBar";
import { useNavigation } from "@react-navigation/native";

const Timer = ({ route }) => {
  const navigation = useNavigation();
  // console.log(route.params);

  const [heading, setHeading] = useState("");
  const [doneNess, setDoneNess] = useState("");


  useEffect(() => {
    if (route.params && route.params.eggStyle) {
      setHeading(route.params.eggStyle);
    }
    if (route.params && route.params.doneNess) {
      setDoneNess(route.params.doneNess);
    }
  });

  return (
    <>
      <ImageBackground
        source={require("../assets/images/hardboiledbackground-1.png")}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backButton}
            >
              <Image source={require("../assets/images/btnback-arrow.png")} />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Image source={require("../assets/images/Logo.png")} />
            </View>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.innerContainer}>
            <View style={styles.uppperButtonsContainer}>
              <Text style={styles.heading}>{heading} Eggs</Text>
              <TouchableOpacity style={styles.instructionsButton}>
                <Text style={styles.instructionsText}>{doneNess} Doneness</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity style={styles.cancelTimerButton}>
                <Text style={[styles.eggsTimerButtonText, { color: "black" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pauseTimerButton}>
                <Text style={[styles.eggsTimerButtonText, { color: "white" }]}>
                  Pause Timer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>

      <BottomBar />
    </>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingTop: 48,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  backButton: {
    backgroundColor: "white",
    // padding: 8,
    borderRadius: 50,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  placeholder: {
    width: 50, // Same width as the back button to keep the balance
  },
  innerContainer: {
    justifyContent: "space-between",
    flex: 1,
    marginBottom: "30%",
  },
  uppperButtonsContainer: {},

  sizeSelectionButonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 10,
    marginRight: 16,
  },
  sizeSelectorButonText: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
  },
  heading: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginTop: 48,
  },

  subHeading: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginTop: 16,
  },
  instructionsButton: {
    // width:"50%",
    marginTop: 24,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  instructionsText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },

  sizeSelectorButton: {
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },

  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
  },
  sizeLabel: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
  },
  sizeButton: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },

  threeMinuteEggsButton: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 100,
    marginTop: 16,
    justifyContent: "space-between",
  },
  eggsButtonInnerContainer: {
    flexDirection: "row",
    gap: 8,
  },

  jammyEggsButton: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 100,
    marginVertical: 16,
    justifyContent: "space-between",
  },

  pauseTimerButton: {
    flex: 1,
    marginRight: 16,
    marginLeft: 8,
    borderRadius: 100,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
  },

  cancelTimerButton: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
    borderRadius: 100,
    backgroundColor: "#F2F2F6",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
  },

  eggsTimerButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
});

export default Timer;
