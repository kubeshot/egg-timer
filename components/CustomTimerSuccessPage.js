import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "./BottomBar";
import { WebView } from "react-native-webview";
import i18n from '../i18nConfig';
import ShareButton from "./shareButton";

const CustomTimerSuccessPage = ({ route }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState(route.params?.title || "");
  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(true);

  const EGGS_CA_URL = i18n.locale === 'fr' ? "https://lesoeufs.ca/" : "https://eggs.ca/";
  
  const defaultTitle = i18n.locale === 'fr' 
    ? "Votre minuterie personnalisée est terminée !" 
    : "Your custom timer is done!";

  useEffect(() => {
    setTitle(route.params?.title || defaultTitle);
  }, [route.params]);

  const handleBackPress = () => {
    if (showWebView) {
      setShowWebView(false);
    } else {
      navigation.navigate("Home");
    }
  };

  const openRecipeUrl = () => {
    setShowWebView(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              source={require("../assets/images/Logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.successCard}>
            <Text style={styles.successText}>{title}</Text>
            <Image
              source={require("../assets/images/successCustomImage.png")}
              style={styles.mainImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>
              {i18n.t('Explore eggs')}
            </Text>
          </View>

          <TouchableOpacity style={styles.moreEggsButton} onPress={openRecipeUrl}>
            <Text style={styles.moreEggsText}>{i18n.t('Visit eggs')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Image
          source={require("../assets/images/btnback-arrow.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      
      <BottomBar />

      <Modal
        visible={showWebView}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowWebView(false)}
      >
        <View style={styles.modalOverlay}>
          <ShareButton url={EGGS_CA_URL} />
          
          <View style={styles.bottomModal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowWebView(false)}
              >
                <Image
                  source={require("../assets/images/xcircle1.png")}
                  style={styles.closeButtonImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
              </View>
            )}
            
            {Platform.OS === "web" ? (
              <iframe
                src={EGGS_CA_URL}
                style={{ width: "100%", height: "100%" }}
                onLoad={() => setLoading(false)}
              />
            ) : (
              <WebView
                source={{ uri: EGGS_CA_URL }}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                style={styles.webView}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  logo: {
    width: 140,
    height: 50,
  },
  successCard: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    overflow: 'hidden',
  },
  successText: {
    fontSize: 24,
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  mainImage: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  sectionTitleContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Kaleko-Bold",
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 28,
    marginBottom: 20,
  },
  moreEggsButton: {
    backgroundColor: "#FFD700",
    width: 250,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  moreEggsText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 80,
    left: 30,
    zIndex: 1,
  },
  backIcon: {
    width: 40,
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomModal: {
    width: "100%",
    height: "92%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  modalHeader: {
    backgroundColor: '#FFFFFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 6,
    zIndex: 10,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButtonImage: {
    width: 24,
    height: 24,
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default CustomTimerSuccessPage;