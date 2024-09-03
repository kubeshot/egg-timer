// Navbar.js

import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/images/logoeggsen.png';
export default function Navbar({ onMenuPress, onSearchPress }) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>

      <Image
        source={logo} // Replace with the actual logo URL
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity onPress={onSearchPress}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    backgroundColor: '#FFD700', // Yellow color for the navbar
    paddingTop: 8,
    paddingBottom:8,
    paddingLeft:20,
    paddingRight:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
  },
});
