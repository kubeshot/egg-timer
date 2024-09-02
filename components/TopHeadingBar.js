// Header.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Header({ title, onClose }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Ionicons name="mail-outline" size={24} color="black" />
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100vw',
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
  headerContent: {
    marginTop:22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '800',
  },
});
