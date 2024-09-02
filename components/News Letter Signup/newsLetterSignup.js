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

export default function SubscribeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Subscribe to the Eggs.ca Newsletter</Text>
      <Text style={styles.subtitle}>
        Get egg-citing recipes, how-tos, egg 101s and so much more delivered to
        your inbox every month!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Your Email Address"
        placeholderTextColor="#9E9E9E"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        As a subscriber to eggs.ca, you may receive emails containing delicious
        recipes, nutrition tips, contests and promotions. You may unsubscribe at
        any time.
      </Text>
    </ScrollView>
  );
}
