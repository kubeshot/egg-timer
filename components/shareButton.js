import React from 'react';
import { Platform, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Linking } from 'react-native';

const image1 = require("../assets/images/shareLogo.png");

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
      style={[
        styles.shareButton,
        Platform.OS === 'web' ? styles.webPosition : styles.mobilePosition
      ]}
      onPress={handlePress}
    >
      <Image source={image1} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    position: 'absolute',
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
  webPosition: {
    left: 16,
    top: 170, // Adjusted for web
  },
  mobilePosition: {
    left: 16,
    top: 65, // Adjusted for mobile
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default ShareButton;
