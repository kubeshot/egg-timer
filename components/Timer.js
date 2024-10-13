import React, { useEffect, useState, useRef } from "react";
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
  AppState,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import BottomBar from "./BottomBar";
import { Audio } from "expo-av";
import * as Notifications from 'expo-notifications';

const { width, height } = Dimensions.get("window");

const AnimatedPath = Animated.createAnimatedComponent(Path);

const createDashedCirclePath = (cx, cy, r, dashCount) => {
  return [...Array(dashCount)].map((_, i) => {
    const angle = (i / dashCount) * Math.PI * 2 + Math.PI * 1.5;
    const startX = cx + Math.cos(angle) * r;
    const startY = cy + Math.sin(angle) * r;
    const endAngle = ((i + 0.5) / dashCount) * Math.PI * 2 + Math.PI * 1.5;
    const endX = cx + Math.cos(endAngle) * r;
    const endY = cy + Math.sin(endAngle) * r;
    return `M${startX},${startY} A${r},${r} 0 0,1 ${endX},${endY}`;
  });
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Timer = ({ route }) => {
  const navigation = useNavigation();
  const [heading, setHeading] = useState(route.params?.heading || "");
  const [subHeading, setSubHeading] = useState(route.params?.subHeading || "");
  const [timeLeft, setTimeLeft] = useState(route.params?.time || 180);
  const [isPaused, setIsPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const soundRef = useRef(null);
  const [spokeCount, setSpokeCount] = useState(300); // Increase the number of spokes
  const spokeAnimations = useRef(
    [...Array(spokeCount)].map(() => new Animated.Value(0))
  ).current;
  const fadeOutAnimation = useRef(new Animated.Value(1)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const circleSize = Math.min(width, height) * 0.9; // Increase the size of the circle
  const strokeWidth = 15; // Adjust this value to reduce the width of the spokes
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const appState = useRef(AppState.currentState);
  const endTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const notificationId = useRef(null);
  const lastUpdatedTime = useRef(Date.now());

  const timeLeftRef = useRef(route.params?.time || 180); // Use a ref for time left

  useEffect(() => {
    setupNotifications();
    return () => {
      cancelNotification();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (route.params) {
      setHeading(route.params.heading || "");
      setSubHeading(route.params.subHeading || "");
      setTimeLeft(route.params.time || 180);
      progress.setValue(0);
      endTimeRef.current = null;
      cancelNotification();
      fadeOutAnimation.setValue(1);
    }
  }, [route.params]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        const now = Date.now();
        const timePassed = (now - lastUpdatedTime.current) / 1000;
        updateTimer(timePassed);
      }
      appState.current = nextAppState;
      lastUpdatedTime.current = Date.now();
    });

    return () => {
      subscription.remove();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isPaused && timeLeftRef.current > 0) {
      startTimer();
    } else if (timeLeftRef.current === 0) {
      if (soundOn) {
        playCompletionSound();
      }
      startFadeOutAnimation();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timeLeftRef.current, isPaused]);

  const setupNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('You need to grant notification permissions to receive timer alerts.');
    }
  };

  const scheduleNotification = async () => {
    // Only schedule if time left is greater than zero
    if (timeLeftRef.current > 0) {
      await cancelNotification(); // Clear any existing notifications
      notificationId.current = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Timer Alert",
          body: getTitle(),
          sound: true,
        },
        trigger: {
          seconds: timeLeftRef.current, // Schedule for the remaining time
        },
      });
    }
  };

  const cancelNotification = async () => {
    if (notificationId.current) {
      await Notifications.cancelScheduledNotificationAsync(notificationId.current);
      notificationId.current = null; // Reset the notification ID
    }
  };

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      updateTimer();
      scheduleNotification(); // Reschedule notification on each tick
    }, 1000);
  };

  const updateTimer = () => {
    if (!isPaused && timeLeftRef.current > 0) {
      timeLeftRef.current -= 1; // Decrement time left by 1 second
      setTimeLeft(timeLeftRef.current); // Update state for rendering

      const totalTime = route.params.time || 180; // Default to 180 seconds if not provided
      const elapsedTime = totalTime - timeLeftRef.current;
      const progress = elapsedTime / totalTime;
      animateSpokes(progress);

      if (timeLeftRef.current === 0) {
        cancelNotification(); // Clear notification when timer ends
        if (intervalRef.current) clearInterval(intervalRef.current);
        startFadeOutAnimation();
        playCompletionSound(); // Ensure this is called when the timer ends
      }
    }
  };

  const animateSpokes = (progress) => {
    const fadedSpokes = Math.floor(progress * spokeCount);
    const animations = spokeAnimations.map((anim, index) => {
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

  const startFadeOutAnimation = () => {
    Animated.timing(fadeOutAnimation, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  const playCompletionSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/clucking.wav")
      );
      soundRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.log("Error playing sound", error);
    }
  };

  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  };

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

  const interpolateColor = (animation) => {
    return animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(0, 0, 0)", "rgb(224, 224, 224)"],
    });
  };

  return (
    <View style={styles.overlayContainer}>
      <ImageBackground
        source={require("../assets/images/hardboiledbackground-1.png")}
        style={styles.imageBackground}
      >
        <View style={styles.opacityLayer} />
      </ImageBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
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
            <View
              style={[
                styles.timerContainer,
                { width: circleSize, height: circleSize },
              ]}
            >
              <Svg width={circleSize} height={circleSize}>
                {createDashedCirclePath(
                  circleSize / 2,
                  circleSize / 2,
                  radius,
                  spokeCount
                ).map((path, index) => (
                  <AnimatedPath
                    key={index}
                    d={path}
                    stroke={interpolateColor(Animated.multiply(spokeAnimations[index], fadeOutAnimation))}
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                ))}
              </Svg>
              <View style={styles.timerInnerCircle}>
                <Text style={styles.timerText}>
                {timeLeft !== 0 ? formatTime(timeLeft) : "Done!"}
                </Text>
                <TouchableOpacity
                  onPress={() => setSoundOn(!soundOn)}
                  style={styles.soundButton}
                >
                  <Image
                    source={
                      soundOn
                        ? require("../assets/images/group-175.png")
                        : require("../assets/images/group-1752.png")
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              {timeLeft !== 0 ? (
                <>
                  <TouchableOpacity
                    style={styles.cancelTimerButton}
                    onPress={() => {
                      setTimeLeft(route.params.time);
                      setIsPaused(true);
                      progress.setValue(0);
                      endTimeRef.current = null;
                      cancelNotification();
                      animateSpokes(0);
                      fadeOutAnimation.setValue(1);
                      if (intervalRef.current) clearInterval(intervalRef.current);
                    }}
                  >
                    <Text style={[styles.buttonText, { color: "black" }]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pauseTimerButton}
                    onPress={() => {
                      setIsPaused(!isPaused);
                      if (isPaused) {
                        endTimeRef.current = Date.now() + timeLeft * 1000;
                        startTimer();
                        scheduleNotification();
                      } else {
                        cancelNotification();
                        if (intervalRef.current) clearInterval(intervalRef.current);
                      }
                    }}
                  >
                    <Text style={[styles.buttonText, { color: "white" }]}>
                      {isPaused ? "Resume Timer" : "Pause Timer"}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.pauseTimerButton}
                  onPress={() => {
                    stopSound();
                    navigation.navigate("Success", { title: getTitle() });
                  }}
                >
                  <Text style={[styles.buttonText, { color: "white" }]}>
                    Stop Timer
                  </Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  container: {
    flex: 1,
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
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
    marginTop: 48,
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
    backgroundColor: "transparent", // Change this to transparent
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 80,
    fontFamily: "Kaleko-Bold",
    // color: "#DADADA",
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