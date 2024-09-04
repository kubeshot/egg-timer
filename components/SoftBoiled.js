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

const SoftBoiled = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedSize, setSelectedSize] = useState("L");
  const [showSizeSelection, setShowSizeSelection] = useState(false);
  const [selectedEggType, setSelectedEggType] = useState(0);
  const [timerSubHeading, setTimerSubheading] = useState("3-Minute Eggs");

  const steps = [
    "In a saucepan, bring 4 inches of water to a boil and then reduce to a simmer.",
    "Using a slotted spoon lower eggs into simmering water. ",
    "Cover and simmer for 3 minutes for a soft boil egg and 6 minutes for a jammy egg. ",
    "Run eggs under cold water or place in an ice bath to stop cooking.",
  ];

  return (
    <>
      <ImageBackground
        source={require("../assets/images/hardboiledbackground-2.png")}
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
              <Text style={styles.heading}>Soft Boiled Eggs</Text>
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
                <View style={styles.sizeSelectionButonContainer}>
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
                    <Text style={styles.sizeSelectorButonText}>M</Text>
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
                    <Text style={styles.sizeSelectorButonText}>L</Text>
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
                    <Text style={styles.sizeSelectorButonText}>XL</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View>
              <View>
                <Text style={styles.subHeading}>
                  How do you like your eggs?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedEggType(0);
                    setTimerSubheading("3-Minute Eggs");
                  }}
                  style={[
                    styles.threeMinuteEggsButton,
                    {
                      borderWidth: selectedEggType === 0 ? 2 : 0,
                    },
                  ]}
                >
                  <View style={styles.eggsButtonInnerContainer}>
                    {selectedEggType === 0 && (
                      <Image
                        source={require("../assets/images/checkcircle.png")}
                      />
                    )}
                    <Text style={styles.eggsTimerButtonText}>
                      3-Minute Eggs
                    </Text>
                  </View>
                  <Text style={styles.eggsTimerButtonText}>3:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedEggType(1);
                    setTimerSubheading("Jammy Eggs");
                  }}
                  style={[
                    styles.jammyEggsButton,
                    {
                      borderWidth: selectedEggType === 1 ? 2 : 0,
                    },
                  ]}
                >
                  <View style={styles.eggsButtonInnerContainer}>
                    {selectedEggType === 1 && (
                      <Image
                        source={require("../assets/images/checkcircle.png")}
                      />
                    )}
                    <Text style={styles.eggsTimerButtonText}>Jammy Eggs</Text>
                  </View>

                  <Text style={styles.eggsTimerButtonText}>6:00</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Timer", {
                    heading: "Soft Boiled",
                    time: selectedEggType === 0 ? 180 : 360 ,
                    subHeading: selectedEggType === 0 ? "3-Minute Eggs" : "Jammy Eggs" ,
                  });
                }}
                style={styles.startTimerButton}
              >
                <Image source={require("../assets/images/basic--clock.png")} />
                <Text style={[styles.eggsTimerButtonText, { color: "white" }]}>
                  Start Timer
                </Text>
              </TouchableOpacity>
            </View>
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
                      {index === 2 ? (
                        <>
                          Cover and simmer for{" "}
                          <Text style={{ fontFamily: "Inter-Bold" }}>
                            3 minutes
                          </Text>{" "}
                          for a soft boil egg and{" "}
                          <Text style={{ fontFamily: "Inter-Bold" }}>
                            6 minutes
                          </Text>{" "}
                          for a jammy egg.
                        </>
                      ) : (
                        step
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
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  instructionsText: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
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

  startTimerButton: {
    marginHorizontal: 16,
    borderRadius: 100,
    backgroundColor: "black",
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
    padding: 24,
    elevation: 10,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
  },

  modalTitle: {
    fontSize: 32,
    fontFamily: "Inter-Bold",
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
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  modalStepTextContainer: {
    flex: 0.9, // 70% of the width
  },
  modalStepText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
});

export default SoftBoiled;
