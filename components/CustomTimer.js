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
import { Picker } from "@react-native-picker/picker";

const CustomTimer = ({ route }) => {
  // console.log(route);
  const navigation = useNavigation();

  const [time, setTime] = useState(180); // Timer starts at 3 minutes (180 seconds)

  const [selectedMinutes, setSelectedMinutes] = useState(1);
  const [selectedSeconds, setSelectedSeconds] = useState(30);

  return (
    <>
      {/* Wrapper with opacity overlay */}
      <View style={styles.overlayContainer}>
        <ImageBackground
          source={require("../assets/images/hardboiledbackground-12.png")}
          style={styles.imageBackground}
        >
          {/* Transparent overlay */}
          <View style={styles.opacityLayer} />
        </ImageBackground>

        {/* Main content */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
                <Text style={styles.heading}>Custom Timer</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginHorizontal: "15%",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "black",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 100,
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: "Inter-SemiBold",
                    }}
                  >
                    Minutes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "black",
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 100,
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: "Inter-SemiBold",
                    }}
                  >
                    Seconds
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#FFCE00",
                      borderRadius: 100,
                    }}
                    onPress={() => {
                      if (selectedMinutes > 0) {
                        setSelectedMinutes((prev) => prev - 1);
                      }
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: "center",
                      }}
                      source={require("../assets/images/icon.png")}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      width: 132,
                      height: 144,
                      borderWidth: 3,
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selectedMinutes < 10 && (
                      <Text
                        style={{
                          fontSize: 80,
                          fontFamily: "Inter-Bold",
                          color: "#DADADA",
                        }}
                      >
                        0
                      </Text>
                    )}
                    <Text
                      style={{
                        fontSize: 80,
                        fontFamily: "Inter-Bold",
                      }}
                    >
                      {selectedMinutes}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      if (selectedMinutes < 60) {
                        setSelectedMinutes((prev) => prev + 1);
                      }
                    }}
                    style={{
                      backgroundColor: "#FFCE00",
                      borderRadius: 100,
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: "center",
                      }}
                      source={require("../assets/images/icon1.png")}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 80,
                      fontFamily: "Inter-SemiBold",
                    }}
                  >
                    :
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedSeconds > 0) {
                        setSelectedSeconds((prev) => prev - 1);
                      }
                    }}
                    style={{
                      backgroundColor: "#FFCE00",
                      borderRadius: 100,
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: "center",
                      }}
                      source={require("../assets/images/icon.png")}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      width: 132,
                      height: 144,
                      borderWidth: 3,
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selectedSeconds < 10 && (
                      <Text
                        style={{
                          fontSize: 80,
                          fontFamily: "Inter-Bold",
                          color: "#DADADA",
                        }}
                      >
                        0
                      </Text>
                    )}
                    <Text
                      style={{
                        fontSize: 80,
                        fontFamily: "Inter-Bold",
                      }}
                    >
                      {selectedSeconds}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      if (selectedSeconds < 60) {
                        setSelectedSeconds((prev) => prev + 1);
                      }
                    }}
                    style={{
                      backgroundColor: "#FFCE00",
                      borderRadius: 100,
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: "center",
                      }}
                      source={require("../assets/images/icon1.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {time !== 0 && (
                  <>
                    <TouchableOpacity
                      style={styles.cancelTimerButton}
                      onPress={() => {
                        navigation.navigate("Home");
                      }}
                    >
                      <Text
                        style={[styles.eggsTimerButtonText, { color: "black" }]}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Timer", {
                          heading: "Custom Timer",
                          time: selectedMinutes * 60 + selectedSeconds,
                          subheading: "",
                        });
                      }}
                      style={styles.pauseTimerButton}
                    >
                      <Text
                        style={[styles.eggsTimerButtonText, { color: "white" }]}
                      >
                        Start Timer
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
                {time === 0 && (
                  <TouchableOpacity
                    style={styles.pauseTimerButton}
                    // onPress={() => setIsPaused(!isPaused)}
                  >
                    <Text
                      style={[styles.eggsTimerButtonText, { color: "white" }]}
                    >
                      Stop Timer
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <BottomBar />
    </>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    position: "relative",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  opacityLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Adjust the opacity here
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
    borderRadius: 50,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  placeholder: {
    width: 50,
  },
  innerContainer: {
    justifyContent: "space-between",
    flex: 1,
    marginBottom: "30%",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  uppperButtonsContainer: {},
  picker: {
    width: 150,
    height: 50,
  },
  heading: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginTop: 48,
  },
  instructionsButton: {
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
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    aspectRatio: 1, // This ensures a square container
    width: "90%", // Use a percentage of the screen width
    maxWidth: 400, // Optional: set a maximum width if desired
    alignSelf: "center",
  },
  timerTextBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  timerCompleteTextBackground: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "20%",
    paddingVertical: "25%",
  },
  timerText: {
    fontSize: 64,
    fontFamily: "Inter-Bold",
    color: "black",
  },

  soundButton: {
    marginTop: 16,
  },
  pauseTimerButton: {
    flex: 1,
    marginRight: 16,
    marginLeft: 8,
    borderRadius: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  cancelTimerButton: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
    borderRadius: 100,
    borderWidth: 0.3,
    backgroundColor: "#F2F2F6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  eggsTimerButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
});

export default CustomTimer;
