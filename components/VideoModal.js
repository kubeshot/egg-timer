import React, { useState, useRef, useEffect } from "react";
import { Video, ResizeMode } from "expo-av";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Text,
  Animated,
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";

const VideoModal = ({ isVisible, videoUri, onClose }) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({});
  const youtubePlayerRef = useRef(null);
  const video = useRef(null);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const loaderFadeAnim = useRef(new Animated.Value(1)).current;

  const { width, height } = Dimensions.get("window");
  const modalWidth = width;
  const modalHeight = height - 250;
  const isYouTubeUrl = videoUri.includes("youtube.com") || 
                       videoUri.includes("youtu.be") || 
                       videoUri.includes("shorts");
  const videoId = extractVideoId(videoUri);

  useEffect(() => {
    if (isVisible) {
      // Reset states when modal opens
      setIsVideoReady(false);
      setShowCloseButton(false);
      setError(null);
      fadeAnim.setValue(0);
      loaderFadeAnim.setValue(1);

      // Show close button after a delay
      const timer = setTimeout(() => {
        setShowCloseButton(true);
      }, 4000);

      return () => {
        clearTimeout(timer);
        setIsVideoReady(false);
        // Unload video when modal closes
        if (video.current && !isYouTubeUrl) {
          video.current.unloadAsync();
        }
      };
    }
  }, [isVisible, videoUri]);

  const handleReady = () => {
    setIsVideoReady(true);
    
    // Crossfade animation between loader and video
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(loaderFadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handlePlaybackStatusUpdate = (status) => {
    setStatus(status);
    if (status.isLoaded && !isVideoReady) {
      handleReady();
    }
  };

  const renderVideoContent = () => {
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
      <View style={styles.videoWrapper}>
        <Animated.View style={[styles.videoContainer, { opacity: fadeAnim }]}>
          {isYouTubeUrl && videoId ? (
            <YoutubePlayer
              ref={youtubePlayerRef}
              height={modalHeight}
              width={modalWidth}
              videoId={videoId}
              play={isVisible}
              onReady={handleReady}
              onError={(e) => {
                console.error("YouTube Error:", e);
                setError("Failed to load video. Please try again later.");
              }}
              webViewProps={{
                injectedJavaScript: `
                  var element = document.getElementsByClassName('container')[0];
                  element.style.position = 'unset';
                  element.style.paddingBottom = 'unset';
                  true;
                `,
              }}
            />
          ) : (
            <Video
              ref={video}
              style={styles.video}
              source={{ uri: videoUri }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
              shouldPlay={isVisible}
              onError={(error) => {
                console.error("Video Error:", error);
                setError("Failed to load video. Please try again later.");
              }}
            />
          )}
        </Animated.View>
        {!isVideoReady && (
          <Animated.View style={[styles.loaderContainer, { opacity: loaderFadeAnim }]}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      backdropTransitionOutTiming={0}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={500}
      animationOutTiming={400}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      <View style={[styles.container, { width: modalWidth, height: modalHeight }]}>
        {showCloseButton && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="closecircle" size={24} color="white" />
          </TouchableOpacity>
        )}
        {renderVideoContent()}
      </View>
    </Modal>
  );
};

const extractVideoId = (url) => {
  const videoIdRegex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|shorts\/)([^"&?/\s]{11})/;
  const matches = url.match(videoIdRegex);
  return matches ? matches[1] : null;
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 3,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
    padding: 5,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    backgroundColor: "black",
    borderRadius: 15,
    overflow: "hidden",
  },
  videoWrapper: {
    flex: 1,
    position: 'relative',
  },
  videoContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default VideoModal;