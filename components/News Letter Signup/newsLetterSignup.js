import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Header from "../TopHeadingBar.js";
import Navbar from "../Navbar.js";
import image1 from "../../assets/images/clipboard.png";
import Footer from "../footer.js";
import WebView from "react-native-webview";

export default function SubscribeScreen({ onClose }) {
  const handleMenuPress = () => {
    // Handle menu button press
  };

  const handleSearchPress = () => {
    // Handle search button press
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    // <Header
    //   title="Newsletter Sign-up"
    //   logoSource={image1}
    //   onClose={onClose}
    // />

    //   <Navbar onMenuPress={handleMenuPress} onSearchPress={handleSearchPress} />

    //   <ScrollView contentContainerStyle={styles.container}>
    //     <Text style={styles.title}>Subscribe to the Eggs.ca Newsletter</Text>

    //     <Text style={styles.subtitle}>
    //       Get egg-citing recipes, how-tos, egg 101s and so much more delivered
    //       to your inbox every month!
    //     </Text>

    //     <TextInput
    //       style={styles.input}
    //       placeholder="Your Email Address"
    //       placeholderTextColor="#9E9E9E"
    //     />

    //     <TouchableOpacity style={styles.button}>
    //       <Text style={styles.buttonText}>Submit</Text>
    //     </TouchableOpacity>

    //     <Text style={styles.footer}>
    //       As a subscriber to eggs.ca, you may receive emails containing
    //       delicious recipes, nutrition tips, contests and promotions. You may
    //       unsubscribe at any time.
    //     </Text>
    //     <Footer />
    //   </ScrollView>
    // </SafeAreaView>
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Newsletter Sign-up"
        logoSource={image1}
        onClose={onClose}
      />
      <View style={styles.container}>
        <WebView source={{ uri: "https://www.eggs.ca/newsletter-signup/" }} />
      </View>
    </SafeAreaView>
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
});
