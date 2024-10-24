import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "./BottomBar";

const CustomSuccessPage = ({ route }) => {
  const navigation = useNavigation();

  const [title, setTitle] = useState(route.params.title) || "";

  useEffect(() => {
    if (route.params && route.params.title) {
      setTitle(route.params.title);
    }
  });

  const handleBackPress = () => {
    navigation.navigate("Home");
  };
  const openRecipeUrl = () => {
    Linking.openURL("https://eggs.ca/").catch((err) => console.error("Error opening URL", err));
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
              source={require("../assets/images/rectangle-299.png")}
              style={styles.mainImage}
            />
          </View>

          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Explore eggs.ca for even more eggceptional recipes!</Text>
          </View>
          


          
          <TouchableOpacity style={styles.moreEggsButton} onPress={() => openRecipeUrl()}>
            <Text style={styles.moreEggsText}>
              Visit eggs.ca
            </Text>
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
    marginTop: 10, // Add some top margin
  },
  logo: {
    width: 140, // Reduced from 210
    height: 50, // Reduced from 70
  },
  successCard: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    // fontWeight: "bold",
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  mainImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
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
  recipeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  recipeItem: {
    width: "48%",
    marginBottom: 20,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  recipeTitle: {
    fontSize: 16,
    fontFamily:'Kaleko-Bold',
    textAlign: "center",
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
});

export default CustomSuccessPage;