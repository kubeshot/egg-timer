import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions, // Import Dimensions here
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import YoutubeIframe from "react-native-youtube-iframe"; // Import YouTube iframe

const VideoModal = ({ isVisible, videoUri, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const youtubePlayerRef = useRef(null);

  const handleReady = () => {
    setLoading(false); // Hide loader when video is ready
  };

  const { width, height } = Dimensions.get("window");

  // You can adjust the height and width here
  const iframeWidth = width * 0.9; // 90% of the screen width
  const iframeHeight = iframeWidth * (16 / 9); // Keep a 16:9 ratio for the video

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <AntDesign name="closecircle" size={24} color="white" />
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        )}

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <YoutubeIframe
            ref={youtubePlayerRef}
            height={iframeHeight} // Set dynamic height
            width={iframeWidth} // Set dynamic width
            videoId={videoUri} // Make sure this is the correct video ID
            play={true}
            onReady={handleReady}
            onError={(e) => {
              console.error("YouTube Error:", e);
              setError("Failed to load video. Please try again later.");
              setLoading(false);
            }}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    // padding: 5,
    alignItems: "center",
    width: "90%",
    aspectRatio: 30 / 16,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1,
  },
});

export default VideoModal;
