import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../TopHeadingBar.js";
import { Linking } from "react-native";
import Navbar from "../Navbar.js";
import image1 from "../../assets/images/image32.png";
import image2 from "../../assets/images/image33.png";
import image3 from "../../assets/images/image34.png";
import image4 from "../../assets/images/banner-image.png";
import image5 from "../../assets/images/image35.png";
import image6 from "../../assets/images/image36.png";
import image7 from "../../assets/images/image37.png";
import image8 from "../../assets/images/image38.png";
import image9 from "../../assets/images/image39.png";
import image10 from "../../assets/images/image40.png";
import image11 from "../../assets/images/file021.png";
import videoIcon from "../../assets/images/iconplay-video.png";
import Footer from "../footer.js";
import VideoModal from "../VideoModal.js";

export default function HowTo({ onClose }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState("");

  const handleVideoPress = (videoId) => {
    setCurrentVideoId(videoId);  // Directly pass the video ID
    setModalVisible(true);
  };
  const handleMenuPress = () => {
    // Handle menu button press
  };

  const handleSearchPress = () => {
    // Handle search button press
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="How-To's" logoSource={image11} onClose={onClose} />
      <Navbar onMenuPress={handleMenuPress} onSearchPress={handleSearchPress} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eggs 101</Text>
          <Text style={styles.headerSubtitle}>
            Want to master the art of meringues or learn how to poach an egg
            like a pro? Our how-to articles and videos have everything you need
            to become a certified eggs-pert.
          </Text>
        </View>

        {/* How-To Series Section */}
        <View style={styles.seriesSection}>
          <Text style={styles.seriesTitle}>From Our How To Series</Text>
          <Image source={image1} style={styles.seriesImage} />

          <Text style={styles.articleTitle}>How to Make Hollandaise Sauce</Text>
          <Text style={styles.articleSubtitle}>
            Soft boil eggs are a perfect way to enjoy, and take virtually no
            time to make.
          </Text>
          <Image source={image2} style={styles.articleImage} />
          <Text style={styles.articleTitle}>How to Soft Boil Eggs</Text>
          <Text style={styles.articleSubtitle}>
            Not just for eggs Benedict, hollandaise sauce is delicious drizzled
            over many seafood and vegetable dishes, including salmon and
            asparagus!
          </Text>
        </View>

        {/* Halloween Section */}
        <Text style={styles.halloweenTitle}>Get Crafty for Halloween</Text>
        <View style={styles.card}>
          <View style={styles.halloweenContent}>
            <Image source={image3} style={styles.halloweenImage} />
            <View style={styles.kidApprovedBadge}>
              <Text style={styles.kidApprovedText}>Kid Approved</Text>
            </View>
            <View style={styles.halloweenDescription}>
              <Text style={styles.halloweenSubtitle}>
                Egg Carton Pumpkin Craft
              </Text>
              <Text style={styles.halloweenSubtitle}>For Kids</Text>
              <Text style={styles.halloweenDetails}>
                Egg cartons are painted and glued to make a crafty
                Jack-O-Lantern.
              </Text>
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Get App Section */}
        <View style={styles.card}>
          <View style={styles.halloweenContent}>
            <Image source={image4} style={styles.halloweenImage} />
            <View style={styles.getAppContainer}>
              <View style={styles.halloweenDescription}>
                <Text style={styles.getAppSubtitle}>
                  Perfect Eggs. Every time.
                </Text>
                <Text style={styles.getAppSubtitle}>Get the app.</Text>
                <TouchableOpacity style={styles.downloadButton}>
                  <Text style={styles.downloadText}>Download Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Top Articles Section */}
        <View style={styles.topArticles}>
          <Text style={styles.topArticlesTitle}>Top Articles</Text>

          {[
            {
              image: image5,
              title: "How to Poach an Egg Like a Pro",
              subtitle:
                "With the proper technique and a little practice, poaching an egg is easy.",
              video: "lKJyOl98kGM",
            },
            {
              image: image6,
              title: "How to Fry the Perfect Egg",
              subtitle:
                "Fried eggs are usually thought of as diner breakfast fare, but they're an easy way to add protein to all kinds of meals.",
              video: "FQ9Y50AciO0",
            },
            {
              image: image7,
              title: "How to Make Scrambled Eggs",
              subtitle:
                "Scrambled eggs are one of the most versatile breakfast dishes to prepare.",
              video: "joHJcnne36Q",
            },
            {
              image: image8,
              title: "How to Cook the Perfect Omelette",
              subtitle:
                "The omelette is one of the easiest and most inexpensive meals, and it works beautifully for breakfast, lunch or dinner.",
              video: "#",
            },
            {
              image: image9,
              title: "How to Make the Perfect Hard Boiled Egg",
              subtitle:
                "Hard boiled eggs are great food to have on hand as their uses are so versatile.",
              video: "GG8M3QmLJ6I",
            },
          ].map((article, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity onPress={() => handleVideoPress(article.video)}>
                <ImageBackground
                  source={article.image}
                  style={styles.articleImage}
                  imageStyle={styles.articleImageBorder}
                >
                  <Image source={videoIcon} style={styles.videoIcon} />
                </ImageBackground>
                <View style={styles.articleContent}>
                  <Text style={styles.topArticleTitle}>{article.title}</Text>
                  <Text style={styles.topArticleSubtitle}>
                    {article.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.card}>
            <View style={styles.articleContent}>
              <Image
                source={image10}
                style={styles.articleImage}
                imageStyle={styles.articleImageBorder}
              />
              <Text style={styles.topArticleTitle}>
                How to Peel a Hard Boiled Egg
              </Text>
              <Text style={styles.topArticleSubtitle}>
                Peeling hard boiled can be frustrating and time consuming. Here
                are a few simple tips to make it easier.
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreEggsButton}>
            <Text style={styles.moreEggsText}>More Eggs 101 Articles</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </ScrollView>
      <VideoModal
        isVisible={modalVisible}
        videoUri={currentVideoId}  // Pass video ID
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 20,
    marginBottom: 50,
  },
  headerTitle: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Inter-Bold",
  },
  headerSubtitle: {
    fontSize: 20,
    // fontWeight: "400",
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
  seriesSection: {
    backgroundColor: "#FFFBE6", // Light yellow background
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  seriesTitle: {
    fontSize: 25,
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",

    textAlign: "center",
    marginBottom: 10,
  },
  seriesImage: {
    width: "100%",
    height: 250,
    // marginBottom: 20,
    borderTopLeftRadius: 10, // Apply border radius to the top-left corner
    borderTopRightRadius: 10, // Apply border radius to the top-right corner
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
  articleTitle: {
    fontSize: 23,
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    marginTop:20,
    marginBottom: 10,
    left: 0,
  },
  getAppContainer: {
    backgroundColor: "#FFD700",
  },
  topArticleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 8,
  },
  articleSubtitle: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    marginBottom: 20,
  },
  topArticleSubtitle: {
    fontSize: 17,
    marginBottom: 20,
    marginLeft: 8,
  },
  articleImage: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 10, // Apply border radius to the top-left corner
    borderTopRightRadius: 10, // Apply border radius to the top-right corner
    justifyContent: "center",
    alignItems: "center",
  },
  articleImageBorder: {
    borderTopLeftRadius: 10, // Apply border radius to the top-left corner
    borderTopRightRadius: 10, // Apply border radius to the top-right corner
  },
  videoIcon: {
    width: 50,
    height: 50,
    opacity: 0.8,
  },
  halloweenTitle: {
    fontSize: 30,
    // fontWeight: "bold",
    fontFamily: "Inter-Bold",
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
    height: 250,
    borderTopLeftRadius: 10, // Apply border radius to the top-left corner
    borderTopRightRadius: 10, // Apply border radius to the top-right corner
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
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
    marginBottom: 8,
  },
  halloweenDetails: {
    fontSize: 18,
    marginBottom: 15,
    fontFamily: "Inter-Regular",
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
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  getAppSubtitle: {
    fontSize: 26,
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
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
  moreEggsButton: {
    backgroundColor: "#FFD700",
    width: 200,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  moreEggsText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  topArticles: {
    // backgroundColor:'#CFECF7',
    marginTop: 40,
    marginBottom: 30,
  },
  topArticlesTitle: {
    fontSize: 35,
    // fontWeight: "bold",
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  articleContent: {
    marginTop: 10,
  },
});
