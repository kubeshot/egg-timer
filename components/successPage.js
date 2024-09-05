import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const SuccessPage = ({ title }) => {
  const navigation = useNavigation();

  const recipeIdeas = [
    {
      title: "Mushroom Spaetzle with Poached Egg",
      image: require("../assets/images/image.png"),
    },
    {
      title: "Perfect Poached Eggs",
      image: require("../assets/images/image1.png"),
    },
    {
      title: "Pesto Pizza with Poached Eggs",
      image: require("../assets/images/image2.png"),
    },
    {
      title: "Indian Spiced Rice with Poached Eggs",
      image: require("../assets/images/image3.png"),
    },
  ];

  const handleBackPress = () => {
    navigation.navigate("Home");
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
            <Text style={styles.sectionTitle}>More Delicious Ideas</Text>
          </View>

          <View style={styles.recipeGrid}>
            {recipeIdeas.map((recipe, index) => (
              <View key={index} style={styles.recipeItem}>
                <Image source={recipe.image} style={styles.recipeImage} />
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.moreEggsButton}>
            <Text style={styles.moreEggsText}>
              Explore More Delicious Recipes
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
    fontWeight: "bold",
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
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
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
    fontWeight: "500",
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

export default SuccessPage;
