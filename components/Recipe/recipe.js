import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  ScrollView,
} from "react-native";
import Header from "../TopHeadingBar.js"; // Import the Header component
import Navbar from "../Navbar.js"; // Import the Navbar component
import image1 from "../../assets/images/file02.png";
import image2 from "../../assets/images/image17.png";
import image3 from "../../assets/images/image16.png";
import image4 from "../../assets/images/image26.png";
import image5 from "../../assets/images/image27.png";
import image6 from "../../assets/images/image31.png";
import image7 from "../../assets/images/image28.png";
import image8 from "../../assets/images/image29.png";
import image9 from "../../assets/images/image30.png";
import Footer from "../footer.js";

const recipesData = {
  Breakfast: [
    {
      id: "1",
      name: "Baked Oatmeal Cups",
      image: require("../../assets/images/image18.png"),
      link: "https://example.com/oatmeal",
    },
    {
      id: "2",
      name: "Bacon & Egg Breakfast Burrito",
      image: require("../../assets/images/image22.png"),
      link: "https://example.com/burrito",
    },
  ],
  Lunch: [
    {
      id: "1",
      name: "Grilled Chicken Salad",
      image: require("../../assets/images/image25.png"),
      link: "https://example.com/salad",
    },
    {
      id: "2",
      name: "Turkey Sandwich",
      image: require("../../assets/images/image24.png"),
      link: "https://example.com/sandwich",
    },
  ],
  Dinner: [
    {
      id: "1",
      name: "Steak with Vegetables",
      image: require("../../assets/images/image26.png"),
      link: "https://example.com/steak",
    },
    {
      id: "2",
      name: "Spaghetti Bolognese",
      image: require("../../assets/images/image21.png"),
      link: "https://example.com/spaghetti",
    },
  ],
  Snacks: [
    {
      id: "1",
      name: "Fruit Bowl",
      image: require("../../assets/images/image19.png"),
      link: "https://example.com/fruit",
    },
    {
      id: "2",
      name: "Yogurt Parfait",
      image: require("../../assets/images/image23.png"),
      link: "https://example.com/yogurt",
    },
  ],
};

export default function RecipeScreen() {
  const handleMenuPress = () => {
    // Handle menu button press
  };

  const handleSearchPress = () => {
    // Handle search button press
  };

  const handleClose = () => {
    // Handle close button press
  };
  const [selectedTab, setSelectedTab] = useState("Breakfast");

  return (
    <View style={{ flex: 1 }}>
      {/* Ensure the Header component does not have any stray text */}
      <Header title="Recipes" logoSource={image1} onClose={handleClose} />

      {/* Ensure the Navbar component is also free of unwrapped text */}
      <Navbar onMenuPress={handleMenuPress} onSearchPress={handleSearchPress} />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Recipes</Text>
        <Text style={styles.subtitle}>
          Browse our collection of egg recipes, everything from quick breakfast
          ideas to our favorite classic egg recipes. We've got delicious ideas
          for any meal!
        </Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search our recipes"
          placeholderTextColor="#888"
        />
        <View style={styles.tabs}>
          {Object.keys(recipesData).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
            >
              <Text
                style={
                  selectedTab === tab ? styles.activeTabText : styles.tabText
                }
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.recipeList}>
          {recipesData[selectedTab].map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => Linking.openURL(item.link)}
              style={styles.recipeCard}
            >
              <Image source={item.image} style={styles.recipeImage} />
              <Text style={styles.recipeName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.seriesSection}>
          <Text style={styles.seriesTitle}>Breakfast On-the-Go</Text>
          <View style={styles.seriesImageContainer}>
            <Image source={image2} style={styles.seriesImage} />
          </View>

          <Text style={styles.articleTitle}>Make-Ahead Breakfast Bowls</Text>
          <Text style={styles.articleSubtitle}>
            Your new favourite noodle dish is going to be this one that's right
            out of your own kitchen but will taste like it's from the hottest
            new noodle bar in the city!
          </Text>
          <View style={styles.seriesImageContainer}>
            <Image source={image3} style={styles.seriesImage} />
          </View>
          <Text style={styles.articleTitle}>Cloud Eggs</Text>
          <Text style={styles.articleSubtitle}>
            Loco Moco is a delicious and filling contemporary Hawaiian meal made
            for three layers: rice and a hamburger patty smothered in delicious
            gravy and topped with a fried egg.
          </Text>
        </View>

        <Text style={styles.halloweenTitle}>Need Some Inspiration?</Text>
        <View style={styles.card}>
          <View style={styles.halloweenContent}>
            <Image source={image4} style={styles.halloweenImage} />
            <View style={styles.halloweenDescription}>
              <Text style={styles.halloweenSubtitle}>
                5 Eggceptional Halloween
              </Text>
              <Text style={styles.halloweenSubtitle}>Ideas</Text>
              <Text style={styles.halloweenDetails}>
                Halloween is just around the corner and we have 5 easy and fun
                ways to include eggs in your Halloween prep. From recipes to
                crafts we have got you covered.
              </Text>
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.halloweenContent}>
            <Image source={image5} style={styles.halloweenImage} />
            <View style={styles.halloweenDescription}>
              <Text style={styles.halloweenSubtitle}>4 Ways to Love Your</Text>
              <Text style={styles.halloweenSubtitle}>Leftovers</Text>
              <Text style={styles.halloweenDetails}>
                Eggs are an easy way to transform last night's leftovers into
                something new and delicious for today.
              </Text>
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Chef's Section */}
        <Text style={styles.chefsCornerTitle}>Chef's Corner</Text>
        <Text style={styles.chefsCornerSubtitle}>
          A new recipe every month from our Egg Farmers of Canada Ambassadors.
        </Text>
        <View style={styles.card}>
          <View style={styles.halloweenContent}>
            <Image source={image6} style={styles.halloweenImage} />
            <View style={styles.getAppContainer}>
              <View style={styles.halloweenDescription}>
                <Text style={styles.chefsRecipeTitle}>Marysol's</Text>
                <Text style={styles.chefsRecipeTitle}>Dutch Baby Pancakes</Text>
                <Text style={styles.chefsRecipeTitle}>with Fresh Berries</Text>
                <Text style={styles.chefsRecipeDescription}>
                  As tempting as it may be to peek, the key to the success of
                  these pancakes is to make sure no heat escapes from the oven
                  during baking. So keep the oven light on and the oven door
                  closed!
                </Text>
                <TouchableOpacity style={styles.learnMoreButton}>
                  <Text style={styles.learnMoreText}>Learn More</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.appetizerSection}>
          <Text style={styles.chefsCornerTitle}>Fun & East Egg Appetizers</Text>
          <Text style={styles.chefsCornerSubtitle}>
            Let's get creative with these fun and easy appetizer ideas!
          </Text>

          <View style={styles.card}>
            <View style={styles.halloweenContent}>
              <Image source={image7} style={styles.halloweenImage} />
              <View style={styles.halloweenDescription}>
                <Text style={styles.articleTitle}>
                  Sun-Dried Tomato and Basil Baked Ricotta
                </Text>
                <Text style={styles.articleSubtitle}>
                  This easy, flavour-packed dish is perfect for entertaining.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.halloweenContent}>
              <Image source={image8} style={styles.halloweenImage} />
              <View style={styles.halloweenDescription}>
                <Text style={styles.articleTitle}>Egg and Bacon Canapes{"    "} </Text>

                <Text style={styles.articleSubtitle}>
                  Dress up bacon and eggs by making these easy and elegant
                  canapes.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.halloweenContent}>
              <Image source={image9} style={styles.halloweenImage} />
              <View style={styles.halloweenDescription}>
                <Text style={styles.articleTitle}>
                  Mean Green Cheezy Bites{"     "}
                </Text>
                <Text style={styles.articleSubtitle}>
                  With kale and spinach, these savory bites loaded with italian
                  cheeses are a delicious way to eat your greens. They make a
                  great snack or appetizer.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Footer/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    color: "#555",
  },
  searchBar: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    marginBottom: 16,
    textAlign: "center",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: "#FFD700",
  },
  tabText: {
    fontSize: 16,
    color: "#555",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  recipeList: {
    paddingTop: 16,
  },
  recipeCard: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  recipeImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  seriesSection: {
    backgroundColor: "#D4F1F4", // Light yellow background
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  seriesTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  seriesImageContainer: {
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 10, // Apply border radius to the container
    overflow: "hidden", // Ensure image respects container bounds
  },
  seriesImage: {
    width: "100%", // Adjust width to 100% to fit within container bounds
    height: 200, // Set height to ensure consistent aspect ratio
    resizeMode: "cover", // Ensure the image covers the container fully
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    left: 0,
  },
  articleSubtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 0,
    marginBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },

  halloweenTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  halloweenContent: {
    position: "relative",
    justifyContent: "center",
  },
  halloweenImage: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 10, // Apply border radius to the top-left corner
    borderTopRightRadius: 10, // Apply border radius to the top-right corner
    resizeMode: "cover",
  },
  kidApprovedBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FF4B4B",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  kidApprovedText: {
    color: "#fff",
    fontWeight: "bold",
  },
  halloweenDescription: {
    marginTop: 10,
    alignItems: "center",
  },
  halloweenSubtitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  halloweenDetails: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  learnMoreButton: {
    backgroundColor: "#000",
    width: 150,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  learnMoreText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  getAppContainer: {
    backgroundColor: "#FFD700",
  },
  getAppSubtitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  downloadButton: {
    backgroundColor: "#000",
    width: 150,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  chefsCornerTitle: {
    fontSize: 35,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 8,
  },
  chefsCornerSubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 16,
  },
  chefsCornerImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  chefsRecipeTitle: {
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },
  chefsRecipeDescription: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 16,
  },
  appetizerSection:{ 
  backgroundColor:"white"
  }
});
