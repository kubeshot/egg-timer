import React, { useState } from "react";
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

const HardBoiled = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedSize, setSelectedSize] = useState("L");
  const [showSizeSelection, setShowSizeSelection] = useState(false);

  const steps = [
    "In a saucepan, place eggs in a single layer and cover eggs with at least 1 inch of water.",
    "Cover with a lid and bring to a boil over high heat.",
    "Remove from heat and let stand for ",
    "Run eggs under cold water or place in an ice bath to stop cooking.",
  ];

  return (
    <>
      <ImageBackground
        source={require("../assets/images/hardboiledbackground-11.png")}
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

          <View
            style={{
              justifyContent: "space-between",
              flex: 1,
              marginBottom: "25%",
            }}
          >
            <View style={{}}>
              <Text style={styles.heading}>Hard Boiled Eggs</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.instructionsButton}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.instructionsText}>Instructions</Text>
                </TouchableOpacity>
                <View style={styles.sizeContainer}>
                  <Text style={styles.sizeLabel}>Size</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowSizeSelection((prev) => !prev);
                    }}
                    style={styles.sizeButton}
                  >
                    <Text style={styles.sizeText}>{selectedSize}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {showSizeSelection && (
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    gap: 10,
                    marginRight: 16,
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.sizeSelectorButton,
                      {
                        backgroundColor:
                          selectedSize === "M" ? "#FFCD32" : "white",
                      },
                    ]}
                    onPress={() => {
                      setSelectedSize("M");
                      setShowSizeSelection(false);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                      }}
                    >
                      M
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.sizeSelectorButton,
                      {
                        backgroundColor:
                          selectedSize === "L" ? "#FFCD32" : "white",
                      },
                    ]}
                    onPress={() => {
                      setSelectedSize("L");
                      setShowSizeSelection(false);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                      }}
                    >
                      L
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.sizeSelectorButton,
                      {
                        backgroundColor:
                          selectedSize === "XL" ? "#FFCD32" : "white",
                      },
                    ]}
                    onPress={() => {
                      setSelectedSize("XL");
                      setShowSizeSelection(false);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                      }}
                    >
                      XL
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={{
                marginHorizontal: 16,
                borderRadius: 100,
                backgroundColor: "black",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 24,
                paddingVertical: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Image source={require("../assets/images/basic--clock.png")} />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Start Timer
                </Text>
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                12:00
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Image source={require("../assets/images/xcircle.png")} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.modalTitle}>Steps</Text>

            {/* Step List */}
            <ScrollView contentContainerStyle={styles.modalStepsContainer}>
              {steps.map((step, index) => (
                <View style={styles.modalStepItem} key={index}>
                  <View style={styles.modalStepNumber}>
                    <Text style={styles.modalStepNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.modalStepTextContainer}>
                    <Text style={styles.modalStepText}>
                      {step}
                      {index === 2 && (
                        <Text
                          style={[styles.modalStepText, { fontWeight: "bold" }]}
                        >
                          12 minutes.
                        </Text>
                      )}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 48,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "semibold",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginTop: 16,
  },
  instructionsButton: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  instructionsText: {
    fontSize: 16,
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#F2F2F6",
    borderRadius: 10,
    padding: 16,
    elevation: 10,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
  },

  modalTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  modalStepsContainer: {
    paddingBottom: 56,
  },
  modalStepItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  modalStepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFCD32",
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 10,
  },
  modalStepNumberText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalStepTextContainer: {
    flex: 0.9, // 70% of the width
  },
  modalStepText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
  },
  modalOpenButton: {
    padding: 10,
    backgroundColor: "#f9b233",
    borderRadius: 5,
  },
  modalOpenButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HardBoiled;
