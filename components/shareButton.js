// ShareButton.js
import React from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Linking } from 'react-native';

const ShareButton = ({ url }) => {
  const handlePress = () => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      style={styles.shareButton}
    >
      <Ionicons name="share-outline" size={24} color="#333" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    position: 'absolute',
    left: 16,
    top: 65,
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
  }
});

export default ShareButton;