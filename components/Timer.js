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
  console.log(route);
  const navigation = useNavigation();

  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState(route.params.subHeading);
  const [time, setTime] = useState(180); // Timer starts at 3 minutes (180 seconds)
  const [isPaused, setIsPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    if (route.params && route.params.heading) {
      setHeading(route.params.heading);
    }
    if (route.params && route.params.subHeading) {
      setSubHeading(route.params.subHeading);
    }

    if (route.params && route.params.time) {
      setTime(route.params.time);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused && time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time, isPaused, route.params]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getTimerBackgroundImage = () => {
    if (time === 0) {
      return require("../assets/images/frame-1772.png"); // Third image for timer reaching 0
    } else if (time <= route.params.time / 2) {
      return require("../assets/images/frame-177.png"); // Second image for timer half
    } else {
      return require("../assets/images/frame-1771.png"); // Initial image
    }
  };

  return (
    <>
      {/* Wrapper with opacity overlay */}
      <View style={styles.overlayContainer}>
        <ImageBackground
          source={require("../assets/images/hardboiledbackground-1.png")}
          style={styles.imageBackground}
        >
          {/* Transparent overlay */}
          <View style={styles.opacityLayer} />
        </ImageBackground>

        {/* Main content */}
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
              {subHeading !== "" && (
                <View style={styles.instructionsButton}>
                  <Text style={styles.instructionsText}>{subHeading}</Text>
                </View>
              )}
            </View>

            {/* Timer UI */}
            <View style={styles.timerContainer}>
              <ImageBackground
                source={getTimerBackgroundImage()}
                style={styles.timerTextBackground}
                resizeMode="contain"
              >
                <Text style={styles.timerText}>
                  {time !== 0 && formatTime(time)}
                  {time === 0 && "Done !"}
                </Text>
                <TouchableOpacity onPress={() => setSoundOn(!soundOn)} style={styles.soundButton}>
                  <Image
                    source={
                      soundOn
                        ? require("../assets/images/group-175.png")
                        : require("../assets/images/group-175.png")
                    }
                  />
                </TouchableOpacity>
              </ImageBackground>
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
                      setTime(route.params.time);
                      setIsPaused(true);
                    }}
                  >
                    <Text style={[styles.eggsTimerButtonText, { color: "black" }]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pauseTimerButton}
                    onPress={() => setIsPaused(!isPaused)}
                  >
                    <Text style={[styles.eggsTimerButtonText, { color: "white" }]}>
                      {isPaused ? "Resume Timer" : "Pause Timer"}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {time === 0 && (
                <TouchableOpacity
                  style={styles.pauseTimerButton}
                  // onPress={() => setIsPaused(!isPaused)}
                >
                  <Text style={[styles.eggsTimerButtonText, { color: "white" }]}>Stop Timer</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
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
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Adjust the opacity here
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
  uppperButtonsContainer: {},
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

export default Timer;
