import React, { useEffect, useState, useRef } from "react";

// import { Animated, Easing } from "react-native";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import BottomBar from "./BottomBar";

const { width, height } = Dimensions.get("window");

// const AnimatedPath = Animated.createAnimatedComponent(Path);

const createDashedCirclePath = (cx, cy, r, dashCount) => {
  return [...Array(dashCount)].map((_, i) => {
    // Adjust the angle calculation to start from the top (270 degrees)
    const angle = (i / dashCount) * Math.PI * 2 + Math.PI * 1.5;
    const startX = cx + Math.cos(angle) * r;
    const startY = cy + Math.sin(angle) * r;
    const endAngle = ((i + 0.5) / dashCount) * Math.PI * 2 + Math.PI * 1.5;
    const endX = cx + Math.cos(endAngle) * r;
    const endY = cy + Math.sin(endAngle) * r;
    return `M${startX},${startY} A${r},${r} 0 0,1 ${endX},${endY}`;
  });
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Timer = ({ route }) => {
  const navigation = useNavigation();
  const [heading, setHeading] = useState(route.params?.heading || "");
  const [subHeading, setSubHeading] = useState(route.params?.subHeading || "");
  const [time, setTime] = useState(route.params?.time || 180);
  const [isPaused, setIsPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const [spokeCount, setSpokeCount] = useState(200);
  const spokeAnimations = useRef([...Array(spokeCount)].map(() => new Animated.Value(0))).current;

  const interpolateColor = (animation) => {
    return animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(0, 0, 0)", "rgb(224, 224, 224)"], // From black to light grey
    });
  };

  const progress = useRef(new Animated.Value(0)).current;

  const circleSize = Math.min(width, height) * 0.6;
  const strokeWidth = 30;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    if (route.params) {
      setHeading(route.params.heading || "");
      setSubHeading(route.params.subHeading || "");
      setTime(route.params.time || 180);
      progress.setValue(0);
    }
  }, [route.params]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused && time > 0) {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    const animateSpokes = (progress) => {
      const fadedSpokes = Math.floor(progress * spokeCount);
      const animations = spokeAnimations.map((anim, index) => {
        // Adjust the index to start from the top (270 degrees)
        const adjustedIndex = (Math.floor(spokeCount) - index) % spokeCount;
        return Animated.timing(anim, {
          toValue: adjustedIndex < fadedSpokes ? 1 : 0,
          duration: 500,
          useNativeDriver: false,
          easing: Easing.linear,
        });
      });
      Animated.parallel(animations).start();
    };

    animateSpokes(1 - time / (route.params.time || 180));

    return () => clearInterval(timer);
  }, [time, isPaused]);

  // useEffect(() => {
  //   const initialTime = route.params.time || 180;
  //   const progressValue = 1 - time / initialTime;

  //   Animated.timing(progress, {
  //     toValue: progressValue,
  //     duration: 1000,
  //     useNativeDriver: true,
  //     easing: Easing.linear,
  //   }).start();

  //   animateSpokes(progressValue);
  // }, [time]);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circumference],
  });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getTitle = () => {
    if (heading === "Hard Boiled Eggs") {
      return "Your hard boiled eggs are done!";
    } else if (heading === "Soft Boiled Eggs") {
      return "Your soft boiled eggs are done!";
    } else if (heading === "Poached Eggs") {
      return "Your Poached Eggs are done!";
    } else {
      return "Your custom timer is done!";
    }
  };

  return (
    <View style={styles.overlayContainer}>
      <ImageBackground
        source={require("../assets/images/hardboiledbackground-1.png")}
        style={styles.imageBackground}
      >
        {/* Transparent overlay */}
        <View style={styles.opacityLayer} />
      </ImageBackground>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Image source={require("../assets/images/btnback-arrow.png")} />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Image source={require("../assets/images/Logo.png")} />
            </View>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.content}>
            <Text style={styles.heading}>{heading}</Text>
            {subHeading !== "" && (
              <View style={styles.instructionsButton}>
                <Text style={styles.instructionsText}>{subHeading}</Text>
              </View>
            )}

            <View style={[styles.timerContainer, { width: circleSize, height: circleSize }]}>
              <Svg width={circleSize} height={circleSize}>
                {createDashedCirclePath(circleSize / 2, circleSize / 2, radius, spokeCount).map(
                  (path, index) => (
                    <AnimatedPath
                      key={index}
                      d={path}
                      stroke={interpolateColor(spokeAnimations[index])}
                      strokeWidth={strokeWidth}
                      fill="none"
                    />
                  ),
                )}
              </Svg>

              <View style={styles.timerInnerCircle}>
                <Text style={styles.timerText}>{time !== 0 ? formatTime(time) : "Done!"}</Text>
                <TouchableOpacity onPress={() => setSoundOn(!soundOn)} style={styles.soundButton}>
                  <Image
                    source={
                      soundOn
                        ? require("../assets/images/group-175.png")
                        : require("../assets/images/group-175.png")
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              {time !== 0 ? (
                <>
                  <TouchableOpacity
                    style={styles.cancelTimerButton}
                    onPress={() => {
                      setTime(route.params.time);
                      setIsPaused(true);
                      progress.setValue(0);
                    }}
                  >
                    <Text style={[styles.buttonText, { color: "black" }]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pauseTimerButton}
                    onPress={() => setIsPaused(!isPaused)}
                  >
                    <Text style={[styles.buttonText, { color: "white" }]}>
                      {isPaused ? "Resume Timer" : "Pause Timer"}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.pauseTimerButton}
                  onPress={() => navigation.navigate("Success", { title: getTitle() })}
                >
                  <Text style={[styles.buttonText, { color: "white" }]}>Stop Timer</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

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
    // backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  backButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 8,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  placeholder: {
    width: 50,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  instructionsButton: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  instructionsText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  timerInnerCircle: {
    position: "absolute",
    width: "90%",
    height: "90%",
    borderRadius: 1000,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  soundButton: {
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  cancelTimerButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 100,
    backgroundColor: "#F2F2F6",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  pauseTimerButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Timer;
