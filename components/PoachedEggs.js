import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomBar from "./BottomBar";
import { useNavigation } from "@react-navigation/native";
import i18n from '../i18nConfig';
import AnimatedSelectionButton from "./AnimatedSelectButton";


const PoachedEggs = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedSize, setSelectedSize] = useState("L");
  const [showSizeSelection, setShowSizeSelection] = useState(false);
  const [selectedEggType, setSelectedEggType] = useState(0);

  const [timer1, setTimer1] = useState(3);
  const [timer2, setTimer2] = useState(4);
  const [timer3, setTimer3] = useState(5);
  const steps = i18n.t('Poached Eggs Steps', { returnObjects: true });

  return (
    <>
      <ImageBackground
        source={require("../assets/images/hardboiledbackground-1.png")}
        style={styles.imageBackground}
      >
        <SafeAreaView style={styles.safeArea}>
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
                <Text style={styles.heading}>{i18n.t('Poached Eggs')}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.instructionsButton}
                    onPress={() => {
                      setModalVisible(true);
                    }}
                  >
                    <Text style={styles.instructionsText}>{i18n.t('Instructions')}</Text>
                  </TouchableOpacity>
                  <View style={styles.sizeContainer}>
                    <Text style={styles.sizeLabel}>{i18n.t('Size')}</Text>
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

                        setTimer1(2);
                        setTimer2(3);
                        setTimer3(4);

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
                        setTimer1(3);
                        setTimer2(4);
                        setTimer3(5);
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
                        setTimer1(4);
                        setTimer2(5);
                        setTimer3(6);
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
                  {i18n.t('How do you like your eggs?')}
                  </Text>
                  <AnimatedSelectionButton
  selected={selectedEggType === 0}
  onPress={() => setSelectedEggType(0)}
  label={i18n.t('Soft')}
  time={`${timer1}:00`}
  icon={<Image source={require("../assets/images/checkcircle.png")} />}
/>

<AnimatedSelectionButton
  selected={selectedEggType === 1}
  onPress={() => setSelectedEggType(1)}
  label={i18n.t('Medium')}
  time={`${timer2}:00`}
  icon={<Image source={require("../assets/images/checkcircle.png")} />}
/>

<AnimatedSelectionButton
  selected={selectedEggType === 2}
  onPress={() => setSelectedEggType(2)}
  label={i18n.t('Hard')}
  time={`${timer3}:00`}
  icon={<Image source={require("../assets/images/checkcircle.png")} />}
  style={styles.jammyEggsButton}
/>
                </View>

                <TouchableOpacity
                  style={styles.startTimerButton}
                  onPress={() => {
                    navigation.navigate("Timer", {
                      heading: i18n.t("Poached Eggs"),
                      time:
                        selectedEggType === 0
                          ? timer1 * 60
                          : selectedEggType === 1
                          ? timer2 * 60
                          : timer3 * 60,
                      subHeading:
                        selectedEggType === 0
                          ? i18n.t("Soft Poached")
                          : selectedEggType === 1
                          ? i18n.t("Medium Poached")
                          : i18n.t("Hard Poached"),
                    });
                  }}
                >
                  <Image
                    source={require("../assets/images/basic--clock.png")}
                  />
                  <Text
                    style={[styles.eggsTimerButtonText, { color: "white" }]}
                  >
                    {i18n.t('Start Timer')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
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
            <Text style={styles.modalTitle}>{i18n.t('Steps')}</Text>

            {/* Step List */}
            <ScrollView contentContainerStyle={styles.modalStepsContainer}>
              {steps.map((step, index) => (
                <View style={styles.modalStepItem} key={index}>
                  <View style={styles.modalStepNumber}>
                    <Text style={styles.modalStepNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.modalStepTextContainer}>
                    <Text style={styles.modalStepText}>
                      {index === 3 ? (
                        <>
                          {i18n.t('Cook eggs for')}{" "}
                          <Text style={{ fontFamily: "Inter-Bold" }}>
                            3 minutes
                          </Text>{" "}
                          {i18n.t('for a runny yolk')},{" "}
                          <Text style={{ fontFamily: "Inter-Bold" }}>
                            4 minutes
                          </Text>{" "}
                          {i18n.t("for a slightly set yolk and")}{" "}
                          <Text style={{ fontFamily: "Inter-Bold" }}>
                            5 minutes
                          </Text>{" "}
                          {i18n.t('for a firm yolk')}.
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
  safeArea: {
    flex: 1,
  },
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
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
    marginTop: 48,
  },

  subHeading: {
    fontSize: 20,
    fontFamily: "Kaleko-Bold",
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
    fontFamily: "Kaleko-Bold",
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

export default PoachedEggs;

