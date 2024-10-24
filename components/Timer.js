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
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import BottomBar from "./BottomBar";
import { Audio } from "expo-av";
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18nConfig';
import * as TaskManager from 'expo-task-manager';

const { width, height } = Dimensions.get("window");
const TIMER_STORAGE_KEY = '@timer_data';
const AnimatedPath = Animated.createAnimatedComponent(Path);

TaskManager.defineTask('BACKGROUND_NOTIFICATION_TASK', async () => {
  try {
    const notification = await Notifications.getLastNotificationResponseAsync();
    // Handle the notification, e.g., refresh app data or perform actions
    console.log('Received background notification: ', notification);
    // Optionally, you can implement any logic to refresh your data here
  } catch (error) {
    console.error('Error handling background notification: ', error);
  }
});

// BackgroundTimerHandler class implementation (from previous artifact)
class BackgroundTimerHandler {
  constructor() {
    this.timeoutId = null;
    this.startTime = null;
    this.initialDuration = null;
  }

  async setupBackgroundHandler({ title, heading, subHeading, initialTime }) {
    try {
      this.startTime = Date.now();
      this.initialDuration = initialTime;

      await AsyncStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify({
        title,
        heading,
        subHeading,
        initialTime,
        startTime: this.startTime,
        endTime: this.startTime + (initialTime * 1000)
      }));

      if (Platform.OS !== 'web') {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus === 'granted') {
          await Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: false, // Don't show alert for background notifications
              shouldPlaySound: false, // Don't play sound for background notifications
              shouldSetBadge: false, // Don't set badge for background notifications
            }),
          });
          await Notifications.registerTaskAsync('BACKGROUND_NOTIFICATION_TASK');
        }
      }
    } catch (error) {
      console.error('Error setting up background handler:', error);
    }
  }
  async scheduleBackgroundNotification(timeLeft, title) {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      
      const trigger = new Date(Date.now() + (timeLeft * 1000) + 500);
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Timer Alert',
          body: title,
          sound: 'clucking.wav',
          priority: 'high',
          data: { useCustomSound: true },
        },
        trigger,
      });

      const backupTrigger = new Date(Date.now() + (timeLeft * 1000) + 1500);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Timer Alert',
          body: title,
          sound: 'clucking.wav',
          priority: 'high',
          data: { useCustomSound: true },
        },
        trigger: backupTrigger,
      });
    } catch (error) {
      console.error('Error scheduling background notification:', error);
    }
  }

  async handleAppStateChange(nextAppState, currentTimeLeft, isPaused) {
    if (nextAppState === 'background' && currentTimeLeft > 0 && !isPaused) {
      try {
        const currentTime = Date.now();
        const endTime = currentTime + (currentTimeLeft * 1000);

        await AsyncStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify({
          timeLeft: currentTimeLeft,
          startTime: currentTime,
          endTime: endTime
        }));

        const storedData = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
        if (storedData) {
          const { title } = JSON.parse(storedData);
          await this.scheduleBackgroundNotification(currentTimeLeft, title);
        }
      } catch (error) {
        console.error('Error handling background state:', error);
      }
    }
  }

  async checkBackgroundTime() {
    try {
      const storedData = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
      if (storedData) {
        const { endTime } = JSON.parse(storedData);
        const currentTime = Date.now();
        const timeLeft = Math.max(0, Math.floor((endTime - currentTime) / 1000));
        return timeLeft;
      }
      return null;
    } catch (error) {
      console.error('Error checking background time:', error);
      return null;
    }
  }

  async cleanup() {
    try {
      await AsyncStorage.removeItem(TIMER_STORAGE_KEY);
      await Notifications.cancelAllScheduledNotificationsAsync();
      
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }

      this.startTime = null;
      this.initialDuration = null;
    } catch (error) {
      console.error('Error cleaning up background handler:', error);
    }
  }
}

const backgroundTimerHandler = new BackgroundTimerHandler();

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


const Timer = ({ route }) => {
  const navigation = useNavigation();
  const [heading, setHeading] = useState(route.params?.heading || "");
  const [subHeading, setSubHeading] = useState(route.params?.subHeading || "");
  const [timeLeft, setTimeLeft] = useState(route.params?.time || 180);
  const [isPaused, setIsPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const soundRef = useRef(null);
  const [spokeCount, setSpokeCount] = useState(300);
  const spokeAnimations = useRef(
    [...Array(spokeCount)].map(() => new Animated.Value(0))
  ).current;
  const fadeOutAnimation = useRef(new Animated.Value(1)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const circleSize = Math.min(width, height) * 0.9;
  const strokeWidth = 15;
  const radius = (circleSize - strokeWidth) / 2.5;

  const appState = useRef(AppState.currentState);
  const intervalRef = useRef(null);
  const timeLeftRef = useRef(route.params?.time || 180);
  const endTimeRef = useRef(null);

  useEffect(() => {
    const setupTimer = async () => {
      await backgroundTimerHandler.setupBackgroundHandler({
        title: getTitle(),
        heading,
        subHeading,
        initialTime: route.params?.time || 180
      });

      endTimeRef.current = Date.now() + (timeLeftRef.current * 1000);
    };

    setupTimer();
    
    return () => {
      backgroundTimerHandler.cleanup();
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopSound();
    };
  }, []);

  // Route params effect
  useEffect(() => {
    if (route.params) {
      setHeading(route.params.heading || "");
      setSubHeading(route.params.subHeading || "");
      setTimeLeft(route.params.time || 180);
      timeLeftRef.current = route.params.time || 180;
      endTimeRef.current = Date.now() + ((route.params.time || 180) * 1000);
      progress.setValue(0);
      fadeOutAnimation.setValue(1);
    }
  }, [route.params]);

  // App state effect
  useEffect(() => {
    const subscription = AppState.addEventListener("change", async nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        const remainingTime = await backgroundTimerHandler.checkBackgroundTime();
        if (remainingTime !== null) {
          timeLeftRef.current = remainingTime;
          setTimeLeft(remainingTime);
          
          const totalTime = route.params.time || 180;
          const elapsedTime = totalTime - remainingTime;
          const progressValue = elapsedTime / totalTime;
          animateSpokes(progressValue);

          if (remainingTime === 0) {
            await backgroundTimerHandler.cleanup();
            await triggerNotification();
            playCompletionSound();
          }
        }
      } else if (nextAppState === "background") {
        await backgroundTimerHandler.handleAppStateChange(
          nextAppState,
          timeLeftRef.current,
          isPaused
        );
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      backgroundTimerHandler.cleanup();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);
  // Timer effect
  useEffect(() => {
    if (!isPaused && timeLeftRef.current > 0) {
      startTimer();
    } else if (timeLeftRef.current === 0) {
      playCompletionSound();
      startFadeOutAnimation();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timeLeftRef.current, isPaused]);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!endTimeRef.current) {
      endTimeRef.current = Date.now() + (timeLeftRef.current * 1000);
    }

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTimeRef.current - now) / 1000));
      
      if (remaining !== timeLeftRef.current) {
        timeLeftRef.current = remaining;
        setTimeLeft(remaining);

        const totalTime = route.params.time || 180;
        const elapsedTime = totalTime - remaining;
        const progress = elapsedTime / totalTime;
        animateSpokes(progress);

        if (remaining === 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          startFadeOutAnimation();
          playCompletionSound();
          triggerNotification();
          animateSpokes(1);
          backgroundTimerHandler.cleanup();
        }
      }
    }, 100); // More frequent updates for smoother display
  };

  const triggerNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: i18n.t('Timer Alert'),
          body: getTitle(),
          sound: 'clucking.wav',
          priority: 'high',
          data: { useCustomSound: true },
        },
        trigger: null,
      });
    } catch (error) {
      console.error("Error triggering notification: ", error);
    }
  };

  const animateSpokes = (progress) => {
    const fadedSpokes = Math.floor(progress * spokeCount);
    const animations = spokeAnimations.map((anim, index) => {
      const adjustedIndex = (Math.floor(spokeCount) - index) % spokeCount;
      return Animated.timing(anim, {
        toValue: adjustedIndex < fadedSpokes || progress === 1 ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.linear,
      });
    });

    if (timeLeftRef.current === 0 || progress === 1) {
      spokeAnimations.forEach((anim) => {
        anim.setValue(1);
      });
    }

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
    if (soundOn) {
      try {
        if (!soundRef.current) {
          const { sound } = await Audio.Sound.createAsync(
            require("../assets/clucking.wav"),
            { shouldPlay: false }
          );
          soundRef.current = sound;
        }

        const status = await soundRef.current.getStatusAsync();
        if (!status.isPlaying) {
          await soundRef.current.playAsync();
        }
      } catch (error) {
        console.log("Error playing sound:", error);
      }
    } else {
      await stopSound();
    }
  };

  const stopSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.pauseAsync();
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      } catch (error) {
        console.error("Error stopping sound:", error);
      } finally {
        soundRef.current = null;
      }
    }
  };

  const stopTimer = async () => {
    try {
      setTimeLeft(0);
      timeLeftRef.current = 0;
      setIsPaused(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      await stopSound();
      await backgroundTimerHandler.cleanup();
      navigation.navigate(
        heading === "Custom Timer" ? "CustomSuccess" : "Success",
        { 
          title: getTitle(),
          heading 
        }
      );
    } catch (error) {
      console.error("Error stopping timer:", error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  console.log("Headinggggggggg",heading);

  const getTitle = () => {
    if (heading === i18n.t('Hard Boiled Eggs')) {
      return i18n.t('Your hard boiled eggs are done!');
    } else if (heading === i18n.t('Soft Boiled Eggs')) {
      return i18n.t('Your soft boiled eggs are done!');
    } else if (heading === i18n.t('Poached Eggs')) {
      return i18n.t('Your Poached Eggs are done!');
    } else {
      return i18n.t('Your Timer is done!');
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
                    stroke={timeLeftRef.current === 0 ? interpolateColor(spokeAnimations[index]) : interpolateColor(Animated.multiply(spokeAnimations[index], fadeOutAnimation))}
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                ))}
              </Svg>
              <View style={styles.timerInnerCircle}>
                <Text style={styles.timerText}>
                  {timeLeft !== 0 ? formatTime(timeLeft) : i18n.t('Done!')}
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    if (soundOn) {
                      await stopSound(); // Stop sound if it's currently on
                    } else {
                      if (soundRef.current) {
                        await soundRef.current.playAsync(); // Play sound if it's off
                      }
                    }
                    setSoundOn(!soundOn); // Toggle the sound state
                  }}
                  style={styles.soundButton}
                >
                  <Image
                    source={
                      soundOn
                        ? require("../assets/images/group-175.png")  // Sound is on
                        : require("../assets/images/group-1752.png")  // Sound is off
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
                      // Set the canceled flag to true
                      setTimeLeft(route.params.time);
                      timeLeftRef.current = route.params.time;
                      setIsPaused(true);
                      progress.setValue(0);
                      endTimeRef.current = null;
                      // cancelNotification();
                      animateSpokes(0);
                      fadeOutAnimation.setValue(1);
                      if (intervalRef.current) clearInterval(intervalRef.current);
                    }}
                  >
                    <Text style={[styles.buttonText, { color: "black" }]}>
                      {i18n.t('Cancel')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.pauseTimerButton}
                    onPress={() => {
                      setIsPaused(!isPaused);
                      if (isPaused) {
                        endTimeRef.current = Date.now() + timeLeft * 1000;
                        startTimer();
                        // if (!notificationScheduled.current) {
                        //   scheduleNotification(timeLeft);
                        // }
                      } else {
                        if (intervalRef.current) clearInterval(intervalRef.current);
                      }
                    }}
                  >
                    <Text style={[styles.buttonText, { color: "white" }]}>
                      {isPaused ? i18n.t('Resume Timer') : i18n.t('Pause Timer')}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.pauseTimerButton}
                  onPress={stopTimer}
                >
                  <Text style={[styles.buttonText, { color: "white" }]}>
                    {i18n.t('Stop Timer')}
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
    fontSize: 90,
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