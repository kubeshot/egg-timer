// SubscribeScreen.js

import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./styles.js"; // Import the styles from styles.js
import Header from "../TopHeadingBar.js"; // Import the Header component
import Navbar from "../Navbar.js"; // Import the Navbar component

export default function SubscribeScreen() {
  const handleMenuPress = () => {
    // Handle menu button press
  };

  const handleSearchPress = () => {
    // Handle search button press
  };

  const handleClose = () => {
    // Handle close button press
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Ensure the Header component does not have any stray text */}
      <Header title="Newsletter Sign-up" onClose={handleClose} />

      {/* Ensure the Navbar component is also free of unwrapped text */}
      <Navbar onMenuPress={handleMenuPress} onSearchPress={handleSearchPress} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Wrap title text in a Text component */}
        <Text style={styles.title}>Subscribe to the Eggs.ca Newsletter</Text>

        {/* Wrap subtitle text in a Text component */}
        <Text style={styles.subtitle}>
          Get egg-citing recipes, how-tos, egg 101s and so much more delivered
          to your inbox every month!
        </Text>

        {/* TextInput should not contain direct text, just placeholders */}
        <TextInput
          style={styles.input}
          placeholder="Your Email Address"
          placeholderTextColor="#9E9E9E"
        />

        {/* Button text must be inside a Text component */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* Footer text should also be inside a Text component */}
        <Text style={styles.footer}>
          As a subscriber to eggs.ca, you may receive emails containing
          delicious recipes, nutrition tips, contests and promotions. You may
          unsubscribe at any time.
        </Text>
      </ScrollView>
    </View>
  );
}
