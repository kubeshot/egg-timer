import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import Header from "../TopHeadingBar.js";
import Navbar from "../Navbar.js";
import image1 from "../../assets/images/clipboard.png";
import Footer from "../footer.js";
import WebView from "react-native-webview";
import ShareButton from "../shareButton.js";
import i18n from '../../i18nConfig.js'; // Import i18n



export default function SubscribeScreen({ onClose }) {
  const [loading, setLoading] = useState(true);
  const EGGS_CA_URL = i18n.locale === 'fr' 
  ? "https://www.lesoeufs.ca/abonnez-bulletin/" 
  : "https://www.eggs.ca/newsletter-signup/";


  return (
    <View style={styles.container}>
      <ShareButton url={EGGS_CA_URL} />
      <Header
        title={i18n.t("Newsletter Sign-up")}
        logoSource={image1}
        onClose={onClose}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}

      {/* Conditionally rendering iframe for web and WebView for mobile */}
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
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
});
