import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const Footer = () => {
  return (
    <View style={styles.container}>
      {/* Newsletter Subscription Section */}
      <View style={styles.newsletterContainer}>
        <Text style={styles.newsletterText}>
          Subscribe to the eggs.ca newsletter
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter Your Email Address"
            placeholderTextColor="#000"
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.subscribeButton}>
            <Image
              source={require("../assets/images/iconarrow.png")}
              style={styles.arrowLogo}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logos */}
      <View style={styles.logosContainer}>
        <Image
          source={require("../assets/images/efc-logo.png")}
          style={styles.logo}
        />
        <Image
          source={require("../assets/images/logoeqa.png")}
          style={styles.logo}
        />
      </View>

      {/* Footer Links */}
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => {/* Add navigation logic */}}>
          <Text style={styles.linkText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Add navigation logic */}}>
          <Text style={styles.linkText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Add navigation logic */}}>
          <Text style={styles.linkText}>Accessibility</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Add navigation logic */}}>
          <Text style={styles.linkText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Add navigation logic */}} style={styles.internationalContainer}>
          <Text style={styles.linkText}>International</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Logos */}
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => {/* Add link to Twitter */}}>
          <Image
            source={require("../assets/images/twitter-x.png")}
            style={styles.socialLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Add link to Facebook */}}>
          <Image
            source={require("../assets/images/iconfacebook.png")}
            style={styles.socialLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Add link to Instagram */}}>
          <Image
            source={require("../assets/images/iconinstagram.png")}
            style={styles.socialLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Add link to Pinterest */}}>
          <Image
            source={require("../assets/images/iconpinterest.png")}
            style={styles.socialLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Add link to YouTube */}}>
          <Image
            source={require("../assets/images/iconyoutube.png")}
            style={styles.socialLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Add link to TikTok */}}>
          <Image
            source={require("../assets/images/icontiktok.png")}
            style={styles.socialLogo}
          />
        </TouchableOpacity>
      </View>

      {/* Copyright and Legal Links */}
      <Text style={styles.copyright}>
        © 2023 Egg Farmers of Canada. All rights reserved.
      </Text>
      <View style={styles.legalLinksContainer}>
        <TouchableOpacity onPress={() => {/* Add link to Privacy Policy */}}>
          <Text style={styles.legalLinkText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* Add link to Terms & Conditions */}}>
          <Text style={styles.legalLinkText}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  newsletterContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFD700",
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  newsletterText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  textInput: {
    flex: 1,
    padding: 10,
  },
  subscribeButton: {
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowLogo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  logosContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
    marginHorizontal: 10,
    resizeMode: "contain",
  },
  linksContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  linkText: {
    fontSize: 16,
    marginVertical: 5,
    color: "#000",
    fontWeight: "bold",
  },
  internationalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownIcon: {
    marginLeft: 5,
    fontSize: 12,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialLogo: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
    resizeMode: "contain",
  },
  copyright: {
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  legalLinksContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  legalLinkText: {
    fontSize: 14,
    color: "#000",
    marginHorizontal: 10,
  },
});

export default Footer;